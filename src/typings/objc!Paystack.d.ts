
declare class PSTCKAPIClient extends NSObject {

	static alloc(): PSTCKAPIClient; // inherited from NSObject

	static new(): PSTCKAPIClient; // inherited from NSObject

	static sharedClient(): PSTCKAPIClient;

	operationQueue: NSOperationQueue;

	publicKey: string;

	constructor(o: { publicKey: string; });

	chargeCardForTransactionOnViewControllerDidEndWithErrorDidRequestValidationDidTransactionSuccess(card: PSTCKCardParams, transaction: PSTCKTransactionParams, viewController: UIViewController, errorCompletion: (p1: NSError, p2: string) => void, beforeValidateCompletion: (p1: string) => void, successCompletion: (p1: string) => void): void;

	chargeCardForTransactionOnViewControllerDidEndWithErrorDidRequestValidationWillPresentDialogDismissedDialogDidTransactionSuccess(card: PSTCKCardParams, transaction: PSTCKTransactionParams, viewController: UIViewController, errorCompletion: (p1: NSError, p2: string) => void, beforeValidateCompletion: (p1: string) => void, showingDialogCompletion: () => void, dialogDismissedCompletion: () => void, successCompletion: (p1: string) => void): void;

	chargeCardForTransactionOnViewControllerDidEndWithErrorWillPresentDialogDismissedDialogDidTransactionSuccess(card: PSTCKCardParams, transaction: PSTCKTransactionParams, viewController: UIViewController, errorCompletion: (p1: NSError, p2: string) => void, showingDialogCompletion: () => void, dialogDismissedCompletion: () => void, successCompletion: (p1: string) => void): void;

	initWithPublicKey(publicKey: string): this;
}

interface PSTCKAPIResponseDecodable extends NSObjectProtocol {

	allResponseFields: NSDictionary<any, any>;
}
declare var PSTCKAPIResponseDecodable: {

	prototype: PSTCKAPIResponseDecodable;

	decodedObjectFromAPIResponse(response: NSDictionary<any, any>): PSTCKAPIResponseDecodable;

	requiredFields(): NSArray<any>;
};

declare class PSTCKCard extends PSTCKCardParams implements PSTCKAPIResponseDecodable {

	static alloc(): PSTCKCard; // inherited from NSObject

	static decodedObjectFromAPIResponse(response: NSDictionary<any, any>): PSTCKCard;

	static new(): PSTCKCard; // inherited from NSObject

	static requiredFields(): NSArray<any>;

	addressCity: string;

	addressCountry: string;

	addressLine1: string;

	addressLine2: string;

	addressState: string;

	addressZip: string;

	readonly brand: PSTCKCardBrand;

	readonly cardId: string;

	readonly country: string;

	currency: string;

	readonly dynamicLast4: string;

	readonly fingerprint: string;

	readonly funding: PSTCKCardFundingType;

	readonly last4: string;

	name: string;

	readonly type: string;

	readonly allResponseFields: NSDictionary<any, any>; // inherited from PSTCKAPIResponseDecodable

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setAddressCity(addressCity: string): void;

	setAddressCountry(addressCountry: string): void;

	setAddressLine1(addressLine1: string): void;

	setAddressLine2(addressLine2: string): void;

	setAddressState(addressState: string): void;

	setAddressZip(addressZip: string): void;

	setExpMonth(expMonth: number): void;

	setExpYear(expYear: number): void;

	setName(name: string): void;
}

declare const enum PSTCKCardBrand {

	Visa = 0,

	Amex = 1,

	MasterCard = 2,

	Discover = 3,

	JCB = 4,

	DinersClub = 5,

	Unknown = 6,

	Verve = 7
}

declare var PSTCKCardDeclined: string;

declare var PSTCKCardErrorCodeKey: string;

declare const enum PSTCKCardFundingType {

	Debit = 0,

	Credit = 1,

	Prepaid = 2,

	Other = 3
}

declare class PSTCKCardParams extends NSObject implements PSTCKFormEncodable {

	static alloc(): PSTCKCardParams; // inherited from NSObject

	static new(): PSTCKCardParams; // inherited from NSObject

	static propertyNamesToFormFieldNamesMapping(): NSDictionary<any, any>;

	static rootObjectName(): string;

	cvc: string;

	expMonth: number;

	expYear: number;

