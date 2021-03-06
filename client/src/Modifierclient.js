import React, { Component } from "react";
import {
  Col,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Form
} from "react-bootstrap";
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import "./containers/Signup.css";
import {getWeb3} from "./getWeb3"
import map from "./artifacts/deployments/map.json"
import {getEthereum} from "./getEthereum"
import Select from 'react-select'

const ipfsClient = require('ipfs-api')
// connect to ipfs daemon API server
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

class Modifierclient extends Component {
 
    state = {
        web3: null,
        accounts: null,
        chainid: null,
        compte : null,
        selectedFile: null,
        compte:null,
          nom:"",
          acteur:"",
          responsable:"",
          numtva:"",
          numsiret:"",
          numape:"",
          numopco:"",
          numagrement:"",
          tel:"",
          fax:"",
          email:"",
          siteweb:"",
          adresse:"",
          codepostal:"",
          ville:"",
          region:"",
          pays:"",
          logo:"",
          password:"",
          buffer : null,
          account : ""
    }
  
    validateForm() {
        return (
          this.state.nom.length > 0 &&
          this.state.acteur.length > 0 &&
          this.state.responsable.length > 0 &&
          this.state.numtva.length > 0 &&
          this.state.numsiret.length > 0 &&
          this.state.numape.length > 0 &&
          this.state.numopco.length > 0 &&
          this.state.numagrement.length > 0 &&
          this.state.tel.length > 0 &&
          this.state.fax.length > 0 &&
          this.state.email.length > 0 &&
          this.state.siteweb.length > 0 &&
          this.state.adresse.length > 0 &&
          this.state.codepostal.length > 0 &&
          this.state.ville.length > 0 &&
          this.state.region.length > 0 &&
          this.state.pays.length > 0 &&
          this.state.logo.length > 0 &&
          this.state.account.length > 0 &&
          this.state.password.length > 0 
     
        );
      }
   
   
    componentDidMount = async () => {

        // Get network provider and web3 instance.
        const web3 = await getWeb3()

        // Try and enable accounts (connect metamask)
        try {
            const ethereum = await getEthereum()
            ethereum.enable()
        } catch (e) {
            console.log(`Could not enable accounts. Interaction with contracts not available.
            Use a modern browser with a Web3 plugin to fix this issue.`)
            console.log(e)
        }

        // Use web3 to get the user's accounts
        const accounts = await web3.eth.getAccounts()

        // Get the current chain id
        const chainid = parseInt(await web3.eth.getChainId())

        this.setState({
            web3,
            accounts,
            chainid
        }, await this.loadInitialContracts)
        const compte = await this.loadContract("dev", "Compte")
        var j = localStorage.getItem('id');
        const l = await compte.methods.getlogo(j).call()
        const nm = await compte.methods.getnom(j).call()
        const ac = await compte.methods.getacteur(j).call()
        const res = await compte.methods.getresponsable(j).call()
        const accou = await compte.methods.getaccount(j).call()
        const numt = await compte.methods.getnumtva(j).call()
        const em = await compte.methods.getemail(j).call()
        const te = await compte.methods.gettel(j).call()
        const add = await compte.methods.getadresse(j).call()
        const nums = await compte.methods.getnumsiret(j).call()
        const numa = await compte.methods.getnumape(j).call()
        const numo = await compte.methods.getnumopco(j).call()
        const numag = await compte.methods.getnumagrement(j).call()
        const fa = await compte.methods.getfax(j).call()
        const si = await compte.methods.getsiteweb(j).call()
        const cp = await compte.methods.getcodepostal(j).call()
        const vi = await compte.methods.getville(j).call()
        const re = await compte.methods.getregion(j).call()
        const pa = await compte.methods.getpays(j).call()
        const pas = await compte.methods.getpassword(j).call()
            console.log(accou)
            console.log(fa)
            console.log(ac)
        this.setState({
                id : j,
                logo : l,
                nom: nm,
                acteur : ac,
                responsable : res,
                account :accou,
                numtva : numt,
                email: em,
                tel : te,
                adresse : add,
                numsiret : nums,
                numape : numa,
                numopco : numo,
                numagrement :  numag,
                fax : fa,
                siteweb : si,
                codepostal : cp,
                ville : vi,
                region : re,
                pays : pa,
                password : pas
            })
    }


