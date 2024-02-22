module.exports = {
    format_date: (date) => {
		// Format date as MM/DD/YYYY
		return date.toLocaleDateString();
    },

    select: (selected, options) => {
		// Set <select> value 
    	return options.fn(this).replace(
        	new RegExp(' value=\"' + selected + '\"'),
        	'$& selected="selected"');
    }
};
  