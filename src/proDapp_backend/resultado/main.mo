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

  type metaResultado = {
    idResultado   : Int;
    resultado : Text;
    descripcion : Text;
    };

  type metaResultadoInput = {
    resultado : Text;
    descripcion : Text;
  };
  

  let resultados = Map.HashMap<Int, metaResultadoInput>(0, Int.equal, Int.hash);

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

  public query func tamano() : async Text {
      var tama : Text = Nat.toText(resultados.size());
      return tama
  };

  public query func valores() : async Text {
    var resultadoText : Text="";
   resultadoText := "{";
    for ((idResultado, datos) in resultados.entries()) {
        resultadoText #= "\"idResultado\" : "  # Int.toText(idResultado) # ",\"resultado\" : \"" # datos.resultado # "\" , \"descripcion\": \"" # datos.descripcion # "\","
    };
    resultadoText #= "\"idResultado\":-1,\"resultado\":\"Seleccione una opcion\",\"descripcion\":\"Selecciona una opcion\"}";
      
      return resultadoText
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};