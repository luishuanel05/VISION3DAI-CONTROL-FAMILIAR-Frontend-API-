# Autenticación y sesiones

Registro: valida, deriva clave con scrypt y guarda el hash. Login: compara en tiempo constante, genera token aleatorio y guarda solo su hash. Logout: revoca la sesión.
