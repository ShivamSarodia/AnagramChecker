// Checks whether a given character is alphanumeric
function isAlphaNum(letter) {
    return ('a' <= letter && letter <= 'z') || ('0' <= letter && letter <= '9');
}

// Checks whether two phrases are anagrams, ignoring all non-alphanumeric
// characters and case.
// Return value of "YES" - is anagram
// Return value of "NO" - not an anagram
// Return value of "NONE" - one of the two phrases had no alphanumeric characters
function isAnagram(phrase1, phrase2) {
    var phrase1 = phrase1.toLowerCase();
    var phrase2 = phrase2.toLowerCase();

    // Dictionary to keep track of how many times each alphanumeric
    // letter appears.
    var letters = {};
    // Records whether the first phrase has no alphanumeric characters.
    var empty = true;
    for(var i = 0, len = phrase1.length; i < len; i++) {
	var letter = phrase1[i];
	if(isAlphaNum(letter)) {
	    // Increment the count by 1 for alphanumeric characters.
	    letters[letter] = (letters[letter] || 0) + 1;
	    empty = false;
	}
    }

    // If first phrase is empty, return immediately.
    if(empty) return "NONE"

    // Records whether the second phrase has no alphanumeric characters.
    empty = true;
    for(var i = 0, len = phrase2.length; i < len; i++) {
	var letter = phrase2[i];
	if(isAlphaNum(letter)) {
	    // Decrement the count by 1 for alphanumeric characters.
	    letters[letter] = (letters[letter] || 0) - 1;
	    empty = false;
	}
    }

    // If second phrase is empty, return immediately.
    if(empty) return "NONE"

    // If there's nonzero values in the final letters dictionary, it was not an
    // anagram.
    for(var letter in letters) {
	if(letters[letter] != 0) {
	    return "NO";
	}
    }

    return "YES";
}

function updateResult() {
    var phrase1 = document.getElementById("phrase1").value;
    var phrase2 = document.getElementById("phrase2").value;

    var result = isAnagram(phrase1, phrase2);

    document.getElementById("type").style.display = "none";
    if(result == "YES") {
	document.getElementById("type").style.display = "none";
	document.getElementById("not-anagram").style.display = "none";
	document.getElementById("anagram").style.display = "block";
    } else if(result == "NO") {
	document.getElementById("type").style.display = "none";
	document.getElementById("anagram").style.display = "none";
    	document.getElementById("not-anagram").style.display = "block";
    } else if(result == "NONE") {
	document.getElementById("not-anagram").style.display = "none";
	document.getElementById("anagram").style.display = "none";
	document.getElementById("type").style.display = "block";
    }
}

// My implementation is not optimally efficient -- every time a user types a
// letter, the entire anagram check is recalulated.
document.getElementById("phrase1").addEventListener('input', updateResult);
document.getElementById("phrase2").addEventListener('input', updateResult);
