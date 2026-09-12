# 🗄️ Comprehensive Supabase Integration Guide for CHAKRAVYUH

This document provides the exact SQL schema, table definitions, and code connections required to integrate Supabase across all features of the **CHAKRAVYUH** cryptocurrency fraud attribution platform.

---

## 1. Quick Start (.env Configuration)

In `d:\Codes\Hackathon\cyber\frontend\.env`, add your project keys from the [Supabase Dashboard](https://supabase.com/dashboard):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 2. Complete SQL Database Schema

Run this SQL in your **Supabase SQL Editor** to create all required tables:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. WATCHLIST TABLE (Live Surveillance Queue)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.watchlist (
    id TEXT PRIMARY KEY DEFAULT ('w-' || floor(extract(epoch from now()) * 1000)::text),
    address TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    chain TEXT NOT NULL DEFAULT 'Polygon PoS',
    risk TEXT NOT NULL DEFAULT 'CRITICAL',
    risk_score INTEGER NOT NULL DEFAULT 90,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE_SURVEILLANCE',
    last_tx_value TEXT,
    added_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 2. LEGAL DOSSIERS TABLE (Section 94 BNSS / Section 91 CrPC Records)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.dossiers (
    id TEXT PRIMARY KEY DEFAULT ('d-' || floor(extract(epoch from now()) * 1000)::text),
    case_ref TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    target_vasp TEXT NOT NULL,
    deposit_address TEXT NOT NULL,
    total_traced_usdt NUMERIC NOT NULL DEFAULT 0,
    total_traced_inr NUMERIC NOT NULL DEFAULT 0,
    confidence TEXT NOT NULL DEFAULT '95%',
    status TEXT NOT NULL DEFAULT 'NOTICE_ISSUED',
    statutory_act TEXT NOT NULL DEFAULT 'BNSS Sec 94 / CrPC Sec 91',
    io_name TEXT NOT NULL DEFAULT 'Inspector A. Sharma',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 3. EVIDENCE LEDGER TABLE (Section 65B Certified On-Chain Records)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.evidence_ledger (
    hop INTEGER PRIMARY KEY,
    datetime_ist TEXT NOT NULL,
    datetime_utc TIMESTAMPTZ NOT NULL,
    origin_sender TEXT NOT NULL,
    origin_label TEXT,
    counterparty TEXT NOT NULL,
    counterparty_label TEXT,
    value_usdt NUMERIC NOT NULL,
    value_inr NUMERIC NOT NULL,
    token TEXT NOT NULL DEFAULT 'USDT',
    classification TEXT NOT NULL,
    classification_type TEXT NOT NULL,
    chain TEXT NOT NULL DEFAULT 'Polygon PoS',
    tx_hash TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'VERIFIED_65B',
    gas_fee TEXT,
    block_number BIGINT,
    risk_score INTEGER DEFAULT 90,
    audit_notes TEXT
);

-- ============================================================================
-- 4. OFFICER PROFILES & CLEARANCES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.officers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    badge_id TEXT NOT NULL UNIQUE,
    station_code TEXT NOT NULL,
    clearance_tier TEXT NOT NULL DEFAULT 'Tier 2 - National Attribution',
    role TEXT NOT NULL DEFAULT 'Primary Investigator',
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evidence_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.officers ENABLE ROW LEVEL SECURITY;

-- Allow public/authenticated read and write access for authorized client apps
CREATE POLICY "Allow public read-write for watchlist" ON public.watchlist FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for dossiers" ON public.dossiers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for evidence_ledger" ON public.evidence_ledger FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public read-write for officers" ON public.officers FOR ALL USING (true) WITH CHECK (true);
```

---

## 3. How the Frontend Connects to Each Table

All Supabase operations are managed through [`src/lib/supabase.js`](file:///d:/Codes/Hackathon/cyber/frontend/src/lib/supabase.js):

### A. Watchlist Operations
- **Fetch**: `fetchWatchlist()` calls `supabase.from("watchlist").select("*").order("added_at", { ascending: false })`.
- **Insert**: `addToWatchlist(item)` triggers from the **Side Popup Drawer** or the **Watchlist Modal**.
- **Delete**: `removeFromWatchlist(id)` removes the entity from the surveillance queue.

### B. Legal Dossiers Operations
- **Fetch**: `fetchDossiers()` loads judicial records into the **Legal Dossier Tab**.
- **Insert**: `saveDossier(dossier)` triggers automatically whenever an investigator clicks **"Issue Section 91 Preservation Notice"** in the drawer or dashboard.

### C. Evidence Ledger Synchronization
- **Fetch**: `fetchEvidenceRecords()` queries the 49 certified on-chain records from the `evidence_ledger` table.

---

## 4. Real-Time Subscriptions (Optional Live Stream)

To enable live real-time push updates when a new suspect wallet is flagged across law enforcement terminals, add:

```javascript
import { supabase } from "./lib/supabase.js";

// Listen to new watchlist alerts in real-time
supabase
  .channel('public:watchlist')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'watchlist' }, payload => {
    console.log('New high-risk wallet alert:', payload.new);
  })
  .subscribe();
```
