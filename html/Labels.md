<!--
<title>Labels</title>
<text>Map labels are the text on a map that describes a marker. These are the rules for how labels work in TrueNorth</text>
<tags>label,marker,ledgend,text</tags>
-->
Labels
======

Labels in TrueNorth have the following format

* Any text in the label is rendered as written
* line endings, spaces and tabs are also rendered as written
* the symbol ^2 will be replaced by a superscript "2" to represent areas
* text subsitutions are used to reference fields in the feature the label is in
* text substitutions take the form {FieldName} where *FieldName* is the name of the field being referenced.

The fields that can be references are

* **{Name}**: the name of the feature
* **{Location}**: the position of a feature in Geographic Coordinates (Latitude and Longitide)  
  For a point, this is the position of the point.
  For a line or a polygon, this is the position of the center of the extents of the shape
  Formatting: the following codes are used to format this field
	* DMS: This will display the Degrees, Minutes and Seconds of the location
		Example: {Location:DMS}
	* DM: This will display Degrees and decimal minutes of the location
		Example: {Location:DM}
	* D: this will display the Decimal Degrees of the location
		Example: {Location:D}
	* TDM: This will display the coodinate using a format that look like time, with Degrees as hours, and decimal minutes. This format is easy to type
	* TDMS: This will display the coordinate using a format that looks like time, with Degrees as hours, Minutes and Seconds
	* ISO: This will display the location in the <a href="http://en.wikipedia.org/wiki/ISO_6709" target="_blank">ISO 6709 format</a>
	* WKT: This will display the location in the "Well Known Text" format<br/>
	* UTM: This will display the location in Universal Transverse Mercator format
* **{Altitude}**: This will display the feature's altitude in meters  
	For points, this is the altitude of the point.
	For lines and polygons, this is an average altitude for the shape.
	Many features do not have an altitude, for these the altitude will be zero 
* **{Length}**: the total length of a line feature, or the circumference of a polygon in meters   
	Formatting of this feature can use the following codes (default: meters)
	* m: meters {Length:m}
	* km: kilometers  {Length:km}
	* cm: centimeters {Length:cm}
	* f: feet {Length:f}
	* y: yards  {Length:y}
	* mi: miles  {Length:mi}
	* in: inches  {Length:in}
* **{Area}**: the total area of a polygon feature   
	* m: meters {Area:m}
	* km: kilometers {Area:km}
	* cm: centimeters {Area:cm}
	* f: feet {Area:f}
	* y: yards {Area:y}
	* mi: miles {Area:mi}
	* in: inches {Area:in}
	* a: acres {Area:a}
	* h: hectares {Area:h}
* **{Created}** The date and time the feature was created   
	Formatting of this feature can use the following rules
	* <a href="http://msdn.microsoft.com/en-us/library/az4se3k1.aspx" target="_blank">Standard date and time format strings</a> 
	* <a href="http://msdn.microsoft.com/en-us/library/8kb3ddd4.aspx" target="_blank">Custom date and time format strings</a>
* **{Modified}** The date and time the feature was modified. If this is the same as the created date then the feature has never been edited  
	Formatting of this feature uses date and time formats (see above)
* **{CreatedBy}**: The user name of the person who created the feature
* **{ModifiedBy}**: The user name of the person who modified the feature

General numeric formatting
--------------------------

All numbers are rounded to 2 decimal places unless otherwise formatted.
The format strings for general numeric value are as follows

* <a href="http://msdn.microsoft.com/en-us/library/dwhawy9k.aspx" target="_blank">Standard Numeric Format Strings</a>
* <a href="http://msdn.microsoft.com/en-us/library/0c899ak8.aspx" target="_blank">Custom Numeric Format Strings</a>
