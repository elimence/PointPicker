function removeEmptyItems(list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i] == '') {
			list.splice(i, 1);
		}
	}
	return list;
}
function getWords(string) {
	separators = /[ .,?!]/;
	return removeEmptyItems(string.split(separators));
}
function isBridged(word, chunks) {
	if (chunks[0].indexOf(word) == -1) { // not in first chunk
		if (chunks[1].indexOf(word) == -1) { // not in second chunk either
			if((chunks[0]+chunks[1]).indexOf(word) == -1) {
				if (chunks[2].indexOf(word) == -1) { // not in the third chunk either
					if ((chunks[1]+chunks[2]).indexOf(word) == -1) { //definitely not a bridged word
						return false;
					} else {
						return true;
					}
				} else {
					return false;
				}
			} else {
				return true;
			}
		} else {
			return false;
		}
	} else {
		return false;
	}
}
function whichChunk(word, chunks) {

	for (var i = 0; i < chunks.length; i++) {
		if ((chunks[i].toLowerCase()).indexOf(word.toLowerCase()) != -1) {
			return i;
		}
	}
	return null;
}
function longestWord(words) {
	var longest = '';
	for (var i = 0; i < words.length; i++) {
		if (words[i].length > longest) {
			longest = words[i];
		}
	}
	return longest;
}
function numChars(string, substring, where) {
	var numChars = 0;
	var foundAt = string.indexOf(substring);
	if (foundAt == -1) {
		return numChars;
	} else {
		if (where == 'before') {
			numChars = foundAt;
		} else {
			numChars = (string.length) - (foundAt + substring.length);
		}
	}
	return numChars;
}

function occursAt(data, pattern) {
	var starts = new RegExp("^" + pattern, 'i');
	var ends = new RegExp(pattern + "$");
	if (starts.test(data)) {
		return 'start';
	} else if (ends.test(data)) {
		return 'end';
	} else {
		return 'mid';
	}
}

function zones(string) {
	var totalChars = string.length;
	var zoneLength = totalChars / 3;
	var firstThird = string.substring(0, zoneLength);
	var secondThird = string.substring(zoneLength, (zoneLength*2));
	var finalThird = string.substring(zoneLength*2);
	return [firstThird, secondThird, finalThird];
}

function dotify (content, where) {
	if (where == 'before')
		return '...' + content;
	else
		return content + '...';
}

function minify(string, pattern, maxLength) {
	if (string.length <= maxLength) { // Nothing to do here
		return string;
	}
	var chunks = zones(string);

	var wordsInPattern = getWords(pattern);
	if (wordsInPattern.length > 1) {
		pattern = longestWord(wordsInPattern);
	}

	// isBridged(word, chunks)
	if (isBridged(pattern, chunks)) { // pattern is bridged
		return minifyWithPattern(string, pattern, maxLength);
	} else { // pattern is not bridged
		var chunkIndex = whichChunk(pattern, chunks);
		// console.log(chunkIndex);
		if (chunkIndex != null) {
			var chunkData = chunks[chunkIndex];
			if (chunkData.length <= maxLength) {
				return chunkData;
			} else {
				return minifyWithPattern(chunkData, pattern, maxLength);
			}
		}
	}
}

