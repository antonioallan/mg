jQuery.fn.removeNot = function(settings) {
    var $this = jQuery(this);
    var defaults = {
        pattern: /[^0-9]/,
        replacement: ''
    };
    settings = jQuery.extend(defaults, settings);
    $this.keyup(function() {
        var new_value = $this.val().replace(settings.pattern, settings.replacement);
        $this.val(new_value);
    });
    return $this;
};


