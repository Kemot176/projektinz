$(document).ready(function(){
$('#materialUnchecked').change(function(){
if(this.checked)
$('#autoUpdate').fadeOut('fast');
else
$('#autoUpdate').fadeIn('fast');
});
});
