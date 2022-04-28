var list = document.getElementById('list');
var list1 = document.getElementById('list1');
var text = document.getElementById('text');
var Enqueue = document.getElementById('enqueue');
var queue = document.getElementById('queue');
var click = 0;
list1.innerHTML = '';
class Stack extends Array {
	constructor(...elem) {
		super(...elem);
	}
	unshift_element(ele) {
		if (this.length > 9) {
			alert('Queue is Full');
			list.shift(ele=9);
		} 
		else{
			super.unshift(ele);
			
		}
	}
	shift_element() {
		if (this.length === 0) {
			alert('Queue is Empty');
		} else {
			var ele = list.childNodes[0];
			super.shift();
			list.removeChild(ele);
			return ele;
		}
	}
	display_elements(s2) {
		for (let i = 0; i < s2.length; i++) {
			var x = document.createElement('li');
			var t = document.createTextNode(s2[i]);
			x.appendChild(t);
			list.appendChild(x);
		}
	}
}
const s1 = new Stack();
s1.display_elements(s1);
function enqueue() {
	var info = text.value;
	if (info == '') {
		console.log('Empty Values cannot be inserted');
	} else {
		s1.unshift_element(info);
		var y = document.createElement('li');
		var u = document.createTextNode(info);
		y.appendChild(u);
		list.appendChild(y);
		list.insertBefore(y, list.childNodes[n]);
	}
}
function dequeue() {
	var value = s1.shift_element(0).textContent;
	var k = document.createElement('li');
	var l = document.createTextNode(value);
	k.appendChild(l);
	list1.appendChild(k);
}