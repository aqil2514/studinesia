/**
 * Representasi token integrasi pihak ketiga (misalnya Facebook, Google, dsb)
 * yang disimpan di database.
 *
 * @template T - Struktur metadata tambahan dalam bentuk JSON
 */
export interface IntegrationTokensDB<T = unknown> {
  /**
   * UUID unik untuk setiap token integrasi.
   * Opsional saat insert karena akan diisi otomatis oleh database.
   */
  id?: string;

  /**
   * Nama provider integrasi.
   * Contoh: "facebook", "google", "twitter".
   */
  provider: string;

  /**
   * ID akun yang terkait dengan provider.
   * Biasanya ID Page, User, atau Project dari platform eksternal.
   */
  account_id: string;

  /**
   * Access token yang digunakan untuk autentikasi API.
   * Wajib diperbarui bila sudah kadaluarsa.
   */
  access_token: string;

  /**
   * Refresh token untuk memperbarui access token.
   * Tidak semua provider menyediakannya.
   */
  refresh_token: string;

  /**
   * Waktu saat token pertama kali dibuat/tersimpan.
   * Format: ISO 8601 string.
   */
  created_at: string;

  /**
   * Waktu kadaluarsa access token.
   * Bisa `null` jika token tidak memiliki expiry (misalnya long-lived token).
   */
  expires_at?: string | null;

  /**
   * Metadata tambahan terkait token.
   * Bentuk JSON, misalnya menyimpan scope, permissions, atau info akun.
   */
  metadata?: T | null;
}
