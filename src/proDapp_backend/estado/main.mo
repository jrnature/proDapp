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

  type metaEstado = {
    idEstado   : Int;
    estado : Text;
    descripcion : Text;
    };

  type metaEstadoInput = {
    estado : Text;
    descripcion : Text;

  };
  

  let estados = Map.HashMap<Int, metaEstadoInput>(0, Int.equal, Int.hash);

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

  public query func tamano() : async Text {
      var tama : Text = Nat.toText(estados.size());
      return tama
  };

  public query func valores() : async Text {
    var estadoText : Text="";
   estadoText := "{";
    for ((idEstado, datos) in estados.entries()) {
        estadoText #= "\"idEstado\" : "  # Int.toText(idEstado) # ",\"estado\" : \"" # datos.estado # "\" , \"descripcion\": \"" # datos.descripcion # "\","
    };
    estadoText #= "\"idRol\":-1,\"nombre\":\"Seleccione una opcion\",\"descripcion\":\"Selecciona una opcion\"}";
      
      return estadoText
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};