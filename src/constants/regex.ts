export const PHONE_REGEX_PATTERN = /^\(\+[1-9]\d{1,3}\)[1-9]\d{5,9}$/;

export const DIAL_CODE_REGEX_PATTERN = /^\(\+\d{1,4}\)$/;

export const EMAIL_REGEX_PATTERN =
  /^(([^<>()[\]\\.,;:\s@"]{1,64}(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_REGEX_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})\S*$/;

export const INTEGER_REGEX = /^[0-9]*$/;

export const DECIMAL_REGEX = /^[0-9,.]*$/;

export const NUMBER_LENGTH_REGEX = /^.{8,50}$/;

export const ALLOW_ALPHABET_REGEX_PATTERN =
  /[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]$/;

export const NO_SPECIAL_CHARACTER = /^[A-Za-z0-9]+$/;

export const NO_SPACE = /^[A-Za-z0-9][A-Za-z0-9]*$/;

export const NO_SPECIAL_CHARACTER_ALLOW_ROUND_BRACKET = /^[A-Za-z0-9()]+$/;

export const SPECIAL_CHARACTER_ALLOW_DASH_DOT = /^[A-Za-z0-9-.]+$/;

export const SPECIAL_CHARACTER_ALLOW_DOT = /^[A-Za-z0-9.]+$/;

export const SPECIAL_CHARACTERS_ALLOW_SPACE = /^[A-Za-z0-9 ]+$/;

export const NO_ALPHABET_REGEX_PATTERN =
  /^((?![ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ]).)+$/;

export const NO_ALLOW_SPACE =
  /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]+( [A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]+)*$/;

export const NO_NUMBER = /^([^0-9]*)+( ([^0-9]*)+)*$/;

export const NO_SPECIAL_CHARACTER_IN_NAME = /^(?=.*[a-zA-ZÀ-ỹ])[a-zA-ZÀ-ỹ\s]+$/;

export const NO_TWO_SPACE = /^(?!.*\s{2}).*$/;

export const NO_SPACE_START_END = /^[^\s]+(\s+[^\s]+)*$/;

export const PASSWORD_REGEX_PATTERN_WITHOUT_NUMBER_LIMIT_AND_SPECIAL_CHARACTER =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\S*$/;
