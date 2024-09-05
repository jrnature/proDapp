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

  type metaRol = {
    idRol   : Int;
    nombre : Text;
    descripcion : Text;
    };

  type metaRolInput = {
    nombre : Text;
    descripcion : Text;

  };
  

  let roles = Map.HashMap<Int, metaRolInput>(0, Int.equal, Int.hash);

  public func newRol(idRol : Int, datos : metaRolInput) : async () { 

    if (datos.nombre == "") {
      Debug.trap("Ingrese el nombre que identificará el Rol");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion/funciones del rol");
    };
    
    roles.put(idRol, 
      {
        nombre =datos.nombre; 
        descripcion=datos.descripcion;
      } 
    );

    Debug.print("Rol agregado");
  };

  public query func getIdRol(idRol : Int) : async metaRolInput  {
    let rolGet = roles.get(idRol);
    var aux = switch (rolGet) {
      case (null) {
        {
          nombre =""; 
          descripcion="";
        };
      };
      case (?rolGet) rolGet;
    };
    return {
        nombre =aux.nombre; 
        descripcion=aux.descripcion;
    };
  };

  public func updateRol(idRol : Int, datos : metaRolInput) : async () {
     if (datos.nombre == "") {
      Debug.trap("Ingrese el nombre que identificará el Rol");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion/funciones del rol");
    };

    if (roles.replace(idRol, datos) == null) {
      Debug.trap("Rol no encontrado");
    };
  };

  public func deleteRol(idRol : Int) : async () {
    if (roles.remove(idRol) == null) {
      Debug.trap("Rol no encontrado");
    };
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};