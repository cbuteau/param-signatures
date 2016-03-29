<a name="module_param-signatures"></a>

## param-signatures
A module that ensures objects are similar.


* [param-signatures](#module_param-signatures)
    * [.TYPECODES](#module_param-signatures.TYPECODES)
    * [.validate(object, signature)](#module_param-signatures.validate)
    * [.tryValidate(object, signature)](#module_param-signatures.tryValidate)
    * [.mergeAndReturn(object, signature)](#module_param-signatures.mergeAndReturn)
    * [.getTypeCode(object)](#module_param-signatures.getTypeCode)
    * [.typeCodeToString(code)](#module_param-signatures.typeCodeToString)

<a name="module_param-signatures.TYPECODES"></a>

### param-signatures.TYPECODES
Returns an object containing the int typecodes for the javascript base objects.

**Kind**: static property of <code>[param-signatures](#module_param-signatures)</code>  
<a name="module_param-signatures.validate"></a>

### param-signatures.validate(object, signature)
Validates object has the same fields and types as signature object and throws exception if it does not match.

**Kind**: static method of <code>[param-signatures](#module_param-signatures)</code>  
**Constuctor**:   

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The object to test. |
| signature | <code>object</code> | The object describing what the object param should have. |

<a name="module_param-signatures.tryValidate"></a>

### param-signatures.tryValidate(object, signature)
Returns a boolean whether an object validated against a signature object.

**Kind**: static method of <code>[param-signatures](#module_param-signatures)</code>  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The object to test. |
| signature | <code>object</code> | The object describing what the object param should be. |

<a name="module_param-signatures.mergeAndReturn"></a>

### param-signatures.mergeAndReturn(object, signature)
Merges the singature and object to return the corrent number of properties on a new object.

**Kind**: static method of <code>[param-signatures](#module_param-signatures)</code>  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The object to test. |
| signature | <code>object</code> | The object describing what the object param should be. |

<a name="module_param-signatures.getTypeCode"></a>

### param-signatures.getTypeCode(object)
Gets the type code for the objects passed.

**Kind**: static method of <code>[param-signatures](#module_param-signatures)</code>  

| Param | Type | Description |
| --- | --- | --- |
| object | <code>object</code> | The object to get the current typecode for. |

<a name="module_param-signatures.typeCodeToString"></a>

### param-signatures.typeCodeToString(code)
Converts a typecode into a human readable string for debugging.

**Kind**: static method of <code>[param-signatures](#module_param-signatures)</code>  

| Param | Type | Description |
| --- | --- | --- |
| code | <code>number</code> | The type code to convert to string. |

