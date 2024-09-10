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
import Blob "mo:base/Blob";

actor {

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
  

  let autoevaluaciones = Map.HashMap<Int, metaAutoevaluacionInput>(0, Int.equal, Int.hash);

  public func newRespuesta(idRespuesta : Int, datos : metaRespuestaInput) : async () { 
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
      Debug.trap("Ingrese el folio de evaluació al que responde la pregunta");
    };
    autoevaluaciones.put(idRespuesta, 
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
      } 
    );
    Debug.print("Respuesta agregada");
  };

  public query func getRepesta(idRespuesta : Int) : async metaRespuestaInput  {
    let respuestaGet = autoevaluaciones.get(idRespuesta);
    var aux = switch (respuestaGet) {
      case (null) {
        {
          pregunta=0;
          respuesta=""; 
          evidencia="\00" : Blob;
          usuario=0;
          folioEvaluacion=0;
        };
      };
      case (?respuestaGet) respuestaGet;
    };
    return {
        pregunta=aux.pregunta;
        respuesta=aux.respuesta; 
        evidencia=aux.evidencia : Blob;
        usuario=aux.usuario;
        folioEvaluacion=aux.folioEvaluacion;
    };
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

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};