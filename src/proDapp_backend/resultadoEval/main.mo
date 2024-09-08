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

  type metaResultadoEval = {
    idResultadoEval  : Int;
    nombre : Text;
    descripcion : Text;
    };

  type metaResultadoEvalInput = {
    nombre : Text;
    descripcion : Text;

  };
  

  let resultadoEvals = Map.HashMap<Int, metaResultadoEvalInput>(0, Int.equal, Int.hash);

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

  public func updateRol(idResultadoEval : Int, datos : metaResultadoEvalInput) : async () {
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

  public func deleteRol(idResultadoEval : Int) : async () {
    if (resultadoEvals.remove(idResultadoEval) == null) {
      Debug.trap("Resultado de evaluaciones no encontrado");
    };
  };

  public query func tamano() : async Text {
      var tama : Text = Nat.toText(resultadoEvals.size());
      return tama
  };

  public query func valores() : async Text {
    var resultadoEvaluacionesText : Text="";
   resultadoEvaluacionesText := "{";
    for ((idResultadoEval, datos) in resultadoEvals.entries()) {
        resultadoEvaluacionesText #= "\"idResultadoEval\" : "  # Int.toText(idResultadoEval) # ",\"nombre\" : \"" # datos.nombre # "\" , \"descripcion\": \"" # datos.descripcion # "\","
    };
    resultadoEvaluacionesText #= "\"idResultadoEval\":-1,\"nombre\":\"Seleccione una opcion\",\"descripcion\":\"Selecciona una opcion\"}";
      
      return resultadoEvaluacionesText;
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};