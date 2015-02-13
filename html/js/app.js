/// When an link is clicked, check that the link ends in "*.md"
/// If it does, set the URL with a parameter for that file (the load event will load the value)
/// Otherwise use normal navigation to load the page

function filterLinks(event)
{
	if (/.md$/.test(event.currentTarget.href) ||
		event.currentTarget.href.indexOf(".md#")>-1) {
		$('#html').hide();
		$('#md').show();

		var thisUrl = getUrl();
		console.log("This URL: " + target);
		var target = event.currentTarget.href.replace(thisUrl, "");

		// remove the leading "/"
		if (target.startsWith('/'))
			target = target.substring(1);

		console.log("This URL: (stripped) " + target);
		target = getUrl() + "/index.html?md=" + target;
		window.location.href = target;
		return false;
	}
	if (/.htm$/.test(event.currentTarget.href)) {
		$('#html').show();
		$('#md').hide();

		var thisUrl = getUrl();
		console.log("This URL: " + target);
		var target = event.currentTarget.href.replace(thisUrl, "");
		// remove the leading "/"
		if (target.startsWith('/'))
			target = target.substring(1);
		console.log("This URL: (stripped) " + target);
		loadHTML(target, '#html');
		return false;
	}
	return true;
}

function loadFromQueryString(queryString) {
    try {
        loadMarkDown(queryString.md, '#markdown');
    } catch (e) {
        console.error("Error loading from query string: " + e.message);
    }
}

// http://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-url-parameter
// This function is anonymous, is executed immediately and
// the return value is assigned to QueryString!
var QueryString = function () {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        // If first entry with this name
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
            // If second entry with this name
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
            // If third or later entry with this name
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}();

function getUrl() {
    var url = window.location.href
    var arr = url.split("/");

    var result = arr[0] + "//" + arr[2]
    if (arr[0] == "file:") {
        result = url;
        var index = result.indexOf('?');
        if (index != -1) {
            result = result.substring(0, index);
        }
        index = result.lastIndexOf('index.html');
        if (index != -1) {
            result = result.substring(0, index);
        }
    }
    else {
        result = arr[0] + "//" + arr[2]
    }
    return result;
}

// get the named file, convert it to HTML
// then display it in the given div
function loadMarkDown(file, dest) {
    try {
        console.log("Loading '" + file + "'");
        if (window.external && 'GetFile' in window.external) {
            data = window.external.GetFile(file);
            var converter = new Markdown.Converter();
            $(dest).html(converter.makeHtml(data));
        }
        else {
            $.get(file, function (data) {
                var converter = new Markdown.Converter();
                $(dest).html(converter.makeHtml(data));
            }).fail(function () {
                console.error("Failed to load '" + file + "'");
                $(dest).html("<h1> '" + file + "' Not found</h1>");
            });
        }
    }
    catch (ex) {
        $(dest).html("<h1>Error: '" + ex + "'</h1>");
        console.error("Failed to load '" + file + "': " + ex);
    }
}

function loadHTML(file, dest) {
    try {
        console.log("Loading '" + file + "'");
        if (window.external && 'GetFile' in window.external) {
            data = window.external.GetFile(file);
            $(dest).html(data);
        }
        else {
            $.get(file, function (data) {
                $(dest).html(data);
            }).fail(function () {
                console.error("Failed to load '" + file + "'");
                $(dest).html("<h1> '" + file + "' Not found</h1>");
            });
        }
    }
    catch (ex) {
        console.error("Failed to load '" + file + "': "+ex);
        $(dest).html("<h1>Error: '" + ex + "'</h1>");
    }
}


if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str) {
        return this.slice(0, str.length) == str;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function (str) {
        return this.slice(-str.length) == str;
    };
}

function IsDebug() {
    if (window.external && 'DebugMode' in window.external) {
        return window.external.DebugMode;
    }
    else {
        return false;
    }
}

function SetupDebug() {

    if (!IsDebug()) {
        $("#consolelog").hide();
        return;
    }

    if (window.console != null) {
        originalConsole = window.console;
    }

    window.console = {
        log: function (message) {
            appendConsole(message, "info");
            originalConsole.log(message);
        },
        info: function (message) {
            appendConsole(message, "info");
            originalConsole.info(message);
        },
        debug: function (message) {
            appendConsole(message, "debug");
            originalConsole.debug(message);
        },
        error: function (message) {
            appendConsole(message, "error");
            originalConsole.error(message);
        }
    };
}

var appendConsole = function (message, type) {
    var color = "black";
    if (type === "error") {
        color = "red";
    } else if (type === "debug") {
        color = "blue";
    }

    var div = document.createElement('div');
    div.style.color = color;
    div.style.marginBottom = "10px";

    div.innerHTML = message;

    document.getElementById("consolelog").appendChild(div);
}

var originalConsole = null;


