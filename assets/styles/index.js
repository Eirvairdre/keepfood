import {StyleSheet, Dimensions} from 'react-native';
import normalize from 'react-native-normalize';

const PRIMARY_COLOR = '#7444C0';
const SECONDARY_COLOR = '#5636B8';
const WHITE = '#FFFFFF';
const GRAY = '#757E90';
const DARK_GRAY = '#363636';
const BLACK = '#000000';

const ONLINE_STATUS = '#46A575';
const OFFLINE_STATUS = '#D04949';

const STAR_ACTIONS = '#FFA200';
const LIKE_ACTIONS = '#B644B2';
const DISLIKE_ACTIONS = '#363636';
const FLASH_ACTIONS = '#5028D7';

const ICON_FONT = 'Mont-Regular';

const DIMENSION_WIDTH = Dimensions.get('window').width;
const DIMENSION_HEIGHT = Dimensions.get('window').height;

export default StyleSheet.create({
  // COMPONENT - CARD ITEM
  containerCardItem: {
    backgroundColor: BLACK,
    borderRadius: 20,
    width: DIMENSION_WIDTH - 40,
    height: DIMENSION_HEIGHT - normalize(350),
    // position: 'absolute',
    alignItems: 'center',
  },
  matchesCardItem: {
    marginTop: -35,
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  matchesTextCardItem: {
    fontFamily: ICON_FONT,
    color: WHITE,
  },
  descriptionCardItem: {
    color: GRAY,
    textAlign: 'center',
  },
  status: {
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    color: GRAY,
    fontSize: 12,
  },
  online: {
    width: 6,
    height: 6,
    backgroundColor: ONLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  offline: {
    width: 6,
    height: 6,
    backgroundColor: OFFLINE_STATUS,
    borderRadius: 3,
    marginRight: 4,
  },
  actionsCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    justifyContent: 'space-between',
    marginTop: 15,
    // bottom: 15,
    // position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
    margin: 15,
  },
  firTitle: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12.78,
    color: 'white',
    fontFamily: 'Mont-Regular',
  },
  nums: {
    lineHeight: 20.56,
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
    fontFamily: 'Mont-Regular',
  },
  secTitle: {
    fontSize: 10,
    fontWeight: '600',
    lineHeight: 12.78,
    color: 'white',
    fontFamily: 'Mont-Regular',
  },
  buttonLike: {
    width: 92.5,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#6FB842',
    // marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowOpacity: 0.15,
    // shadowRadius: 20,
    // shadowColor: DARK_GRAY,
    // shadowOffset: {height: 10, width: 0},
  },
  buttonDislike: {
    width: 92.5,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF4949',
    // marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowOpacity: 0.15,
    // shadowRadius: 20,
    // shadowColor: DARK_GRAY,
    // shadowOffset: {height: 10, width: 0},
  },
  miniButtonBack: {
    width: 52,
    height: 52,
    borderRadius: 12,
    // backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    // marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowOpacity: 0.15,
    // shadowRadius: 20,
    // shadowColor: DARK_GRAY,
    // shadowOffset: {height: 10, width: 0},
  },
  miniButtonMark: {
    width: 52,
    height: 52,
    borderRadius: 12,
    // backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: '#C8C8C8',
    alignItems: 'center',
    justifyContent: 'center',
    // shadowOpacity: 0.15,
    // shadowRadius: 20,
    // shadowColor: DARK_GRAY,
    // shadowOffset: {height: 10, width: 0},
  },
  star: {
    fontFamily: ICON_FONT,
    color: STAR_ACTIONS,
  },
  like: {
    fontSize: 25,
    fontFamily: ICON_FONT,
    color: LIKE_ACTIONS,
  },
  dislike: {
    fontSize: 25,
    fontFamily: ICON_FONT,
    color: DISLIKE_ACTIONS,
  },
  flash: {
    fontFamily: ICON_FONT,
    color: FLASH_ACTIONS,
  },

  // COMPONENT - CITY
  city: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 90,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: {height: 0, width: 0},
  },
  cityText: {
    fontFamily: ICON_FONT,
    color: DARK_GRAY,
    fontSize: 13,
  },

  // COMPONENT - FILTERS
  filters: {
    backgroundColor: WHITE,
    padding: 10,
    borderRadius: 20,
    width: 70,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: BLACK,
    shadowOffset: {height: 0, width: 0},
  },
  filtersText: {
    fontFamily: ICON_FONT,
    color: DARK_GRAY,
    fontSize: 13,
  },

  // COMPONENT - MESSAGE
  containerMessage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 10,
    width: DIMENSION_WIDTH - 100,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15,
  },
  message: {
    color: GRAY,
    fontSize: 12,
    paddingTop: 5,
  },

  // CONTAINER - GENERAL
  bg: {
    flex: 1,
    resizeMode: 'cover',
    width: DIMENSION_WIDTH,
    height: DIMENSION_HEIGHT,
    backgroundColor: WHITE,
    position: 'absolute',
  },
  title: {paddingBottom: 10, fontSize: 22, color: DARK_GRAY},
  icon: {
    fontFamily: ICON_FONT,
    fontSize: 20,
    color: DARK_GRAY,
    paddingRight: 10,
  },

  // CONTAINER - HOME
  containerHome: {
    // marginHorizontal: '5%',
    marginLeft: 20,
    marginRight: 20,
  },

  // CONTAINER - MATCHES
  containerMatches: {
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - MESSAGES
  containerMessages: {
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 10,
  },

  // CONTAINER - PROFILE
  containerProfile: {marginHorizontal: 0},
  photo: {
    width: DIMENSION_WIDTH,
    height: 450,
  },
  topIconLeft: {
    fontFamily: ICON_FONT,
    fontSize: 20,
    color: WHITE,
    paddingLeft: 20,
    marginTop: -20,
    transform: [{rotate: '90deg'}],
  },
  topIconRight: {
    fontFamily: ICON_FONT,
    fontSize: 20,
    color: WHITE,
    paddingRight: 20,
  },
  actionsProfile: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {fontFamily: ICON_FONT, fontSize: 20, color: WHITE},
  textButton: {
    fontFamily: ICON_FONT,
    fontSize: 15,
    color: WHITE,
    paddingLeft: 5,
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  roundedButton: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: SECONDARY_COLOR,
    paddingHorizontal: 20,
  },

  // MENU
  tabButton: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabButtonText: {
    textTransform: 'uppercase',
  },
  iconMenu: {
    fontFamily: ICON_FONT,
    height: 20,
    paddingBottom: 7,
  },
});