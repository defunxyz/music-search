export default function convertNumber(number){
		var nbr=number.toString();
		var breakPoint=nbr.length%3;
		var result="";		
		if((breakPoint===0)&&(nbr.length>=6)){
			breakPoint+=3;
		}
		for(var j=0; j<nbr.length; j++){
				if((j===breakPoint)&&(breakPoint!==0)){	
					result+=",";						
					breakPoint+=3;
				} 
				result+=nbr[j];
		}
		return result;
}

export function capitalizefl(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}