    loadInitialContracts = async () => {
        if (this.state.chainid <= 42) {
            // Wrong Network!
            return
        }
        const compte = await this.loadContract("dev", "Compte")

        if (!compte) {
            return
        }
        this.setState({
          compte
        })
    }
    onChangeHandlerimage= (event)=>{
      event.preventDefault()
        //Process file for IPFS ....
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({buffer : Buffer.from(reader.result)})
        }
    }
    loadContract = async (chain, contractName) => {
        // Load a deployed contract instance into a web3 contract object
        const {web3} = this.state

        // Get the address of the most recent deployment from the deployment map
        let address
        try {
            address = map[chain][contractName][0]
        } catch (e) {
            console.log(`Couldn't find any deployed contract "${contractName}" on the chain "${chain}".`)
            return undefined
        }

        // Load the artifact with the specified address
        let contractArtifact
        try {
            contractArtifact = await import(`./artifacts/deployments/${chain}/${address}.json`)
        } catch (e) {
            console.log(`Failed to load contract artifact "./artifacts/deployments/${chain}/${address}.json"`)
            return undefined
        }

        return new web3.eth.Contract(contractArtifact.abi, address)
    }

    Modifier = async (e) => {
      const {accounts,compte,account,acteur,nom,responsable,numtva,tel,adresse,email,password,numsiret,numape,numopco,numagrement,fax,siteweb,codepostal,ville,region,pays} = this.state
    
      e.preventDefault()
      console.log("Submitting File .....")
      if (this.state.buffer){
          const file = await ipfs.add(this.state.buffer)
          this.state.logo = file[0]["hash"]
          console.log(this.state.logo)
        
      }
      var _logo = this.state.logo
      var _nom = nom
      var _acteur = acteur
      var _responsable= responsable
      var _numtva = numtva
      var _tel = tel
      var _adresse = adresse
      var _email = email
      var _password = password
      var _numsiret =numsiret
      var _numape = numape
      var _numopco = numopco
      var _numagrement = numagrement
      var _fax = fax
      var _siteweb = siteweb
      var _codepostal = codepostal
      var _ville = ville
      var _region = region
      var _pays = pays
      var _account = account
      var id = localStorage.getItem("id")
     
      var result = await compte.methods.modifierclientinfo(id,_logo,_nom,_acteur,_responsable,_numtva,_tel,_adresse,_email,_password,_numsiret,_numape,_numopco,_numagrement,_fax,_siteweb,_codepostal,_ville,_region,_pays,_account).send({from: accounts[0]})
      alert("le compte est modifi??")
      this.props.history.push("/Listecomptes");
        
  }
 
    
    
    render() {

      const {
        web3, accounts, chainid,compte
        } = this.state

        if (!web3) {
            return <div>Loading Web3, accounts, and contracts...</div>
        }

        if (isNaN(chainid) || chainid <= 42) {
            return <div>Wrong Network! Switch to your local RPC "Localhost: 8545" in your Web3 provider (e.g. Metamask)</div>
        }

        if (!compte) {
            return <div>Could not find a deployed contract. Check console for details.</div>
        }
        const options = [
          { value: 'contoleur', label: 'Contoleur' },
          { value: 'abatoirs', label: 'Abatoirs' },
          { value: 'fabricants', label: 'Fabricants' },
          { value: "organismedecontrole" , label: 'organisme de contr??le'},
          { value: 'logistiques', label: 'Logistique' },
          { value: 'sacrificateur', label: 'Sacrificateur' },
          { value: 'organisme_de_certification', label: 'Organisme de certification' },
          { value: 'societe_de_netoyage', label: 'Soci??t?? de n??toyage' },
          { value: 'eleveur', label: 'Eleveur' },
          { value: 'atelier_de_decoupe', label: 'Atelier de d??coupe' },
          
        ]
        const isAccountsUnlocked = accounts ? accounts.length > 0 : false
      return (
        <div className="container">
           
            {
                !isAccountsUnlocked ?
                    <p><strong>Connect with Metamask and refresh the page to
                        be able to edit the storage fields.</strong>
                    </p>
                    : null
            }
           
           <br/><br/>
          <h3>Ajouter un compte</h3>

            <form enctype = "multipart/form-data" onSubmit={(e) => this.Modifier(e)}>
            <Form.Row>
            <FormGroup as={Col}  controlId="nom" bsSize="large">
              <FormLabel> Nom</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.nom}
                onChange={(e) => this.setState({nom: e.target.value})}
              />
            </FormGroup>
            <FormGroup as={Col}  controlId="acteur" bsSize="large">
            <FormLabel> Acteur</FormLabel>
            <FormControl
                as="select"
                value={this.state.acteur}
                onChange={(e) => this.setState({acteur: e.target.value})}
              >
                <option value="contoleur">Contoleur</option>
                <option value="abatoirs">Abatoirs</option>
                <option value="fabricants">Fabricants</option>
                <option value="organismedecontrole">organisme de contr??le</option>
                <option value="logistiques">Logistique</option>
                <option value="sacrificateur">Sacrificateur</option>
                <option value="organisme_de_certification">Fabricants</option>
                <option value="societe_de_netoyage">Soci??t?? de n??toyage</option>
                <option value="eleveur">Eleveur</option>
                <option value="atelier_de_decoupe">Atelier de d??coupe</option>
               </FormControl>
            </FormGroup>
            </Form.Row>
            <Form.Row>
            <FormGroup as={Col}  controlId="responsable" bsSize="large">
              <FormLabel>Responsable</FormLabel>
              <FormControl
                value={this.state.responsable}
                onChange={(e) => this.setState({responsable: e.target.value})}
                type="text"
              />
            </FormGroup>
            <FormGroup as={Col}  controlId="numtva" bsSize="large">
              <FormLabel>Num tva</FormLabel>
              <FormControl
                value={this.state.numtva}
                onChange={(e) => this.setState({numtva: e.target.value})}
                type="text"
              />
            </FormGroup>
            </Form.Row>
            <Form.Row>
            <FormGroup as={Col} controlId="logo" bsSize="large">
              <FormLabel>Logo</FormLabel>
              <FormControl
                autoFocus
                type="file"
                name="logo"
                onChange={this.onChangeHandlerimage}
              />
            </FormGroup>
            <FormGroup as={Col}  controlId="tel" bsSize="large">
              <FormLabel>Votre Numero de telephone</FormLabel>
              <FormControl
                value={this.state.tel}
                onChange={(e) => this.setState({tel: e.target.value})}
                type="text"
              />
            </FormGroup>
            </Form.Row>
            <Form.Row>
            <FormGroup as={Col}  controlId="addresse" bsSize="large">
              <FormLabel>Votre Adresse</FormLabel>
              <FormControl
                value={this.state.adresse}
                onChange={(e) => this.setState({adresse: e.target.value})}
                type="text"
              />
            </FormGroup>
            <FormGroup as={Col} controlId="email" bsSize="large">
              <FormLabel>Votre email</FormLabel>
              <FormControl
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})}
                type="email"
              />
            </FormGroup>
            </Form.Row>
          <Form.Row>
          <FormGroup as={Col}  controlId="pays" bsSize="large">
              <FormLabel>pays</FormLabel>
              <FormControl
                value={this.state.pays}
                onChange={(e) => this.setState({pays: e.target.value})}
                type="text"
              />
            </FormGroup>
            <FormGroup as={Col}  controlId="account" bsSize="large">
              <FormLabel> Account</FormLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.account}
                onChange={(e) => this.setState({account: e.target.value})}
              
              />
            </FormGroup>
            </Form.Row>
          <Form.Row>
          <FormGroup as={Col}  controlId="codepostal" bsSize="large">
              <FormLabel>code postal</FormLabel>
              <FormControl
                value={this.state.codepostal}
                onChange={(e) => this.setState({codepostal: e.target.value})}
                type="text"
              />
            </FormGroup>
           
          <FormGroup as={Col}  controlId="region" bsSize="large">
              <FormLabel>region</FormLabel>
              <FormControl
                value={this.state.region}
                onChange={(e) => this.setState({region: e.target.value})}
                type="text"
              />
            </FormGroup>
            </Form.Row>
          <Form.Row>
          <FormGroup as={Col}  controlId="addresse" bsSize="large">
              <FormLabel>ville</FormLabel>
              <FormControl
                value={this.state.ville}
                onChange={(e) => this.setState({ville: e.target.value})}
                type="text"
              />
            </FormGroup>
           
          <FormGroup as={Col}  controlId="siteweb" bsSize="large">
              <FormLabel>site web</FormLabel>
              <FormControl
                value={this.state.siteweb}
                onChange={(e) => this.setState({siteweb: e.target.value})}
                type="text"
              />
            </FormGroup>
            </Form.Row>
        <Form.Row>
          <FormGroup as={Col}  controlId="fax" bsSize="large">
              <FormLabel>num fax</FormLabel>
              <FormControl
                value={this.state.fax}
                onChange={(e) => this.setState({fax: e.target.value})}
                type="text"
              />
            </FormGroup>
           
          <FormGroup as={Col}  controlId="numopco" bsSize="large">
              <FormLabel>num opco</FormLabel>
              <FormControl
                value={this.state.numopco}
                onChange={(e) => this.setState({numopco: e.target.value})}
                type="text"
              />
            </FormGroup>
            </Form.Row>
            <Form.Row>
          <FormGroup as={Col}  controlId="numagrement" bsSize="large">
              <FormLabel>num agrement</FormLabel>
              <FormControl
                value={this.state.numagrement}
                onChange={(e) => this.setState({numagrement: e.target.value})}
                type="text"
              />
            </FormGroup>
           
          <FormGroup as={Col}  controlId="numsiret" bsSize="large">
              <FormLabel>num siret</FormLabel>
              <FormControl
                value={this.state.numsiret}
                onChange={(e) => this.setState({numsiret: e.target.value})}
                type="text"
              />
            </FormGroup>
            </Form.Row>
            <Form.Row>
          <FormGroup as={Col}  controlId="numape" bsSize="large">
              <FormLabel>num ape</FormLabel>
              <FormControl
                value={this.state.numape}
                onChange={(e) => this.setState({numape: e.target.value})}
                type="text"
              />
            </FormGroup>
           
            <FormGroup as={Col}  controlId="password" bsSize="large">
            <FormLabel> Mot de passe</FormLabel>
            <FormControl
                value={this.state.password}
                onChange={(e) => this.setState({password: e.target.value})}
                type="password"
            />
            </FormGroup>
            
            </Form.Row>
              <Button
              block
              bsSize="large"
              text="Ajouter"
              type="submit"
              variant = "primary"
              >Ajouter</Button>
              
              </form>
            
        </div>);
    }
}

export default Modifierclient