	readonly last4: string;

	number: string;

	additionalAPIParameters: NSDictionary<any, any>; // inherited from PSTCKFormEncodable

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	clientdata(): string;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare const enum PSTCKCardValidationState {

	Valid = 0,

	Invalid = 1,

	Incomplete = 2
}

declare class PSTCKCardValidator extends NSObject {

	static alloc(): PSTCKCardValidator; // inherited from NSObject

	static brandForNumber(cardNumber: string): PSTCKCardBrand;

	static fragmentLengthForCardBrand(brand: PSTCKCardBrand): number;

	static lengthForCardBrand(brand: PSTCKCardBrand): number;

	static maxCVCLengthForCardBrand(brand: PSTCKCardBrand): number;

	static new(): PSTCKCardValidator; // inherited from NSObject

	static sanitizedNumericStringForString(string: string): string;

	static stringIsNumeric(string: string): boolean;

	static validationStateForCVCCardBrand(cvc: string, brand: PSTCKCardBrand): PSTCKCardValidationState;

	static validationStateForCard(card: PSTCKCardParams): PSTCKCardValidationState;

	static validationStateForCardInCurrentYearCurrentMonth(card: PSTCKCardParams, currentYear: number, currentMonth: number): PSTCKCardValidationState;

	static validationStateForExpirationMonth(expirationMonth: string): PSTCKCardValidationState;

	static validationStateForExpirationYearInMonth(expirationYear: string, expirationMonth: string): PSTCKCardValidationState;

	static validationStateForExpirationYearInMonthInCurrentYearCurrentMonth(expirationYear: string, expirationMonth: string, currentYear: number, currentMonth: number): PSTCKCardValidationState;

	static validationStateForNumberValidatingCardBrand(cardNumber: string, validatingCardBrand: boolean): PSTCKCardValidationState;
}

declare const enum PSTCKErrorCode {

	ConnectionError = 40,

	InvalidRequestError = 50,

	APIError = 60,

	CardError = 70,

	CardErrorProcessingError = 80,

	TransactionError = 90,

	ConflictError = 100,

	ExpiredAccessCodeError = 110
}

declare var PSTCKErrorMessageKey: string;

declare var PSTCKErrorParameterKey: string;

declare var PSTCKExpiredCard: string;

interface PSTCKFormEncodable extends NSObjectProtocol {

	additionalAPIParameters: NSDictionary<any, any>;
}
declare var PSTCKFormEncodable: {

	prototype: PSTCKFormEncodable;

	propertyNamesToFormFieldNamesMapping(): NSDictionary<any, any>;

	rootObjectName(): string;
};

declare var PSTCKIncorrectCVC: string;

declare var PSTCKIncorrectNumber: string;

declare var PSTCKInvalidCVC: string;

declare var PSTCKInvalidExpMonth: string;

declare var PSTCKInvalidExpYear: string;

declare var PSTCKInvalidNumber: string;

declare class PSTCKPaymentCardTextField extends UIControl {

	static alloc(): PSTCKPaymentCardTextField; // inherited from NSObject

	static appearance(): PSTCKPaymentCardTextField; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): PSTCKPaymentCardTextField; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): PSTCKPaymentCardTextField; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): PSTCKPaymentCardTextField; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): PSTCKPaymentCardTextField; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): PSTCKPaymentCardTextField; // inherited from UIAppearance

	static brandImageForCardBrand(cardBrand: PSTCKCardBrand): UIImage;

	static cvcImageForCardBrand(cardBrand: PSTCKCardBrand): UIImage;

	static new(): PSTCKPaymentCardTextField; // inherited from NSObject

	borderColor: UIColor;

	borderWidth: number;

	readonly brandImage: UIImage;

	readonly cardNumber: string;

	cardParams: PSTCKCardParams;

	cornerRadius: number;

	cursorColor: UIColor;

	readonly cvc: string;

	cvcPlaceholder: string;

	delegate: PSTCKPaymentCardTextFieldDelegate;

	readonly expirationMonth: number;

	expirationPlaceholder: string;

	readonly expirationYear: number;

	font: UIFont;

	inputAccessoryView: UIView;

	keyboardAppearance: UIKeyboardAppearance;

	numberPlaceholder: string;

	placeholderColor: UIColor;

	textColor: UIColor;

	textErrorColor: UIColor;

	readonly valid: boolean;

	brandImageRectForBounds(bounds: CGRect): CGRect;

	clear(): void;

	cvcFieldRectForBounds(bounds: CGRect): CGRect;

	expirationFieldRectForBounds(bounds: CGRect): CGRect;

	fieldsRectForBounds(bounds: CGRect): CGRect;

	numberFieldRectForBounds(bounds: CGRect): CGRect;
}

