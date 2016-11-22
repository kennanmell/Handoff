/* Copy-pasted from Organization.js as a temporary solution to Babel and Istanbul not
    being compatible. */
class Organization {

	// Sole constructor. Username and uuid are undefined after the call to this constructor
	// because not every use of an Organization class immediately knows/uses the values of
	// these fields.
	constructor(name, loc, description, password, auth) {
		this.name = name;
		this.loc = loc;
		this.description = description;
		this.password = password;
		this.auth = auth;
		this.userName = "temp";
		this.uuid = "temp";
	}
	
	// Returns the name of the organization. Not to be confused with username.
	getName() {
		return this.name
	}
	
	// Sets the name of the organization. Not to be confused with username.
	setName(newName) {
		this.name = newName
	}
	
	// Gets the location of the organization.
	getLocation() {
		return this.loc
	}
	
	// Sets the location of the organization.
	setLocation(newLocation) {
		this.loc = newLocation
	}
	
	// Gets the description of the organization.
	getDescription() {
		return this.description
	}
	
	// Sets the description of the organization.
	setDescription(newDescription) {
		this.description = newDescription
	}
	
	// Gets the password of the organization.
	getPassword() {
		return this.password
	}
	
	// Sets the password of the organization.
	setPassword(newPassword) {
		this.password = newPassword
	}
	
	// Gets the authorization key of the organization.
	getAuth() {
		return this.auth
	}
	
	// Sets the authorization key of the organization.
	setAuth(newAuth) {
		this.auth = newAuth
	}
	
	// Gets the username of the organization. Not to be confused with the name or uuid.
	getUsername() {
		return this.userName;
	}
	
	// Sets the username of the organization. Not to be confused with the name or uuid.
	setUsername(newUsername) {
		this.userName = newUsername;
	}
	
	// Gets the uuid of the organization. Not to be confused with username.
	getUuid() {
		return this.uuid;
	}
	
	// Sets the uuid of the organization. Not to be confused with username.
	setUuid(newUuid) {
		this.uuid = newUuid;
	}
}


// Test constructor.
var org = new Organization("a", "b", "c", "d", "e");
assert(org.name == "a");
assert(org.loc == "b");
assert(org.description == "c");
assert(org.password == "d");
assert(org.auth == "e");

// Test get and set for name.
assert(org.getName() == "a");
org.setName("1");
assert(org.getName() == "1");

// Test get and set for location.
assert(org.getLocation() == "b");
org.setLocation("2");
assert(org.getLocation() == "2");

// Test get and set for description.
assert(org.getDescription() == "c");
org.setDescription("3");
assert(org.getDescription() == "3");

// Test get and set for password.
assert(org.getPassword() == "d");
org.setPassword("4");
assert(org.getPassword() == "4");

// Test get and set for authentication.
assert(org.getAuth() == "e");
org.setAuth("5");
assert(org.getAuth() == "5");

// Test get and set for username.
assert(org.getUsername() == org.userName);
org.setUsername("6");
assert(org.getUsername() == "6");

// Test get and set for uuid.
assert(org.getUuid() == org.uuid);
org.setUuid("7");
assert(org.getUuid() == "7");

// Assert that getting and setting each value didn't change any of the other values.
assert(org.name == "1");
assert(org.loc == "2");
assert(org.description == "3");
assert(org.password == "4");
assert(org.auth == "5");
assert(org.userName == "6");
assert(org.uuid == "7");

// Helper function for testing that a condition is true.
function assert(condition) {
	if (!condition) {
		throw "Assertion failed";
	}
}