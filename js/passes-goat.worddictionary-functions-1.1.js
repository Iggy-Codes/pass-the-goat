//console.log("Total words" + dictionary.length);

//getRndInteger generates a random number between min and max, both included.
function getRndInteger(min, max) {
    
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//We check if the word is already in our list of words to play
function wordIsChoosed(result, word){

	var outWordIsChoosed = false;

	if(result.length > 0){
		
		result.forEach(function(resultElement){
					
			if(resultElement[1].word.toLowerCase() === word.word.toLowerCase()){
						
				outWordIsChoosed = true;	
			} 
		});	
	}
	
	return outWordIsChoosed;	
}


//we check if our word(object) is on array of objects
function wordIsInArray(wordArray, word){

	var outWordIsInArray = false;

	if(wordArray.length > 0){

		wordArray.forEach(function(wordElement){

			if(toString(wordElement.word.toLowerCase()) === toString(word.word.toLowerCase())){

				outWordIsInArray = true;

				return true;	
			} 
		});
	}

	return outWordIsInArray;	
}

//findWords selects a word from dictionary for every letter in your alphabet.
function findWords(alphabet,dictionary, language){

	var result = [];
	
	alphabet.split("").forEach(function(letter){
	
		var wordsFound = [];
	
		// we look for words that starts with this letter and not have been 
		// choosed previously for another letter from the language in use

		dictionary.forEach(function(wordDictionary){
			
			if(wordDictionary.language === language && wordDictionary.word.charAt(0).toLowerCase() === letter.toLowerCase() && !(wordIsChoosed(result,wordDictionary))){

					wordsFound.push(wordDictionary);
			}					 	 
		});
		// If we found 5 o more words that starts with a certain letter,
		// we choose one of them otherwise we add all the words that contains
		// this letter before we choose the word
		if(wordsFound.length > 4){
			
			result.push([letter, wordsFound[getRndInteger(0,(wordsFound.length - 1))], "first", answerPending]);

			alphabetToPlay += letter;
		
		}else{

			var positionInitialWords = wordsFound.length;
			
			//we look for words that containt the letter not in the first
			//position and don't start with the letter (avoid words that
			// contain the letter and also start by it)
			
			dictionary.forEach(function(wordDictionary){
				
				if((wordDictionary.language === language) && (wordDictionary.word.indexOf(letter) > 0) && (wordDictionary.word.charAt(0) !== letter)){
					
					
					//Check that the word is not already in the possible words
					//and not has been choosed from another letter
					if(!(wordIsInArray(wordsFound, wordDictionary)) && !(wordIsChoosed(result,wordDictionary))){
						
						console.log("----Choosed: " + (wordIsChoosed(result,wordDictionary)));	

						console.log("ADDING WORD ___ letter: " + letter + " word: " + wordDictionary.word + " to possible options");
					

						



						wordsFound.push(wordDictionary);		
					}
					
				} 
			});
			
			//If we don't find word with a certain letter, the program tell us
			//and we will not play with this letter.
			if(wordsFound.length === 0) 
				console.log("No words for " + letter);
				//console.log("Error. We can't find a word for letter " + letter);
			
			else{
				
				//var wordChoosed = false;
				
				//do {
				
					var aleatoryWordIndex = getRndInteger(0,(wordsFound.length - 1));

					var aleatoryWord = wordsFound[aleatoryWordIndex];

					//Check if the word that we will choose is already taken by another word.
					//if(result.indexOf(aleatoryWord) < 0){
						
						var positionLetter = (aleatoryWordIndex < positionInitialWords)?"first":"contain";
						
						result.push([letter, aleatoryWord, positionLetter, answerPending]);

						console.log("New word in results: " + aleatoryWord.word);
						
					//	wordChoosed =  true;
						
						alphabetToPlay += letter;
					//} 
				//} while(!wordChoosed);
			}
		}
	});

	return result;
} 

console.log("session5_dictionary_functions charged");