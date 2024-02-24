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
    },

	checked: (is_sold) => {
		// return "checked" if is_sold attribute is currently set to true, else return empty string
		return (is_sold) ? "checked" : "";
	}
};
  