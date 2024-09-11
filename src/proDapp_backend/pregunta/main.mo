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

actor {

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
  

  let preguntas = Map.HashMap<Int, metaPreguntaInput>(0, Int.equal, Int.hash);

  public func newPregunta(idPregunta : Int, datos : metaPreguntaInput) : async () { 
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
    preguntas.put(idPregunta, 
      {
        numero =datos.numero; 
        aspecto=datos.aspecto;
        numAspecto=datos.numAspecto;
        evidencia=datos.evidencia;
        activo=datos.activo;
        version=datos.version;
      } 
    );

    Debug.print("Pregunta agregada");
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

  public query func tamano() : async Text {
      var tama : Text = Nat.toText(preguntas.size());
      return tama
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};