interface PSTCKPaymentCardTextFieldDelegate extends NSObjectProtocol {

	paymentCardTextFieldDidBeginEditingCVC?(textField: PSTCKPaymentCardTextField): void;

	paymentCardTextFieldDidBeginEditingExpiration?(textField: PSTCKPaymentCardTextField): void;

	paymentCardTextFieldDidBeginEditingNumber?(textField: PSTCKPaymentCardTextField): void;

	paymentCardTextFieldDidChange?(textField: PSTCKPaymentCardTextField): void;
}
declare var PSTCKPaymentCardTextFieldDelegate: {

	prototype: PSTCKPaymentCardTextFieldDelegate;
};

declare var PSTCKProcessingError: string;

declare class PSTCKRSA extends NSObject {

	static alloc(): PSTCKRSA; // inherited from NSObject

	static encryptRSA(plainTextString: string): string;

	static new(): PSTCKRSA; // inherited from NSObject
}

declare class PSTCKToken extends NSObject implements PSTCKAPIResponseDecodable {

	static alloc(): PSTCKToken; // inherited from NSObject

	static decodedObjectFromAPIResponse(response: NSDictionary<any, any>): PSTCKToken;

	static new(): PSTCKToken; // inherited from NSObject

	static requiredFields(): NSArray<any>;

	readonly last4: string;

	readonly message: string;

	readonly tokenId: string;

	readonly allResponseFields: NSDictionary<any, any>; // inherited from PSTCKAPIResponseDecodable

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class PSTCKTransaction extends NSObject implements PSTCKAPIResponseDecodable {

	static alloc(): PSTCKTransaction; // inherited from NSObject

	static decodedObjectFromAPIResponse(response: NSDictionary<any, any>): PSTCKTransaction;

	static new(): PSTCKTransaction; // inherited from NSObject

	static requiredFields(): NSArray<any>;

	readonly auth: string;

	readonly message: string;

	readonly otpmessage: string;

	readonly redirecturl: string;

	readonly reference: string;

	readonly status: string;

	readonly trans: string;

	readonly allResponseFields: NSDictionary<any, any>; // inherited from PSTCKAPIResponseDecodable

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class PSTCKTransactionParams extends NSObject implements PSTCKFormEncodable {

	static alloc(): PSTCKTransactionParams; // inherited from NSObject

	static new(): PSTCKTransactionParams; // inherited from NSObject

	static propertyNamesToFormFieldNamesMapping(): NSDictionary<any, any>;

	static rootObjectName(): string;

	access_code: string;

	amount: number;

	bearer: string;

	currency: string;

	email: string;

	readonly metadata: string;

	plan: string;

	reference: string;

	subaccount: string;

	transaction_charge: number;

	additionalAPIParameters: NSDictionary<any, any>; // inherited from PSTCKFormEncodable

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;

	setCustomFieldValueDisplayedAsError(value: string, display_name: string): PSTCKTransactionParams;

	setMetadataValueForKeyError(value: string, key: string): PSTCKTransactionParams;
}

declare class PSTCKValidationParams extends NSObject implements PSTCKFormEncodable {

	static alloc(): PSTCKValidationParams; // inherited from NSObject

	static new(): PSTCKValidationParams; // inherited from NSObject

	static propertyNamesToFormFieldNamesMapping(): NSDictionary<any, any>;

	static rootObjectName(): string;

	token: string;

	trans: string;

	additionalAPIParameters: NSDictionary<any, any>; // inherited from PSTCKFormEncodable

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}

declare class Paystack extends NSObject {

	static alloc(): Paystack; // inherited from NSObject

	static defaultPublicKey(): string;

	static new(): Paystack; // inherited from NSObject

	static setDefaultPublicKey(publicKey: string): void;
}

declare var PaystackDomain: string;

declare var PaystackVersionNumber: number;

declare var PaystackVersionString: interop.Reference<number>;

declare function linkUIImageCategory(): void;