function minifyWithPattern(data, pattern, maxLength) {
	var patternPosition = occursAt(data, pattern);
	if (patternPosition == 'start') {
		return dotify(data.substr(0,maxLength), 'after');
	} else if (patternPosition == 'end') {
		return dotify(data.substr(data.length - maxLength), 'before');
	} else { // pattern occurs somewhere mid data
		var numCharsBefore = numChars(data, pattern, 'before');
		var numCharsAfter = numChars(data, pattern, 'after');
		var patternLength = pattern.length;
		var numCharsNeeded = maxLength - patternLength;
		var buffLeft = parseInt(numCharsNeeded / 2);
		var buffRight = (buffLeft % 2 == 0) ? buffLeft : buffLeft+1;

		if (numCharsBefore >= buffLeft) { // enough buff to the left
			if (numCharsAfter >= buffRight) { // enough buff to the right
				var reg = new RegExp("(.{" + buffLeft + "})" + pattern + "(.{" + buffRight + "})", 'i');
				return dotify(data.match(reg)[0], 'after');
			} else { // left buf but no not enough right buff
				var maxLeft = numCharsNeeded - numCharsAfter;
				var reg = new RegExp("(.{" + buffLeft + "," + maxLeft + "})" + pattern + "(.{" + numCharsAfter + "})", 'i');
				return dotify(data.match(reg)[0], 'after');
			}
		} else { // not enough buff to the left
			if (numCharsAfter >= buffRight) { // enough buff to the right
				var maxRight = numCharsNeeded - numCharsBefore;
				var reg = new RegExp("(.{" + numCharsBefore + "})" + pattern + "(.{" + buffRight + "," + maxRight + "})", 'i');
				return dotify(data.match(reg)[0], 'after');
			}
		}
	}
}

function trim_to_fit(content, max_chars) {
    if (content.length > max_chars) {
        return content.substring(0, max_chars) + '...';
    } else {
        return content;
    }
}

function toggle_class(elem, oldclass, newclass) {
	removeClass(elem, oldclass);
	addClass(elem, newclass);
}

function lower(string) {
	return string.toLowerCase();
}

function toggle_view(elem, to) {
    if (to == 'loading') {
        var loader_div = createElement('div', 'id:ajax_loader_div');
        var loading_gif = createElement('img', 'src:/images/ajax_loader.gif');
        appendElement(loading_gif, loader_div);
        if (elem) {
        	replaceElement(loader_div, elem);
        }
    } else {
    	var loader_div = getById('ajax_loader_div');
    	if (loader_div) {
    		replaceElement(elem, loader_div);
    	}
    }
}

function toggle_class(elem, oldclass, newclass) {
	removeClass(elem, oldclass);
	addClass(elem, newclass);
}

function toggle_form_element(elem, state) {
	if (state == 'enable') {
		elem.disabled = false;
	} else if (state == 'disable') {
		elem.disabled = true;
	} else if (state == 'hidden') {
		addClass(elem, 'hidden');
	} else {
		removeClass(elem, 'hidden');
	}
}


function remove_from_list(item, list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i] == item) {
			list.splice(i, 1);
			break;
		}
	}
	return list;
}

function is_member_of(item, list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i] == item) {
			return true;
		}
	}
	return false;
}

function has_match(string, pattern) {
	string = lower(string);
	pattern = lower(pattern);

	if (pattern == string)
		return true;
	else if (string.indexOf(pattern) != -1)
		return true;
	else
		separators = /[ .]/;
		words = pattern.split(separators);
		words = removeEmptyItems(words);
		matchCount = 0;
		for (var i = 0; i < words.length; i++) {
			if (string.indexOf(words[i]) != -1) {
				matchCount++;
			}
		}
		return (matchCount == words.length)
}

function find_matches(users, pattern) { // might move this function out.. to context-specific
	var matches = [];
	for (var i = 0; i < users.length; i++) {
		var user = users[i];
		if (has_match(user.fullname, pattern)) {
			matches.push(user);
		}
	}
	return matches;
}
function generic_find_matches(items, pattern) {
	var matches = [];
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (hasMatch(item, pattern)) {
			matches.push(item);
		}
	}
	return matches;
}
function add_to_list(items, list) {
	return list.concat(items)
}

function len(item) { // item can be an array or string
	if (typeof(item) == 'string' || typeof(item) == 'object') {
		return item.length;
	} else {
		throw 'invalid argument passed'
	}
}
function findChild(parent, child_id) {
	var children = parent.childNodes;
	if (children.length == 0) return null;
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		if (child.id == child_id) {
			return child;
		}
	}
	return null;
}
function isValidEmail(email) {
	var validEmailRegex = /^[\S]+@[\S]+\.[\S]+$/;
	return validEmailRegex.test(email);
}