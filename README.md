##endpointsTable

| Route     | HTTP Verb | Description     | Protected  |
| --------- | --------- | --------------- | ---------- |

| `/` | GET | Landing page | Abierta |
| `/registro` | GET | Formulario de registro | Abierta |
| `/registro`| POST | Formulario de registro | Abierta |
| `/acceso` | GET | Formulario de acceso | Abierta |
| `/acceso` | POST |Formulario de registro | Abierta |
| `/cerrar-sesion`| POST | Cerrar sesión | Abierta |
| `/perfil/:id` | GET | Perfil del usuario | Protegida |
| `/perfil/eliminar/:id` | POST | Eliminar perfil del usuario | Protegida |
| `/perfil/editar/:id` | GET | Editar perfil de usuario | Protegida |
| `/perfil/editar/:id` | POST | Editar perfil de usuario | Protegida |
| `/peliculas` | GET | Lista de películas | Protegida |
| `/peliculas`| POST | Consulta de películas queryString| Protegida |
| `/peliculas/ficha/:id`| GET | Ficha de películas mostrar usuarios afines a las películas | Protegida |
| `/peliculas/ficha/usuario/:id`| POST | Añadir usuario a tu lista de amig@s | Protegida |
| `/grupos/usuario/:id`| GET| Listado de grupos | Protegida |
| `/grupo/:id`| GET | Ficha del grupo | Protegida |
| `/grupo/:id` | POST | Nuevo mensaje | Protegida |
| `/grupo/create` | GET | Creación de grupo | Protegida |
| `/grupo/create` | POST | Creación de grupo | Protegida |
| `/amigos/:id`| GET | Listado de amigos |
| `/email/:id`| POST | Email de confirmación de registro | Protegida |
        return /^ (?=.* [0 - 9])(?=.* [a - z])(?=.* [A - Z])(?=.* [@#$%^& -+=()]) (?=\\S + $).{ 8, 20 } $/.test(password)

