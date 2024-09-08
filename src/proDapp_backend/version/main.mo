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

  type metaVersion = {
    idVersion   : Int;
    version : Text;
    descripcion : Text;
    };

  type metaVersionInput = {
    version : Text;
    descripcion : Text;

  };
  

  let versiones = Map.HashMap<Int, metaVersionInput>(0, Int.equal, Int.hash);

  public func newVersion(idVersion : Int, datos : metaVersionInput) : async () { 

    if (datos.version == "") {
      Debug.trap("Ingrese la versión de la Evaluacion");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion de la versión de la evaluacion");
    };
    
    versiones.put(idVersion, 
      {
        version =datos.version; 
        descripcion=datos.descripcion;
      } 
    );

    Debug.print("Version agregada");
  };

  public query func getVersion(idVersion : Int) : async metaVersionInput  {
    let versionGet = versiones.get(idVersion);
    var aux = switch (versionGet) {
      case (null) {
        {
          version =""; 
          descripcion="";
        };
      };
      case (?versionGet) versionGet;
    };
    return {
        version =aux.version; 
        descripcion=aux.descripcion;
    };
  };

  public func updateVersion(idVersion : Int, datos : metaVersionInput) : async () {
     if (datos.version == "") {
      Debug.trap("Ingrese la versión de la Evaluacion");
    };
    if (datos.descripcion == "") {
      Debug.trap("Ingrese la descripcion de la versión de la evaluacion");
    };

    if (versiones.replace(idVersion, datos) == null) {
      Debug.trap("Version no encontrada");
    };
  };

  public func deleteVersion(idVersion : Int) : async () {
    if (versiones.remove(idVersion) == null) {
      Debug.trap("Version no encontrada")
    };
  };

  public query func tamano() : async Text {
      var tama : Text = Nat.toText(versiones.size());
      return tama
  };

  public query func valores() : async Text {
    var versionText : Text="";
   versionText := "{";
    for ((idVersion, datos) in versiones.entries()) {
        versionText #= "\"idVersion\" : "  # Int.toText(idVersion) # ",\"version\" : \"" # datos.version # "\" , \"descripcion\": \"" # datos.descripcion # "\","
    };
    versionText #= "\"idRol\":-1,\"nombre\":\"Seleccione una opcion\",\"descripcion\":\"Selecciona una opcion\"}";
      
      return versionText
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

};