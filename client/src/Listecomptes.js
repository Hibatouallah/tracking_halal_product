import React, {Component} from "react"
import {getWeb3} from "./getWeb3"
import map from "./artifacts/deployments/map.json"
import {getEthereum} from "./getEthereum"
import { Card,Container,Row,Image,Col,Table,Button} from "react-bootstrap"

import updateicon from './img/update.png';
import deleteicon from './img/delete.png';
class Listecomptes extends Component {

    state = {
        web3: null,
        accounts: null,
        chainid: null,
        compte : null,
        listenregistrements:[], 
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
            chainid,
        }, await this.loadInitialContracts)
    
        const compte = await this.loadContract("dev", "Compte")
        const nb = await compte.methods.getnbcompte().call()
        for (var j = 0; j<nb; j++){
            const nm = await compte.methods.getnom(j).call()
            if(nm != ""){
                const l = await compte.methods.getlogo(j).call()
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
                console.log(accou)
                console.log(fa)
                console.log(cp)
                const listc = [{
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
                    pays : pa
                }]
                this.setState({
                    listenregistrements:[...this.state.listenregistrements,listc] 
                })
                
            }
            
        }
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
    updateclient = async(id) => {
        localStorage.setItem('id',id)
        this.props.history.push("/modifierclient");
      }
    supprimerclient= async(id) => {
        const {accounts,compte} = this.state
        var result = await compte.methods.suuprimercompte(id).send({from: accounts[0]})
        alert("le compte est supprimé")
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

        const isAccountsUnlocked = accounts ? accounts.length > 0 : false
     
        return (<div className="container">
           
            {
                !isAccountsUnlocked ?
                    <p><strong>Connect with Metamask and refresh the page to
                        be able to edit the storage fields.</strong>
                    </p>
                    : null
            }
        
           
            <h3 class ='h3style'>Liste des projets </h3>

            <Table responsive >
                <thead class="thead-dark">
                    <tr>
                    <th>Action</th>
                    <th>Photo</th>
                    <th>Nom</th>
                    <th>Acteur</th>
                    <th>Responsable</th>
                    <th>Account</th>
                    <th>N_tva</th>
                    <th>Email</th>
                    <th>Tel</th>
                    <th>Addresse</th>
                    <th>N_siret</th>
                    <th>N_ape</th>
                    <th>N_opco</th>
                    <th>N_agrement</th>
                    <th>Fax</th>
                    <th>Site_web</th>
                    <th>Code_postal</th>
                    <th>Ville</th>
                    <th>Region</th>
                    <th>Pays</th>
                    </tr>
                </thead>
                <tbody>
                {this.state.listenregistrements.map((list) =>
                    <tr>
                     
                        <td>
                            <center>
                                <Image onClick={() => this.updateclient(list[0].id)} src={updateicon} roundedCircle />
                                <Image onClick={() => this.supprimerclient(list[0].id)} src={deleteicon} roundedCircle />
                            </center></td>
                        <td><Card.Img className="photo" variant="top" src={`https://ipfs.infura.io/ipfs/${list[0].logo}`}/></td>
                        <td>{list[0].nom}</td>
                        <td>{list[0].acteur}</td>
                        <td>{list[0].responsable}</td>
                        <td>{list[0].account}</td>
                        <td>{list[0].numtva}</td>
                        <td>{list[0].email}</td>
                        <td>{list[0].tel}</td>
                        <td>{list[0].adresse}</td>
                        <td>{list[0].numsiret}</td>
                        <td>{list[0].numape}</td>
                        <td>{list[0].numopco}</td>
                        <td>{list[0].numagrement}</td>
                        <td>{list[0].fax}</td>
                        <td>{list[0].siteweb}</td>
                        <td>{list[0].codepostal}</td>
                        <td>{list[0].ville}</td>
                        <td>{list[0].region}</td>
                        <td>{list[0].pays}</td>
                    </tr>
                )}
                </tbody>
            </Table>
           
        </div>)
    }
}

export default Listecomptes
