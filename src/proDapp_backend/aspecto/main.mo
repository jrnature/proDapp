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

  type metaAspecto = {
    idAspecto   : Int;
    nombre : Text;
    descripcion : Text;
    };

  type metaAspectoInput = {
    nombre : Text;
    descripcion : Text;

  };
  

  let aspectos = Map.HashMap<Int, metaAspectoInput>(0, Int.equal, Int.hash);

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
    let rolAspecto = aspectos.get(idAspecto);
    var aux = switch (rolAspecto) {
      case (null) {
        {
          nombre =""; 
          descripcion="";
        };
      };
      case (?rolAspecto) rolAspecto;
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

  public func deleteRol(idAspecto : Int) : async () {
    if (aspectos.remove(idAspecto) == null) {
      Debug.trap("Aspecto no encontrado");
    };
  };

  public query func tamano() : async Text {
      var tama : Text = Nat.toText(aspectos.size());
      return tama
  };

  public query func valores() : async Text {
    var aspectoText : Text="";
   aspectoText := "{";
    for ((idAspecto, datos) in aspectos.entries()) {
        aspectoText #= "\"idAspecto\" : "  # Int.toText(idAspecto) # ",\"nombre\" : \"" # datos.nombre # "\" , \"descripcion\": \"" # datos.descripcion # "\","
    };
    aspectoText #= "\"idAspecto\":-1,\"nombre\":\"Seleccione una opcion\",\"descripcion\":\"Selecciona una opcion\"}";
      
      return aspectoText
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};