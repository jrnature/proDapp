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

  type metaUsuario = {
    idUsuario   : Int;
    nombre : Text;
    puesto : Text;
    ente : Int;
    correo : Text;
    rol : Int;
    telefono : Text;
    username : Text;
    password : Text;

    };

  type metaUsuarioInput = {
    nombre : Text;
    puesto : Text;
    ente : Int;
    correo : Text;
    rol : Int;
    telefono : Text;
    username : Text;
    password : Text;
  };
  

  let usuarios = Map.HashMap<Int, metaUsuarioInput>(0, Int.equal, Int.hash);

  public func newUsuario(idUsuario : Int, datos : metaUsuarioInput) : async () { 

    if (datos.username == "") {
      Debug.trap("Ingrese un nombre de usuario");
    };
    if (datos.password == "") {
      Debug.trap("Ingrese un password");
    };
    if (datos.nombre == "") {
      Debug.trap("Ingrese un nombre");
    };
    if (datos.puesto == "") {
      Debug.trap("Ingrese un puesto");
    };
     if (datos.correo == "") {
      Debug.trap("Ingrese un correo de contacto");
    };
     if (datos.telefono == "") {
      Debug.trap("Ingrese un telefono de contacto");
    };
    if (datos.ente == 0 ) {
      Debug.trap("Ingrese la clave de la organizacion");
    };
    if (datos.rol == 0) {
      Debug.trap("Rol no reconocido");
    };
    
    usuarios.put(idUsuario, 
      {
        nombre =datos.nombre; 
        puesto=datos.puesto;
        ente=datos.ente;
        correo=datos.correo;
        rol=datos.rol;
        telefono=datos.telefono;
        username=datos.username;
        password=datos.password;
      } 
    );

    Debug.print("Usuario agregado");
  };

  public query func getUsuario(idUsuario : Int) : async metaUsuarioInput  {
    let usuarioGet = usuarios.get(idUsuario);
    var aux = switch (usuarioGet) {
      case (null) {
        {
          nombre =""; 
          puesto="";
          ente= 0;
          correo="";
          rol=0;
          telefono="";
          username="";
          password="";
        };
      };
      case (?usuarioGet) usuarioGet;
    };
    return {
        nombre =aux.nombre; 
        puesto=aux.puesto;
        ente=aux.ente;
        correo=aux.correo;
        rol=aux.rol;
        telefono=aux.telefono;
        username=aux.username;
        password=aux.password;
    };
  };

  public func updateUsuario(idUsuario : Int, datos : metaUsuarioInput) : async () {
    if (datos.username == "") {
      Debug.trap("Ingrese un nombre de usuario");
    };
    if (datos.password == "") {
      Debug.trap("Ingrese un password");
    };
    if (datos.nombre == "") {
      Debug.trap("Ingrese un nombre");
    };
    if (datos.puesto == "") {
      Debug.trap("Ingrese un puesto");
    };
     if (datos.correo == "") {
      Debug.trap("Ingrese un correo de contacto");
    };
     if (datos.telefono == "") {
      Debug.trap("Ingrese un telefono de contacto");
    };
    if (datos.ente == 0) {
      Debug.trap("Ingrese la clave de la organizacion");
    };
    if (datos.rol == 0) {
      Debug.trap("Rol no reconocido");
    };

    if (usuarios.replace(idUsuario, datos) == null) {
      Debug.trap("Usuario no encontrado");
    };
  };

  public func deleteUsuario(idUsuario : Int) : async () {
    if (usuarios.remove(idUsuario) == null) {
      Debug.trap("Usuario no encontrado");
    };
  };

  public query func tamano() : async Text {
      var tama : Text = Nat.toText(usuarios.size());
      return tama
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};