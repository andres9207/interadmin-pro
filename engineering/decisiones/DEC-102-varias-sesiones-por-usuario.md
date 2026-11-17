# DEC-102 — Varias sesiones por usuario

**Fecha:** 2026-11-17 · **Tipo:** Vigente · **ADR:** [0001](../adr/0001-seguridad.md) · **Reemplaza en parte:** [DEC-002](DEC-002-sesion-unica-refresh.md) (solo la sesión única)

## Contexto

Con la sesión única, entrar en un segundo dispositivo o navegador cerraba la sesión del primero: su siguiente renovación respondía 401 ("Sesión inválida o expirada") y el usuario perdía lo que estaba haciendo. El usuario pidió que se pueda trabajar en varios lugares a la vez sin que ninguno se interrumpa.

## Decisión

- **Un usuario puede tener varias sesiones vivas**, sin límite: cada login inserta una fila en `tbl_sessions` con su propio `ses_key` y su refresh token, y no toca las demás. Se quitó `UNIQUE(use_id)` (migración 0130).
- Al abrir una sesión se borran las **vencidas** del usuario, para que la tabla no crezca sin control.
- **Cierran solo su sesión:** el logout, la sesión vencida al renovar y el **refresh token reutilizado** fuera de la ventana de gracia (posible robo), que sigue dejando `SESION_REVOCADA` en la bitácora.
- **Cierran todas las sesiones del usuario** (`revokeSession`): restaurar la contraseña, cambiar la propia contraseña (queda solo la sesión nueva del dispositivo que la cambió), y que un administrador desactive o elimine al usuario o le cambie la contraseña. También un usuario inactivo que intenta renovar.
- Lo demás de DEC-002 sigue igual: cookies httpOnly, access de 15 minutos, refresh de 7 días rotado en cada uso, 30 s de gracia y `JWT_REFRESH_EXPIRES_IN`.

## Descartado

- **Un límite de sesiones** (3 o 5, cerrando la más antigua): el usuario eligió no limitarlas.
- **Cerrar todas las sesiones ante un refresh token reutilizado**: interrumpía los demás dispositivos legítimos; basta con cerrar la sesión comprometida.

## Qué implica

- Un login no autorizado ya no cierra la sesión legítima, así que deja de ser visible para el usuario. La mitigación queda en el bloqueo progresivo de login (DEC-003) y en MFA, pendiente en ADR-0001.
- Un flujo nuevo que invalide las credenciales del usuario usa `revokeSession` (todas). Uno que cierre solo el dispositivo actual usa `revokeSessionByKey` o `revokeSessionByRefreshToken`.
- `tbl_sessions` ya no se busca con `findUnique({ use_id })`: un usuario puede tener varias filas.

## Dónde

`server/src/common/services/session.service.js` · `server/src/modules/auth/auth.controller.js` (`updatePasswordController`, `revokeOthers`) · `database/migrations/0130_sessions_multiple_per_user.sql` · `server/test/common/services/session.service.test.js`
