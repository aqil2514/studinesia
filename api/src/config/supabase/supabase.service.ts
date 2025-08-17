import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private supabase: SupabaseClient;
  private supabaseAdmin: SupabaseClient;
  private role: string;

  constructor(@Inject(REQUEST) req: Request) {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_API_KEY,
    );

    this.supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ADMIN_SECRET,
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  getAdmin(): SupabaseClient {
    return this.supabaseAdmin;
  }

  handleSupabaseError(error: any) {
    const messages: Record<string, string> = {
      // Unique violation
      '23505': 'Data sudah ada.',

      // Foreign key violation
      '23503': 'Data sedang digunakan oleh entitas lain.',

      // Not null violation
      '23502': 'Field wajib diisi.',

      // Check constraint violation
      '23514': 'Data tidak memenuhi ketentuan.',

      // Invalid text representation (misal parsing angka gagal)
      '22P02': 'Format data tidak valid.',

      // String data right truncation (panjang string melebihi batas kolom)
      '22001': 'Teks terlalu panjang.',

      // Numeric value out of range
      '22003': 'Nilai angka di luar jangkauan yang diizinkan.',

      // Syntax error (biasanya query custom)
      '42601': 'Terjadi kesalahan pada query.',

      // Insufficient privilege
      '42501': 'Anda tidak memiliki izin untuk melakukan aksi ini.',
    };

    return messages[error.code] || 'Terjadi kesalahan.';
  }
}
