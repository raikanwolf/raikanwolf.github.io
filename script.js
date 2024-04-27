let menuVisible=false;
//funcion que oculta o muestra el menu

function mostrarOcultarMenu(){
	if (menuVisible) {
		document.getElementById("nav").classList="";
	}else{
		document.getElementById("nav").classList="responsive";
		menuVisible=true;
	}
}

function seleccionar(){
	//oculto elmenu una vez que selecciones una opccion
	docum.getElementById("nav").classList="";
	menuVisible=false;
}

//funcion que aplica las animaciones de las habilidades
function efectoHabilidades(){
	var skills=document.getElementById("skills");
	var distancia_skills=window.innerHeight-skills.getBoundingClientRect().top;
	if (distancia_skills>=300) {
		let habilidades=document.getElementsByClassName("progreso");
		habilidades[0].classList.add("javascript");
		habilidades[1].classList.add("htmlcss");
		habilidades[2].classList.add("python");
		habilidades[3].classList.add("laravel");
		habilidades[4].classList.add("vue");
		habilidades[5].classList.add("comunicacion");
		habilidades[6].classList.add("trabajoEnEquipo");
		habilidades[7].classList.add("creatividad");
		habilidades[8].classList.add("dedicacion");
		habilidades[9].classList.add("proyect");
	}
}
//detecto es scrolling para aplasar la animacion de la barra
window.onscroll=function(){
	efectoHabilidades();
}