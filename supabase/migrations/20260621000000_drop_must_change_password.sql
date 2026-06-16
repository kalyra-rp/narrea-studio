-- ============================================================================
-- Narrea Studio — Invitation client par lien sécurisé
-- Le client définit lui-même son mot de passe via le lien d'invitation :
-- le drapeau « doit changer son mot de passe » n'est plus nécessaire.
-- ============================================================================

alter table public.profiles drop column if exists must_change_password;
