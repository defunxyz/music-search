export default function filterList (q, list) {
    function escapeRegExp(s) {
      return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    const words = q
      .split(/\s+/g)
      .map(s => s.trim())
      .filter(s => !!s);
    const hasTrailingSpace = q.endsWith(" ");
    const searchRegex = new RegExp(
      words
        .map((word, i) => {
          if (i + 1 === words.length && !hasTrailingSpace) {
            // The last word - ok with the word being "startswith"-like
            return `(?=.*\\b${escapeRegExp(word)})`;
          } else {
            // Not the last word - expect the whole word exactly
            return `(?=.*\\b${escapeRegExp(word)}\\b)`;
          }
        })
        .join("") + ".+",
      "gi"
    );
    return list.filter(item => {
      return searchRegex.test(item.title);
    });
}

export default function convertNumber(number){
		var nbr=number.toString();
		var breakPoint=nbr.length%3;
		var result="";		
		if((breakPoint==0)&&(nbr.length>=6)){
			breakPoint+=3;
		}
		for(j=0; j<nbr.length; j++){
				if((j==breakPoint)&&(breakPoint!=0)){	
					result+=",";						
					breakPoint+=3;
				} 
				result+=nbr[j];
		}
		console.log(result);
		return result;
	}