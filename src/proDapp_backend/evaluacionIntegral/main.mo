import Map "mo:base/HashMap";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
import Nat8 "mo:base/Nat8";
import Nat "mo:base/Nat";
import Debug "mo:base/Debug";
import Nat16 "mo:base/Nat16";
import Hash "mo:base/Hash";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Bool "mo:base/Bool";


actor {

  type metaEvaluacion = {
    folio   : Int;
    ente : Int;
    usuario : Int;
    fechaInicio : Text;
    fechaFin : Text;
    evaluador : Int;
    resultado : Text;
    estado : Int;
    version : Int;
    };

  type metaEvaluacionInput = {
    ente : Int;
    usuario : Int;
    fechaInicio : Text;
    fechaFin : Text;
    evaluador : Int;
    resultado : Int;
    estado : Int;
    version : Int;
  };
  
  type metaPregunta = {
    idPregunta   : Int;
    numero : Int;
    aspecto : Int;
    numAspecto : Int;
    evidencia : Bool;
    activo : Bool;
    version : Int;
    };

  type metaPreguntaInput = {
    numero : Int;
    aspecto : Int;
    numAspecto : Int;
    evidencia : Bool;
    activo : Bool;
    version : Int;
  };
  
  type metaAutoevaluacion = {
    idRespuesta   : Int;
    pregunta : Int;
    respuesta : Text;
    evidencia : Blob;
    usuario : Int;
    resultado : Int;
    retroalimentacion : Text;
    evaluador : Int;
    replica : Text;
    evidenciaReplica : Blob;
    usuarioReplica : Int;
    retroalimentacionFinal:Text;
    evaluadorFinal:Int;
    resultadoFinal:Int;
    folioEvaluacion : Int;
    };

  type metaAutoevaluacionInput = {
    pregunta : Int;
    respuesta : Text;
    evidencia : Blob;
    usuario : Int;
    resultado : Int;
    retroalimentacion : Text;
    evaluador : Int;
    replica : Text;
    evidenciaReplica : Blob;
    usuarioReplica : Int;
    retroalimentacionFinal:Text;
    evaluadorFinal:Int;
    resultadoFinal:Int;
    folioEvaluacion : Int;
  };

  type metaRespuestaInput = {
    pregunta : Int;
    respuesta : Text;
    evidencia : Blob;
    usuario : Int;
    folioEvaluacion : Int;
  };

  type metaRetroalimentacionInput = {
    pregunta : Int;
    respuesta : Text;
    evidencia : Blob;
    usuario : Int;
    resultado : Int;
    retroalimentacion : Text;
    evaluador : Int;
    folioEvaluacion : Int;
  };

  type metaReplicaInput = {
    pregunta : Int;
    respuesta : Text;
    evidencia : Blob;
    usuario : Int;
    resultado : Int;
    retroalimentacion : Text;
    evaluador : Int;
    replica : Text;
    evidenciaReplica : Blob;
    usuarioReplica : Int;
    folioEvaluacion : Int;
  };
  
  type metaAspecto = {
    idAspecto   : Int;
    nombre : Text;
    descripcion : Text;
    };

  type metaAspectoInput = {
    nombre : Text;
    descripcion : Text;

  };
  
  type metaResultadoEval = {
    idResultadoEval  : Int;
    nombre : Text;
    descripcion : Text;
    };

  type metaResultadoEvalInput = {
    nombre : Text;
    descripcion : Text;

  };
  
  type metaResultado = {
    idResultado   : Int;
    resultado : Text;
    descripcion : Text;
    };

  type metaResultadoInput = {
    resultado : Text;
    descripcion : Text;
  };

  type metaEstado = {
    idEstado   : Int;
    estado : Text;
    descripcion : Text;
    };

  type metaEstadoInput = {
    estado : Text;
    descripcion : Text;

  };

  type metaVersion = {
    idVersion   : Int;
    descripcion : Text;
    preguntas : Int;
    };

  type metaVersionInput = {
    descripcion : Text;
    preguntas : Int;

  };
  

  let versiones = Map.HashMap<Int, metaVersionInput>(0, Int.equal, Int.hash);
  
  let estados = Map.HashMap<Int, metaEstadoInput>(0, Int.equal, Int.hash);
  
  let resultados = Map.HashMap<Int, metaResultadoInput>(0, Int.equal, Int.hash);

  let resultadoEvals = Map.HashMap<Int, metaResultadoEvalInput>(0, Int.equal, Int.hash);

  let aspectos = Map.HashMap<Int, metaAspectoInput>(0, Int.equal, Int.hash);

  let autoevaluaciones = Map.HashMap<Int, metaAutoevaluacionInput>(0, Int.equal, Int.hash);

  let preguntas = Map.HashMap<Int, metaPreguntaInput>(0, Int.equal, Int.hash);

  let evaluaciones = Map.HashMap<Int, metaEvaluacionInput>(0, Int.equal, Int.hash);

  public func newEvaluacion(folio : Int, datos : metaEvaluacionInput) : async () {
    if (datos.ente == 0) {
      Debug.trap("Ingrese el ente obligado");
    };
    if (datos.usuario == 0){
      Debug.trap("Ingrese el usuario que atenderá la evaluacion por parte del ente");
    };
    if (datos.fechaInicio == "") {
      Debug.trap("Ingrese la fecha de inicio de la evaluacion");
    };
    if (datos.fechaFin == "") {
      Debug.trap("Ingrese la fecha de termino de evaluacion, si sigue en proceso definir \"No concluida\"");
    };
    if (datos.evaluador == 0) {
      Debug.trap("Ingrese el usuario que realizará la evaluacion");
    };
    if (datos.resultado == 0) {
      Debug.trap("Ingrese el resultado de la evaluación, si sigue en proceso definir \"No concluida\"");
    };
    if (datos.estado == 0) {
      Debug.trap("Ingrese el estado en el que se encuentra la evaluacion");
    };
    if (datos.version == 0) {
      Debug.trap("Ingrese la versión que aplicará en la evaluacion");
    };


    evaluaciones.put(folio, 
      {
        ente =datos.ente; 
        usuario=datos.usuario;
        fechaInicio=datos.fechaInicio;
        fechaFin=datos.fechaFin;
        evaluador=datos.evaluador;
        resultado=datos.resultado;
        estado=datos.estado;
        version=datos.version;
    });
    var datosVersion=versiones.get(datos.version);
    var aux = switch (datosVersion) {
      case (null) {
        {
          descripcion =""; 
          preguntas=0;
        };
      };
      case (?datosVersion) datosVersion;
    };

    var numPreguntas : Int = aux.preguntas;


    
    var  ultimaRespuesta : Int = autoevaluaciones.size();
    for ((numPregunta) in Iter.range(1,numPreguntas))
    {
      Debug.print("NumPregunta-> " # Int.toText(numPregunta));
      for ((idPregunta,pregunta) in preguntas.entries()){
        Debug.print("Pregunta.numero-> " # Int.toText(pregunta.numero));
        Debug.print("Pregunta.activo-> " # Bool.toText(pregunta.activo));
          if (pregunta.numero==numPregunta){
            if ((pregunta.version==datos.version) and (pregunta.activo==true)){
                var datosAutoevaluacion : metaAutoevaluacionInput={
                  pregunta =numPregunta;
                  respuesta ="";
                  evidencia ="\00";
                  usuario=datos.usuario;
                  resultado=0;
                  retroalimentacion="";
                  evaluador=datos.evaluador;
                  replica="";
                  evidenciaReplica="\00";
                  usuarioReplica=0;
                  retroalimentacionFinal="";
                  evaluadorFinal=0;
                  resultadoFinal=0;
                  folioEvaluacion=folio;
                  };
                var respuestaActual : Int=ultimaRespuesta+numPregunta;
                autoevaluaciones.put(respuestaActual,datosAutoevaluacion);
            }
            else{
              //Debug.trap("No se encontró la pregunta numero" # Int.toText(numPregunta) # "de la version " # Int.toText(datos.version) # " dentro de las preguntas registradas activas");
            };
          }
          else{
            //Debug.trap("No se encontró la pregunta numero" # Int.toText(numPregunta) # "de la version " # Int.toText(datos.version) # " dentro de las preguntas registradas");
          }; 
      };
    };
    Debug.print("Evaluación creada");
  };

  public query func getEvaluacion(folio : Int) : async metaEvaluacionInput  {
    let evaluacionGet = evaluaciones.get(folio);
    var aux = switch (evaluacionGet) {
      case (null) {
        {
          ente =0; 
          usuario=0;
          fechaInicio="";
          fechaFin="";
          evaluador=0;
          resultado=0;
          estado=0;
          version=0;
        };
      };
      case (?evaluacionGet) evaluacionGet;
    };
    return {
        ente =aux.ente; 
        usuario=aux.usuario;
        fechaInicio=aux.fechaInicio;
        fechaFin=aux.fechaFin;
        evaluador=aux.evaluador;
        resultado=aux.resultado;
        estado=aux.estado;
        version=aux.version;
    };
  };

  public func updateEvaluacion(folio : Int, datos : metaEvaluacionInput) : async () {
    if (datos.ente == 0) {
      Debug.trap("Ingrese el ente obligado");
    };
    if (datos.usuario == 0){
      Debug.trap("Ingrese el usuario que atenderá la evaluacion por parte del ente");
    };
    if (datos.fechaInicio == "") {
      Debug.trap("Ingrese la fecha de inicio de la evaluacion");
    };
    if (datos.fechaFin == "") {
      Debug.trap("Ingrese la fecha de termino de evaluacion, si sigue en proceso definir \"No concluida\"");
    };
    if (datos.evaluador == 0) {
      Debug.trap("Ingrese el usuario que realizará la evaluacion");
    };
    if (datos.resultado == 0) {
      Debug.trap("Ingrese el resultado de la evaluación, si sigue en proceso definir \"No concluida\"");
    };
    if (datos.estado == 0) {
      Debug.trap("Ingrese el estado que realizará en la evaluacion");
    };
    if (datos.version == 0) {
      Debug.trap("Ingrese la versión que aplicará en la evaluacion");
    };
    if (evaluaciones.replace(folio, datos) == null) {
      Debug.trap("Evaluacion no encontrada");
    };
  };

  public func deleteEvaluacion(folio : Int) : async () {
    if (evaluaciones.remove(folio) == null) {
      Debug.trap("Evaluacion no encontrada");
    };
  };

  public query func evaluacionTamano() : async Text {
      var tama : Text = Nat.toText(evaluaciones.size());
      return tama
  };


  public query func getPregunta(idPregunta : Int) : async metaPreguntaInput  {
    let preguntaGet = preguntas.get(idPregunta);
    var aux = switch (preguntaGet) {
      case (null) {
        {
          numero =0; 
          aspecto=0;
          numAspecto= 0;
          evidencia=false;
          activo=false;
          version=0;
        };
      };
      case (?preguntaGet) preguntaGet;
    };
    return {
        numero =aux.numero; 
        aspecto=aux.aspecto;
        numAspecto=aux.numAspecto;
        evidencia=aux.evidencia;
        activo=aux.activo;
        version=aux.version;
    };
  };

  public func updatePregunta(idPregunta : Int, datos : metaPreguntaInput) : async () {
    if (datos.numero == 0) {
      Debug.trap("Ingrese un número de pregunta");
    };
    if (datos.aspecto == 0) {
      Debug.trap("Ingrese el aspecto que evalua la pregunta");
    };
    if (datos.numAspecto == 0) {
      Debug.trap("Ingrese el numero de aspecto que evalua la pregunta");
    };
    if (datos.version == 0) {
      Debug.trap("Ingrese la versión de la evaluación a la que aplica la pregunta");
    };

    if (preguntas.replace(idPregunta, datos) == null) {
      Debug.trap("Usuario no encontrado");
    };
  };

  public func deleteUsuario(idPregunta : Int) : async () {
    if (preguntas.remove(idPregunta) == null) {
      Debug.trap("Usuario no encontrado");
    };
  };

  public query func preguntaTamano() : async Text {
      var tama : Text = Nat.toText(preguntas.size());
      return tama
  };

  public func updateRespuesta(idRespuesta : Int, datos : metaRespuestaInput) : async () {
    let respuestaGet = autoevaluaciones.get(idRespuesta);
    var aux = switch (respuestaGet) {
      case (null) {
          Debug.trap("Respuesta no encontrada")
        };
      case (?respuestaGet) respuestaGet;
    };
    if (datos.pregunta == 0) {
      Debug.trap("Ingrese el número de pregunta a responder");
    };
    if (datos.respuesta == "") {
      Debug.trap("Ingrese la respusta a la pregunta");
    };
    if (datos.usuario == 0) {
      Debug.trap("Ingrese el usuario que responde la pregunta");
    };
    if (datos.folioEvaluacion == 0) {
      Debug.trap("Ingrese el folio de evaluación al que responde la pregunta");
    };

    if (autoevaluaciones.replace(idRespuesta, 
    {
        pregunta=datos.pregunta;
        respuesta =datos.respuesta; 
        evidencia=datos.evidencia;
        usuario=datos.usuario;
        resultado=0;
        retroalimentacion="";
        evaluador=0;
        replica="";
        evidenciaReplica="\00";
        usuarioReplica=0;
        retroalimentacionFinal="";
        evaluadorFinal=0;
        resultadoFinal=0;
        folioEvaluacion=datos.folioEvaluacion;
      } ) == null) {
      Debug.trap("Respuesta no encontrada");
    };
  };

  public func deleteRespuesta(idRespuesta : Int) : async () {
    if (autoevaluaciones.remove(idRespuesta) == null) {
      Debug.trap("Respuesta no encontrada");
    };
  };

  public query func autoevaluacionTamano() : async Int {
      var tama : Int = autoevaluaciones.size();
      return tama
  };

  public func newAspecto(idAspecto : Int, datos : metaAspectoInput) : async () { 

    if (datos.nombre == "") {
      Debug.trap("Ingrese el nombre que identificará al Aspecto");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion del Aspecto");
    };
    
    aspectos.put(idAspecto, 
      {
        nombre =datos.nombre; 
        descripcion=datos.descripcion;
      } 
    );

    Debug.print("Aspecto agregado");
  };

  public query func getAspecto(idAspecto : Int) : async metaAspectoInput  {
    let getAspecto = aspectos.get(idAspecto);
    var aux = switch (getAspecto) {
      case (null) {
        {
          nombre =""; 
          descripcion="";
        };
      };
      case (?getAspecto) getAspecto;
    };
    return {
        nombre =aux.nombre; 
        descripcion=aux.descripcion;
    };
  };

  public func updateAspecto(idAspecto : Int, datos : metaAspectoInput) : async () {
    if (datos.nombre == "") {
      Debug.trap("Ingrese el nombre que identificará al Aspecto");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion del Aspecto");
    };

    if (aspectos.replace(idAspecto, datos) == null) {
      Debug.trap("Aspecto no encontrado");
    };
  };

  public func deleteAspecto(idAspecto : Int) : async () {
    if (aspectos.remove(idAspecto) == null) {
      Debug.trap("Aspecto no encontrado");
    };
  };

  public query func aspectoTamano() : async Text {
      var tama : Text = Nat.toText(aspectos.size());
      return tama
  };

  public query func aspectoValores() : async Text {
    var aspectoText : Text="";
   aspectoText := "{";
    for ((idAspecto, datos) in aspectos.entries()) {
        aspectoText #= "\"idAspecto\" : "  # Int.toText(idAspecto) # ",\"nombre\" : \"" # datos.nombre # "\" , \"descripcion\": \"" # datos.descripcion # "\","
    };
    aspectoText #= "\"idAspecto\":-1,\"nombre\":\"Seleccione una opcion\",\"descripcion\":\"Selecciona una opcion\"}";
      
      return aspectoText
  };

public func newResultadoEval(idResultadoEval : Int, datos : metaResultadoEvalInput) : async () { 

    if (datos.nombre == "") {
      Debug.trap("Ingrese el nombre que identificará el Resultado de Evaluacion");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion del resultado de Evaluacion");
    };
    
    resultadoEvals.put(idResultadoEval, 
      {
        nombre =datos.nombre; 
        descripcion=datos.descripcion;
      } 
    );

    Debug.print("Resultado de evaluacion agregado");
  };

  public query func getResultadoEvaluacion(idResultadoEval : Int) : async metaResultadoEvalInput  {
    let resultadoEvalGet = resultadoEvals.get(idResultadoEval);
    var aux = switch (resultadoEvalGet) {
      case (null) {
        {
          nombre =""; 
          descripcion="";
        };
      };
      case (?resultadoEvalGet) resultadoEvalGet;
    };
    return {
        nombre =aux.nombre; 
        descripcion=aux.descripcion;
    };
  };

  public func updateResultadoEvaluacion(idResultadoEval : Int, datos : metaResultadoEvalInput) : async () {
    if (datos.nombre == "") {
      Debug.trap("Ingrese el nombre que identificará el Resultado de Evaluacion");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion del resultado de Evaluacion");
    };

    if (resultadoEvals.replace(idResultadoEval, datos) == null) {
      Debug.trap("Resultado de evaluaciones no encontrado");
    };
  };

  public func deleteResultadoEvaluacion(idResultadoEval : Int) : async () {
    if (resultadoEvals.remove(idResultadoEval) == null) {
      Debug.trap("Resultado de evaluaciones no encontrado");
    };
  };

  public query func resultadoEvalTamano() : async Text {
      var tama : Text = Nat.toText(resultadoEvals.size());
      return tama
  };

  public query func resultadoEvalvalores() : async Text {
    var resultadoEvaluacionesText : Text="";
   resultadoEvaluacionesText := "{";
    for ((idResultadoEval, datos) in resultadoEvals.entries()) {
        resultadoEvaluacionesText #= "\"idResultadoEval\" : "  # Int.toText(idResultadoEval) # ",\"nombre\" : \"" # datos.nombre # "\" , \"descripcion\": \"" # datos.descripcion # "\","
    };
    resultadoEvaluacionesText #= "\"idResultadoEval\":-1,\"nombre\":\"Seleccione una opcion\",\"descripcion\":\"Selecciona una opcion\"}";
      
      return resultadoEvaluacionesText;
  };

  public func newResultado(idResultado : Int, datos : metaResultadoInput) : async () { 

    if (datos.resultado == "") {
      Debug.trap("Ingrese el nombre que identificará el nivel de reusltado");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion del resultado");
    };
    
    resultados.put(idResultado, 
      {
        resultado =datos.resultado; 
        descripcion=datos.descripcion;
      } 
    );

    Debug.print("Resultado agregado");
  };

  public query func getResultado(idResultado : Int) : async metaResultadoInput  {
    let resultadoGet = resultados.get(idResultado);
    var aux = switch (resultadoGet) {
      case (null) {
        {
          resultado =""; 
          descripcion="";
        };
      };
      case (?resultadoGet) resultadoGet;
    };
    return {
        resultado =aux.resultado; 
        descripcion=aux.descripcion;
    };
  };

  public func updateResultado(idResultado : Int, datos : metaResultadoInput) : async () {
    if (datos.resultado == "") {
      Debug.trap("Ingrese el nombre que identificará el nivel de reusltado");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion del resultado");
    };

    if (resultados.replace(idResultado, datos) == null) {
      Debug.trap("Resultado no encontrado");
    };
  };

  public func deleteResultado(idResultado : Int) : async () {
    if (resultados.remove(idResultado) == null) {
      Debug.trap("Resultado no encontrado");
    };
  };

  public query func resultadoTamano() : async Text {
      var tama : Text = Nat.toText(resultados.size());
      return tama
  };

  public query func resultadoValores() : async Text {
    var resultadoText : Text="";
   resultadoText := "{";
    for ((idResultado, datos) in resultados.entries()) {
        resultadoText #= "\"idResultado\" : "  # Int.toText(idResultado) # ",\"resultado\" : \"" # datos.resultado # "\" , \"descripcion\": \"" # datos.descripcion # "\","
    };
    resultadoText #= "\"idResultado\":-1,\"resultado\":\"Seleccione una opcion\",\"descripcion\":\"Selecciona una opcion\"}";
      
      return resultadoText
  };

  public func newEstado(idEstado : Int, datos : metaEstadoInput) : async () { 

    if (datos.estado == "") {
      Debug.trap("Ingrese el nombre del estado que puede tener la evaluacion");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion del estado de la evaluacion");
    };
    
    estados.put(idEstado, 
      {
        estado =datos.estado; 
        descripcion=datos.descripcion;
      } 
    );

    Debug.print("Estado agregado");
  };

  public query func getEstado(idEstado : Int) : async metaEstadoInput  {
    let estadoGet = estados.get(idEstado);
    var aux = switch (estadoGet) {
      case (null) {
        {
          estado =""; 
          descripcion="";
        };
      };
      case (?estadoGet) estadoGet;
    };
    return {
        estado =aux.estado; 
        descripcion=aux.descripcion;
    };
  };

  public func updateEstado(idEstado : Int, datos : metaEstadoInput) : async () {
    if (datos.estado == "") {
      Debug.trap("Ingrese el nombre del estado que puede tener la evaluacion");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion del estado de la evaluacion");
    };

    if (estados.replace(idEstado, datos) == null) {
      Debug.trap("Estado no encontrado");
    };
  };

  public func deleteEstado(idEstado : Int) : async () {
    if (estados.remove(idEstado) == null) {
      Debug.trap("Estado no encontrado");
    };
  };

  public query func estadoTamano() : async Text {
      var tama : Text = Nat.toText(estados.size());
      return tama
  };

  public query func estadoValores() : async Text {
    var estadoText : Text="";
   estadoText := "{";
    for ((idEstado, datos) in estados.entries()) {
        estadoText #= "\"idEstado\" : "  # Int.toText(idEstado) # ",\"estado\" : \"" # datos.estado # "\" , \"descripcion\": \"" # datos.descripcion # "\","
    };
    estadoText #= "\"idEstado\":-1,\"nombre\":\"Seleccione una opcion\",\"descripcion\":\"Selecciona una opcion\"}";
      
      return estadoText
  };

  public func newVersion(idVersion : Int, datos : metaVersionInput) : async () { 

    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion de la versión de Evaluacion");
    };
    if (datos.preguntas == 0) {
      Debug.trap("Ingrese el numero de preguntas de la versión de la evaluacion");
    };
    
    versiones.put(idVersion, 
      {
        descripcion=datos.descripcion;
        preguntas =datos.preguntas; 
      } 
    );

    Debug.print("Version agregada");
  };

  public query func getVersion(idVersion : Int) : async metaVersionInput  {
    let versionGet = versiones.get(idVersion);
    var aux = switch (versionGet) {
      case (null) {
        {
          descripcion="";
          preguntas=0;
        };
      };
      case (?versionGet) versionGet;
    };
    return {
        descripcion=aux.descripcion;
        preguntas=aux.preguntas; 
    };
  };

  public func updateVersion(idVersion : Int, datos : metaVersionInput) : async () {
     if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion de la versión de Evaluacion");
    };
    if (datos.preguntas == 0) {
      Debug.trap("Ingrese el numero de preguntas de la versión de la evaluacion");
    };

    if (versiones.replace(idVersion, datos) == null) {
      Debug.trap("Version no encontrada");
    };
  };

  public func deleteVersion(idVersion : Int) : async () {
    if (versiones.remove(idVersion) == null) {
      Debug.trap("Version no encontrada")
    };
  };

  public query func versionTamano() : async Text {
      var tama : Text = Nat.toText(versiones.size());
      return tama
  };

  public query func versionValores() : async Text {
    var versionText : Text="";
   versionText := "{";
    for ((idVersion, datos) in versiones.entries()) {
        versionText #= "\"idVersion\" : "  # Int.toText(idVersion) # ",\"descripcion\" : \"" # datos.descripcion # "\" , \"preguntas\": \"" # Int.toText(datos.preguntas) # "\","
    };
    versionText #= "\"idVersion\":-1,\"descripcion\":\"Seleccione una opcion\",\"preguntas\":\"Selecciona una opcion\"}";
      
      return versionText
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};