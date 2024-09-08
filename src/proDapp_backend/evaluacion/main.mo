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

  type metaEvaluacion = {
    folio   : Int;
    ente : Int;
    usuario : Int;
    fechaInicio : Text;
    fechaFin : Text;
    evaluador : Int;
    resultado : Text;
    estado : Int;
    };

  type metaEvaluacionInput = {
    ente : Int;
    usuario : Int;
    fechaInicio : Text;
    fechaFin : Text;
    evaluador : Int;
    resultado : Int;
    estado : Int;
  };
  

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
      Debug.trap("Ingrese el estado que realizará en la evaluacion");
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
      } 
    );

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

    if (evaluaciones.replace(folio, datos) == null) {
      Debug.trap("Evaluacion no encontrada");
    };
  };

  public func deleteEvaluacion(folio : Int) : async () {
    if (evaluaciones.remove(folio) == null) {
      Debug.trap("Evaluacion no encontrada");
    };
  };

  public query func tamano() : async Text {
      var tama : Text = Nat.toText(evaluaciones.size());
      return tama
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};