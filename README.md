# Sistema de registro de visitas para el Hospital Psiquiátrico El Peral

## Objetivos
  - Registrar se forma sencilla y centralizada el ingreso de las visitas al hospital.
  - Verificar la validez de la informacion de los visitantes.
  - Evitar errores con el ingreso de visitantes con restricciones con los pacientes.
  - Controlar la estadia de las visitas con el uso de credenciales especificas para el efecto.

## Funcionalidades
  * ### Registro de visitantes
    * Inscripcion mediante RUT validado
    * Verificacion de las posibles restricciones existentes
    * Autocompletado si es que la visita ya se habia registrado antes
    * Busqueda del paciente por su nombre con filtros por nombre y apellidos.
  * ### Registro de Restricciones
    * Registro de visitantes con restricciones a acercarse a los pacientes.
    * Especificacion del motivo por el cual se restinge.
    * Solo el administrador puede retirar las restricciones.
  * ### Historico de Vistas
    * Visualizacion de todas las visitas registradas
    * Filtro de busqueda por paciente
    * Visualizacion individual de cada instancia de visita
  * ### Visitas en Curso
    * Visualizacion de las visitas que no se han retirado
    * Botones para visualizar y para registrar la salida de la visita
    * Actualizacion de la lista al momento de salir una visita

## Pendiente
 - [ ] Optimizacion de la seguridad.
 - [ ] Optimizacion de los componentes.
 - [ ] Implementacion de un sistema de LogIn.
 - [ ] Asegurar las rutas con peticiones.