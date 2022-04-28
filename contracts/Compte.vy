#pragma line
# @version ^0.2.0
#Contract Compte

nbCompte : uint256

@external
def __init__():
    self.nbCompte = 0
  

#Informations sur le compte

struct Compte:
    logo : String[1000]
    nom: String[100]
    acteur : String[100]
    responsable : String[100]
    account : String[1000]
    numtva : String[100]
    email: String[200]
    password : String[100]
    tel : String[100]
    adresse : String[1000]
    numsiret : String[100]
    numape : String[100]
    numopco : String[100]
    numagrement : String[100]
    fax : String[100]
    siteweb : String[100]
    codepostal : String[100]
    ville : String[100]
    region : String[100]
    pays : String[100]

listeCompte : public(HashMap[uint256,Compte])

@external 
def suuprimercompte(nb:uint256):
    self.listeCompte[nb].nom = ""
    self.listeCompte[nb].acteur =  ""
    self.listeCompte[nb].responsable = "" 
    self.listeCompte[nb].account =  "" 
    self.listeCompte[nb].numtva =  "" 
    self.listeCompte[nb].email =  "" 
    self.listeCompte[nb].password =  "" 
    self.listeCompte[nb].tel =  "" 
    self.listeCompte[nb].adresse =  "" 
    self.listeCompte[nb].numsiret =  "" 
    self.listeCompte[nb].numape =  "" 
    self.listeCompte[nb].numopco =  "" 
    self.listeCompte[nb].numagrement =  "" 
    self.listeCompte[nb].fax =  "" 
    self.listeCompte[nb].siteweb =  "" 
    self.listeCompte[nb].codepostal =  "" 
    self.listeCompte[nb].ville =  "" 
    self.listeCompte[nb].region =  "" 
    self.listeCompte[nb].pays =  "" 
    self.listeCompte[nb].logo = ""

@external
def Inscriptioncompte(_logo: String[1000],_nom:String[100],_acteur: String[100],_responsable: String[100],_numtva: String[100],_tel: String[100],_adresse: String[1000],_email: String[200],_password: String[100],_numsiret: String[100],_numape: String[100],_numopco: String[100],_numagrement: String[100],_fax: String[100],_siteweb: String[100],_codepostal: String[100],_ville: String[100],_region: String[100],_pays: String[100],_account: String[1000]):
    self.listeCompte[self.nbCompte] = Compte({
        logo : _logo,
        nom: _nom ,
        acteur : _acteur ,
        responsable : _responsable ,
        account : _account ,
        numtva : _numtva ,
        email : _email ,
        password : _password ,
        tel : _tel ,
        adresse : _adresse ,
        numsiret : _numsiret ,
        numape : _numape ,
        numopco : _numopco ,
        numagrement : _numagrement ,
        fax : _fax ,
        siteweb : _siteweb ,
        codepostal : _codepostal ,
        ville : _ville ,
        region : _region ,
        pays : _pays 
      })
    self.nbCompte = self.nbCompte + 1


@external
def modifierclientinfo(nb:uint256,_photo:String[200],_nom:String[100],_acteur: String[100],_responsable: String[100],_numtva: String[100],_tel: String[100],_adresse: String[1000],_email: String[200],_password: String[100],_numsiret: String[100],_numape: String[100],_numopco: String[100],_numagrement: String[100],_fax: String[100],_siteweb: String[100],_codepostal: String[100],_ville: String[100],_region: String[100],_pays: String[100],_account: String[1000]):
    self.listeCompte[nb].nom = _nom
    self.listeCompte[nb].acteur =  _acteur
    self.listeCompte[nb].responsable = _responsable 
    self.listeCompte[nb].account =  _account 
    self.listeCompte[nb].numtva =  _numtva 
    self.listeCompte[nb].email =  _email 
    self.listeCompte[nb].password =  _password 
    self.listeCompte[nb].tel =  _tel 
    self.listeCompte[nb].adresse =  _adresse 
    self.listeCompte[nb].numsiret =  _numsiret 
    self.listeCompte[nb].numape =  _numape 
    self.listeCompte[nb].numopco =  _numopco 
    self.listeCompte[nb].numagrement =  _numagrement 
    self.listeCompte[nb].fax =  _fax 
    self.listeCompte[nb].siteweb =  _siteweb 
    self.listeCompte[nb].codepostal =  _codepostal 
    self.listeCompte[nb].ville =  _ville 
    self.listeCompte[nb].region =  _region 
    self.listeCompte[nb].pays =  _pays 
    self.listeCompte[nb].logo = _photo


#nb

@external
def getnbcompte() -> uint256 :
    return self.nbCompte  

#compteinfos

@external
def getlogo(nb:uint256)->String[1000]:
    return self.listeCompte[nb].logo
@external
def getnom(nb:uint256)->String[100]:
    return self.listeCompte[nb].nom
@external
def getacteur(nb:uint256)->String[100]:
    return self.listeCompte[nb].acteur
@external
def getresponsable(nb:uint256)->String[100]:
    return self.listeCompte[nb].responsable
@external
def getaccount(nb:uint256)->String[1000]:
    return self.listeCompte[nb].account
@external
def getnumtva(nb:uint256)->String[100]:
    return self.listeCompte[nb].numtva
@external
def getemail(nb:uint256)->String[200]:
    return self.listeCompte[nb].email
@external
def getpassword(nb:uint256)->String[100]:
    return self.listeCompte[nb].password
@external
def gettel(nb:uint256)->String[100]:
    return self.listeCompte[nb].tel
@external
def getadresse(nb:uint256)->String[1000]:
    return self.listeCompte[nb].adresse
@external
def getnumsiret(nb:uint256)->String[100]:
    return self.listeCompte[nb].numsiret
@external
def getnumape(nb:uint256)->String[100]:
    return self.listeCompte[nb].numape
@external
def getnumopco(nb:uint256)->String[100]:
    return self.listeCompte[nb].numopco
@external
def getnumagrement(nb:uint256)->String[100]:
    return self.listeCompte[nb].numagrement
@external
def getfax(nb:uint256)->String[100]:
    return self.listeCompte[nb].fax
@external
def getsiteweb(nb:uint256)->String[100]:
    return self.listeCompte[nb].siteweb
@external
def getcodepostal(nb:uint256)->String[100]:
    return self.listeCompte[nb].codepostal
@external
def getville(nb:uint256)->String[100]:
    return self.listeCompte[nb].ville
@external
def getregion(nb:uint256)->String[100]:
    return self.listeCompte[nb].region
@external
def getpays(nb:uint256)->String[100]:
    return self.listeCompte[nb].pays

