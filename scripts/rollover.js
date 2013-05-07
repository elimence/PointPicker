/**
 * @author Nana Ewusi
 */
var Rollover = {
        init: function()
        {
        if (!document.getElementsByTagName) return;
        //Attach rollover listeners
        var socialImages = getByClass("social");

        for (var i = 0; i < socialImages.length; i++)
        {
        	var socialImage = socialImages[i];
        	addListener(socialImage, "mouseover", Rollover.mouseoverListener, false);
        	addListener(socialImage, "mouseout", Rollover.mouseoutListener, false);
        }
        },
        mouseoverListener: function(e)
        {
        Rollover.changePicture(this);
        },

        mouseoutListener: function(e)
        {
        Rollover.changePicture(this);
        },

        changePicture: function(element)
        {
        if (element.src.indexOf("_hover") == -1) //Normal image is showing
        {
        	element.src = element.src.replace(/(\.[^.]+)$/, '_hover$1');
        }
        else //Hover image is showing
        {
        	element.src = element.src.replace(/_hover(\.[^.]+)$/, '$1');
        }
        }
        };