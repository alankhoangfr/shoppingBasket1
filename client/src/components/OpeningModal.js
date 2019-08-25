import React, {useRef,useState,createRef} from "react"
import {Modal, ModalHeader, ModalBody, ModalFooter,Button} from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { styled } from '@material-ui/styles'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
	left: {
		width: '150px',
		margin: "16px",
		backgroundColor: theme.palette.background.paper,
	},
	right: {
		width: '600px',
		padding:"16px",
		overflowY:"overlay",
		backgroundColor: theme.palette.background.paper,
	},
	root: {
		height:"500px",
		display:"flex",
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	}));
function ListItemLink(props) {
	return <ListItem button component="a" {...props} />;
}

const OpeningModal = (props)=>{
	const classes = useStyles()
	const [openModal,setOpenModal]=useState(true)
	const toggle = ()=>{
		setOpenModal(!openModal)
	}
	const [open, setOpen] = React.useState(true);

  	const handleClick = ()=> {
    	setOpen(!open);
  	}
  	const MyButton = styled(Fab)({
	  	position: 'relative ',
	  	height:"36px",
	  	width:"36px",
	});
  	const plusButton = 
  		<MyButton size="small" color="primary" aria-label="Add"  >
        	<AddIcon />
      	</MyButton>
    const onScoll=(event)=>{
    	console.log(event)
    }
    const [anchorEl, setAnchorEl] = React.useState(null)
    const [lang, setLang] = React.useState("english")
  	function handleClickLanuage(event) {
    	setAnchorEl(event.currentTarget)

    }
    function handleClose(name,event) {
    	setLang(name);
    	setAnchorEl(null);
    }
    const language = 
		<div>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickLanuage} >
			Language
			</Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose.bind(this,"english")}>English</MenuItem>
				<MenuItem onClick={handleClose.bind(this,"french")}>Francais</MenuItem>
			</Menu>
		</div>
	const outputModal = (lang)=>{
		if(lang==="english"){
			return englishModal
		}else if(lang==="french"){
			return frenchModal
		}
	}
    const englishModal =
		<Modal isOpen={openModal} toggle={toggle} size="lg">
			<ModalHeader toggle={toggle}>Information on CompareBasket </ModalHeader>
			<ModalBody className={classes.root}>
				<div className={classes.left} onScroll={onScoll}>
					<ListItemLink href="#capabilites" onClick={handleClick}>
						<ListItemText primary="Capabilites" />
					</ListItemLink>
					<ListItemLink href="#instruction" >
						<ListItemText primary="Instructions" />
					</ListItemLink>
					<ListItemLink href="#motivation" >
						<ListItemText primary="Motivation" />
					</ListItemLink>
					<ListItemLink href="#aspiration" >
						<ListItemText primary="Aspiration" />
					</ListItemLink>

				</div>
				<div className={classes.right}>
					<section id='intro'>
						<Typography variant="body1" gutterBottom>
					        Welcome to the CompareBasket. This is simply a quick explanation of the capabilities, motivation and future aspiration of the app.
      					</Typography>
						<br></br>
  					</section >
  					<section id="capabilites">
						<Typography variant="h5" gutterBottom >
					        Capabilities
					    </Typography>
					    <Typography variant="body1" gutterBottom>
					       Currently, the CompareBasket is MERN (MongoDb, Express,Reactjs,Nodejs) stack. It currently holds the information of over 10000 supermarkets 
					       in England from 
					       <a href="https://opendata.esriuk.com/datasets/944fbdf2a8fa4201bda5c1ba927dbe68_0" target="_blank"> 
					       		{" GeoLytix Open Supermarkets "} 
					       	</a>
					       Locations Data January 2015 and over 2000 food items from 
					       <a href="https://public.opendatasoft.com/explore/dataset/open-food-facts-products/export/" target="_blank">
					       		{" Open Food Facts "}
					       </a>
					        filtered for Australia. 
					       The food items were randomly assigned a price between $0 to $100 and then a sample of more 70% of all the food items were randomly assigned 
					       to each supermarket.
      					</Typography>
      					<br></br>
  					</section>
  					<section id='instruction'>
  						<Typography variant="h6" gutterBottom >
					        Instruction
					    </Typography>
					    <Typography variant="body1" gutterBottom>
					       Enter a location in England and click on a supermarket and {plusButton} for a basket comparison. There is a possibility of 3 supermarkets for 
					       comparison.	
      					</Typography>
      					<br></br>
					    <Typography variant="body1" gutterBottom>
					        Simply enter products and compare the basket of goods of each supermarket. 		
      					</Typography>
      					<br></br>
      				</section>
  					<section id='motivation'>
      					<Typography variant="h5" gutterBottom >
					        Motivation
					    </Typography>
					    <Typography variant="body1" gutterBottom>
					        The app for comparing items is not something new as sites such as Expedia compare hotel, plane and many more prices. 
					        The difference between CompareBasket and other apps is that the app can compare supermarkets according to a basket of goods.
					        When most people go to the supermarket, they will buy a basket of goods (weekly shopping, ingredients for a recipe) and 
					        will not individually compare each item and respectively buy those items in their surrounding supermarkets. 
					        It is simply time and money consuming.
      					</Typography>
      					<br></br>
      					<Typography variant="body1" gutterBottom>
					        As a result, shoppers would prefer to know which supermarket has the cheapest basket of goods.
					    </Typography>
      					<br></br>
  					</section>
  					<section id='aspiration'>
      					<Typography variant="h5" gutterBottom>
					        Aspiration
					    </Typography>
					    <Typography variant="body1" gutterBottom>
					    	Currently the app is using data from supermarkets in London and food items in Australia. The app needs development 
					    	in the scrapping of data such that the supermarkets and food items are of the same country. In addition, the ability
					    	 to match food items from various supermarkets in the country is of great importance for the comparison.
      					</Typography>
      					<br></br>
      					<Typography variant="body1" gutterBottom>
					    	The current user interface for searching a product is simply a recommended drop-down list. There needs to be a 
					    	development for a user friendly interface for searching and placing products in a basket. An initial constraint of
					    	 given supermarkets for comparison must be provided so that the searching interface provides only products and 
					    	 variation of the products that are in common in the given supermarkets. In addition, unlike the current app where 
					    	 a maximum of supermarket comparison is 3, the app could compare as many supermarkets in a given radius of a position.
      					</Typography>
      					<br></br>
      					<Typography variant="body1" gutterBottom>
							Once the app has determined which supermarket has the cheapest basket, it can send a buy request of that 
							basket to that supermarket. In addition, the app could have an algorithm that can determine a more 
							efficient alternative such as buying few selected foods at different supermarkets. It will take into consideration 
							of delivery costs from each supermarket.
      					</Typography>
      					<br></br>
      					<Typography variant="body1" gutterBottom>
					    	There is a big amount of development work required but a focus on the business side is more important in 
					    	order to justify for the development work. The current state of the app shows that it is possible to compare a basket 
					    	of goods from over 10000 supermarkets and 2000 food items.
      					</Typography>
  					</section>
				</div>
			</ModalBody>
			<ModalFooter>
				{language}
				<Button color="secondary" style={{marginLeft: "auto"}} onClick={toggle}>Cancel</Button>
			</ModalFooter>
		</Modal>


		const frenchModal =
		<Modal isOpen={openModal} toggle={toggle} size="lg">
			<ModalHeader toggle={toggle}>Informations sur CompareBasket</ModalHeader>
			<ModalBody className={classes.root}>
				<div className={classes.left} onScroll={onScoll}>
					<ListItemLink href="#capabilites" onClick={handleClick}>
						<ListItemText primary="Les capacités" />
					</ListItemLink>
					<ListItemLink href="#instruction" >
						<ListItemText primary="Instructions" />
					</ListItemLink>
					<ListItemLink href="#motivation" >
						<ListItemText primary="Motivation" />
					</ListItemLink>
					<ListItemLink href="#aspiration" >
						<ListItemText primary="Aspiration" />
					</ListItemLink>

				</div>
				<div className={classes.right}>
					<section id='intro'>
						<Typography variant="body1" gutterBottom>  
							Bienvenue dans le CompareBasket. Ceci est simplement une explication rapide des capacités, de la motivation et 
							des aspirations futures de l'application.
      					</Typography>
						<br></br>
  					</section >
  					<section id="capabilites">
						<Typography variant="h5" gutterBottom >
					        Les capacités
					    </Typography>
					    <Typography variant="body1" gutterBottom>
					       Actuellement, le CompareBasket est une stack MERN (MongoDb, Express, Reactjs, Nodejs). Il détient actuellement les informations 
					       de plus de 10000 supermarchés en Angleterre de
					       <a href="https://opendata.esriuk.com/datasets/944fbdf2a8fa4201bda5c1ba927dbe68_0" target="_blank"> 
					       		{" GeoLytix Open Supermarkets "} 
					       	</a>
					       Locations Data January 2015 et plus de 2000 produits alimentaires de
					       <a href="https://public.opendatasoft.com/explore/dataset/open-food-facts-products/export/" target="_blank">
					       		{" Open Food Facts "}
					       </a>
					       filtré pour l'Australie.Un prix compris entre 0 et 100 USD a été attribué au hasard aux aliments, 
					       puis un échantillon de plus de 70% de tous les aliments ont été attribués au hasard.
							à chaque supermarché.
      					</Typography>
      					<br></br>
  					</section>
  					<section id='instruction'>
  						<Typography variant="h6" gutterBottom >
					        Instruction
					    </Typography>
					    <Typography variant="body1" gutterBottom>
					      Entrez un lieu en Angleterre, cliquez sur un supermarché et sur {plusButton} pour comparer les paniers. Il y a une 
					      possibilité de 3 supermarchés pour Comparaison.
      					</Typography>
      					<br></br>
					    <Typography variant="body1" gutterBottom>
					        Il vous suffit d'entrer des produits et de comparer le panier de produits de chaque supermarché. 		
      					</Typography>
      					<br></br>
      				</section>
  					<section id='motivation'>
      					<Typography variant="h5" gutterBottom >
					        Motivation
					    </Typography>
					    <Typography variant="body1" gutterBottom>
					        L'application permettant de comparer des éléments n'est pas nouvelle, car des sites comme Expedia comparent les hôtels, 
					        les avions et de nombreux autres prix. La différence CompareBasket et d'autres applications est que l'application peut
					        comparer les supermarchés en fonction d'un panier de produits. Quand la plupart des gens vont au supermarché, ils achètent 
					        un panier de produits (courses hebdomadaires, ingrédients d’une recette) et ne compareront pas individuellement chaque
					        article et n’achèteront pas respectivement ces articles dans les supermarchés environnants. C'est tout simplement une perte 
					        de temps et d'argent.
      					</Typography>
      					<br></br>
      					<Typography variant="body1" gutterBottom>
					        En conséquence, les acheteurs préféreraient savoir quel supermarché propose le panier de produits le moins cher.
					    </Typography>
      					<br></br>
  					</section>
  					<section id='aspiration'>
      					<Typography variant="h5" gutterBottom>
					        Aspiration
					    </Typography>
					    <Typography variant="body1" gutterBottom>
					    	Actuellement, l'application utilise les données des supermarchés de Londres et des produits alimentaires en Australie. 
					    	L'application a besoin de développement lors de la mise au rebut de données telles que les supermarchés et les 
					    	produits alimentaires appartiennent au même pays. En outre, la capacité Associer des produits alimentaires provenant 
					    	de divers supermarchés du pays revêt une grande importance pour la comparaison.
      					</Typography>
      					<br></br>
      					<Typography variant="body1" gutterBottom>
							L'interface utilisateur actuelle pour la recherche d'un produit est simplement une liste déroulante recommandée. Il doit y avoir un
							développement dans une interface conviviale pour la recherche et le placement de produits dans un panier. Une contrainte initiale de
							des supermarchés donnés à des fins de comparaison doivent être fournis de sorte que l’interface de recherche ne fournisse que des produits et
							variation des produits qui sont en commun dans les supermarchés donnés. En outre, contrairement à l'application actuelle où
							un maximum de comparaison de supermarchés est de 3, l'application pourrait autant de supermarchés dans un rayon donné d'une position.
      					</Typography>
      					<br></br>
      					<Typography variant="body1" gutterBottom>
							Une fois que l'application a déterminé quel supermarché a le panier le moins cher, elle peut envoyer une demande d'achat de cette
							panier à ce supermarché. En outre, l’application pourrait avoir un algorithme permettant de déterminer si elle est
							une alternative efficace pour acheter quelques aliments sélectionnés dans différents supermarchés. Il prendra en compte
							des frais de livraison de chaque supermarché.
      					</Typography>
      					<br></br>
      					<Typography variant="body1" gutterBottom>
					    	Une grande quantité de travail de développement est nécessaire, mais il est actuellement plus important de se concentrer sur 
					    	les activités commerciales.afin de justifier le travail de développement. L'état actuel de l'application montre qu'il est
					    	possible de comparer un panier de produits de plus de 10000 supermarchés et 2000 produits alimentaires.
      					</Typography>
  					</section>
				</div>
			</ModalBody>
			<ModalFooter>
				{language}
				<Button color="secondary" onClick={toggle} style={{marginLeft: "auto"}} >Cancel</Button>
			</ModalFooter>
		</Modal>
	return(
		<React.Fragment>
		{outputModal(lang)}
		</React.Fragment>
		)
}

export default OpeningModal