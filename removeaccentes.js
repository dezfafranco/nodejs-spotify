function RemoveAccents(s)  {
	    var i = 'Ä‚Ä‚Ä‚Ä‚Ä‚Ä‚Ä‚ Ä‚Ä„Ä‚Ë˜Ä‚ÅÄ‚Â¤Ä‚Ä½Ä‚Ä‚Ä‚Ä‚Ä‚Ä‚Ä¹Ä‚Ë›Ä‚Å‚Ä‚Â´Ä‚Ä¾Ä‚Å›Ä¹Ä‚Ä‚Ä‚Ä‚Ä‚Â¨Ä‚Å Ä‚ÅžÄ‚Å¤Ä‚Â°Ä‚Ä‚Â§Ä‚Ä‚Ä‚Ä‚Ä‚Ä‚Å¹Ä‚Â­Ä‚Å½Ä‚Å»Ä‚Ä‚Ä‚Ä‚Ä¹Â°Ä‚Å¡Ä‚ÅŸÄ‚Å¥Ä‚ÅºÄ¹Ä…Ä‚Ä‚Ä…Ä¹ Ä¹Ä„Ä¹Â¸Ä‚Å¼Ä‚ËÄ¹ËÄ¹Å¾+_.:;[]()/*"<> '.split('');
	    var o = 'AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUUuuuuuNnSsYyyZz---------------'.split('');
	    var map = {};
	    i.forEach(function(el, idx) {map[el] = o[idx]});
	    return s.replace(/[^A-Za-z0-9]/g, function(ch) { return map[ch] || ch; }).toLowerCase();
	}
