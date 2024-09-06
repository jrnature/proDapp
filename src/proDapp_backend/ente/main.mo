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

  type metaEnte = {
    idEnte   : Int;
    nombre : Text;
    director : Text;
    correo : Text;
    telefono : Text;
    enlace : Text;
    };

  type metaEnteInput = {
    nombre : Text;
    director : Text;
    correo : Text;
    telefono : Text;
    enlace : Text;
  };
  

  let entes = Map.HashMap<Int, metaEnteInput>(0, Int.equal, Int.hash);

  public func newEnte(idEnte : Int, datos : metaEnteInput) : async () { 

    if (datos.nombre == "") {
      Debug.trap("Ingrese el nombre de ente obligado");
    };
    if (datos.director == "") {
      Debug.trap("Ingrese el nombre del director");
    };
    if (datos.correo == "") {
      Debug.trap("Ingrese el correo de contacto");
    };
    if (datos.telefono == "") {
      Debug.trap("Ingrese el telefono de contacto");
    };
     if (datos.enlace == "") {
      Debug.trap("Ingrese el nombre del enlace");
    };
    
    entes.put(idEnte, 
      {
        nombre =datos.nombre; 
        director=datos.director;
        correo=datos.correo;
        telefono=datos.telefono;
        enlace=datos.enlace;
      } 
    );

    Debug.print("Usuario agregado");
    
  };

  public query func getEnte(idEnte : Int) : async metaEnteInput  {
    let enteGet = entes.get(idEnte);
    var aux = switch (enteGet) {
      case (null) {
        {
          nombre =""; 
          director="";
          correo="";
          telefono="";
          enlace="";
        };
      };
      case (?enteGet) enteGet;
    };
    return {
        nombre =aux.nombre; 
        director=aux.director;
        correo=aux.correo;
        telefono=aux.telefono;
        enlace=aux.enlace;
    };
  };

  public func updateEnte(idEnte : Int, datos : metaEnteInput) : async () {
     if (datos.nombre == "") {
      Debug.trap("Ingrese el nombre de ente obligado");
    };
    if (datos.director == "") {
      Debug.trap("Ingrese el nombre del director");
    };
    if (datos.correo == "") {
      Debug.trap("Ingrese el correo de contacto");
    };
    if (datos.telefono == "") {
      Debug.trap("Ingrese el telefono de contacto");
    };
     if (datos.enlace == "") {
      Debug.trap("Ingrese el nombre del enlace");
    };

    if (entes.replace(idEnte, datos) == null) {
      Debug.trap("Ente obligado no encontrado");
    };
  };

  public func deleteUsuario(idEnte : Int) : async () {
    if (entes.remove(idEnte) == null) {
      Debug.trap("Ente obligado no encontrado");
    };
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};


