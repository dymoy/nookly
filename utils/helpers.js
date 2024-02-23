module.exports = {
    format_date: (date) => {
		// Format date as MM/DD/YYYY
		return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    },

    select: (selected, options) => {
		// Set <select> value 
    	return options.fn(this).replace(
        	new RegExp(' value=\"' + selected + '\"'),
        	'$& selected="selected"');
    }
};
  