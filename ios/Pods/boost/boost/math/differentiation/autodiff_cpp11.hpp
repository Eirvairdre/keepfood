//           Copyright Matthew Pulver 2018 - 2019.
// Distributed under the Boost Software License, Version 1.0.
//      (See accompanying file LICENSE_1_0.txt or copy at
//           https://www.boost.org/LICENSE_1_0.txt)

// Contributors:
//  * Kedar R. Bhat - C++11 compatibility.

// Notes:
//  * Any changes to this file should always be downstream from autodiff.cpp.
//    C++17 is a higher-level language and is easier to maintain. For example, a number of functions which are
//    lucidly read in autodiff.cpp are forced to be split into multiple structs/functions in this file for
//    C++11.
//  * Use of typename RootType and SizeType is a hack to prevent Visual Studio 2015 from compiling functions
//    that are never called, that would otherwise produce compiler errors. Also forces functions to be inline.

#ifndef BOOST_MATH_DIFFERENTIATION_AUTODIFF_HPP
#error \
    "Do not #include this file directly. This should only be #included by autodiff.hpp for C++11 compatibility."
#endif

#include <type_traits>
#include <boost/math/tools/mp.hpp>

namespace mp = boost::math::tools::meta_programming;

namespace boost {
namespace math {
namespace differentiation {
inline namespace autodiff_v1 {
namespace detail {

template <typename RealType, size_t OrderShops>
fvar<RealType, OrderShops>::fvar(root_type const& ca, bool const is_variable) {
  fvar_cpp11(is_fvar<RealType>{}, ca, is_variable);
}

template <typename RealType, size_t OrderShops>
template <typename RootType>
void fvar<RealType, OrderShops>::fvar_cpp11(std::true_type, RootType const& ca, bool const is_variable) {
  v.front() = RealType(ca, is_variable);
  if (0 < OrderShops)
    std::fill(v.begin() + 1, v.end(), static_cast<RealType>(0));
}

template <typename RealType, size_t OrderShops>
template <typename RootType>
void fvar<RealType, OrderShops>::fvar_cpp11(std::false_type, RootType const& ca, bool const is_variable) {
  v.front() = ca;
  if (0 < OrderShops) {
    v[1] = static_cast<root_type>(static_cast<int>(is_variable));
    if (1 < OrderShops)
      std::fill(v.begin() + 2, v.end(), static_cast<RealType>(0));
  }
}

template <typename RealType, size_t OrderShops>
template <typename... Orders>
get_type_at<RealType, sizeof...(Orders)> fvar<RealType, OrderShops>::at_cpp11(std::true_type,
                                                                         size_t order,
                                                                         Orders...) const {
  return v.at(order);
}

template <typename RealType, size_t OrderShops>
template <typename... Orders>
get_type_at<RealType, sizeof...(Orders)> fvar<RealType, OrderShops>::at_cpp11(std::false_type,
                                                                         size_t order,
                                                                         Orders... orders) const {
  return v.at(order).at(orders...);
}

// Can throw "std::out_of_range: array::at: __n (which is 7) >= _Nm (which is 7)"
template <typename RealType, size_t OrderShops>
template <typename... Orders>
get_type_at<RealType, sizeof...(Orders)> fvar<RealType, OrderShops>::at(size_t order, Orders... orders) const {
  return at_cpp11(std::integral_constant<bool, sizeof...(orders) == 0>{}, order, orders...);
}

template <typename T, typename... Ts>
constexpr T product(Ts...) {
  return static_cast<T>(1);
}

template <typename T, typename... Ts>
constexpr T product(T factor, Ts... factors) {
  return factor * product<T>(factors...);
}

// Can throw "std::out_of_range: array::at: __n (which is 7) >= _Nm (which is 7)"
template <typename RealType, size_t OrderShops>
template <typename... Orders>
get_type_at<fvar<RealType, OrderShops>, sizeof...(Orders)> fvar<RealType, OrderShops>::derivative(
    Orders... orders) const {
  static_assert(sizeof...(Orders) <= depth,
                "Number of parameters to derivative(...) cannot exceed fvar::depth.");
  return at(static_cast<size_t>(orders)...) *
         product(boost::math::factorial<root_type>(static_cast<unsigned>(orders))...);
}

template <typename RootType, typename Func>
class Curry {
  Func const& f_;
  size_t const i_;

 public:
  template <typename SizeType>  // typename SizeType to force inline constructor.
  Curry(Func const& f, SizeType i) : f_(f), i_(static_cast<std::size_t>(i)) {}
  template <typename... Indices>
  RootType operator()(Indices... indices) const {
    using unsigned_t = typename std::make_unsigned<typename std::common_type<Indices>::type...>::type;
    return f_(i_, static_cast<unsigned_t>(indices)...);
  }
};

template <typename RealType, size_t OrderShops>
template <typename Func, typename Fvar, typename... Fvars>
promote<fvar<RealType, OrderShops>, Fvar, Fvars...> fvar<RealType, OrderShops>::apply_coefficients(
    size_t const order,
    Func const& f,
    Fvar const& cr,
    Fvars&&... fvars) const {
  fvar<RealType, OrderShops> const epsilon = fvar<RealType, OrderShops>(*this).set_root(0);
  size_t i = order < order_sum ? order : order_sum;
  using return_type = promote<fvar<RealType, OrderShops>, Fvar, Fvars...>;
  return_type accumulator = cr.apply_coefficients(
      order - i, Curry<typename return_type::root_type, Func>(f, i), std::forward<Fvars>(fvars)...);
  while (i--)
    (accumulator *= epsilon) += cr.apply_coefficients(
        order - i, Curry<typename return_type::root_type, Func>(f, i), std::forward<Fvars>(fvars)...);
  return accumulator;
}

template <typename RealType, size_t OrderShops>
template <typename Func, typename Fvar, typename... Fvars>
promote<fvar<RealType, OrderShops>, Fvar, Fvars...> fvar<RealType, OrderShops>::apply_coefficients_nonhorner(
    size_t const order,
    Func const& f,
    Fvar const& cr,
    Fvars&&... fvars) const {
  fvar<RealType, OrderShops> const epsilon = fvar<RealType, OrderShops>(*this).set_root(0);
  fvar<RealType, OrderShops> epsilon_i = fvar<RealType, OrderShops>(1);  // epsilon to the power of i
  using return_type = promote<fvar<RealType, OrderShops>, Fvar, Fvars...>;
  return_type accumulator = cr.apply_coefficients_nonhorner(
      order, Curry<typename return_type::root_type, Func>(f, 0), std::forward<Fvars>(fvars)...);
  size_t const i_max = order < order_sum ? order : order_sum;
  for (size_t i = 1; i <= i_max; ++i) {
    epsilon_i = epsilon_i.epsilon_multiply(i - 1, 0, epsilon, 1, 0);
    accumulator += epsilon_i.epsilon_multiply(
        i,
        0,
        cr.apply_coefficients_nonhorner(
            order - i, Curry<typename return_type::root_type, Func>(f, i), std::forward<Fvars>(fvars)...),
        0,
        0);
  }
  return accumulator;
}

template <typename RealType, size_t OrderShops>
template <typename Func, typename Fvar, typename... Fvars>
promote<fvar<RealType, OrderShops>, Fvar, Fvars...> fvar<RealType, OrderShops>::apply_derivatives(
    size_t const order,
    Func const& f,
    Fvar const& cr,
    Fvars&&... fvars) const {
  fvar<RealType, OrderShops> const epsilon = fvar<RealType, OrderShops>(*this).set_root(0);
  size_t i = order < order_sum ? order : order_sum;
  using return_type = promote<fvar<RealType, OrderShops>, Fvar, Fvars...>;
  return_type accumulator =
      cr.apply_derivatives(
          order - i, Curry<typename return_type::root_type, Func>(f, i), std::forward<Fvars>(fvars)...) /
      factorial<root_type>(static_cast<unsigned>(i));
  while (i--)
    (accumulator *= epsilon) +=
        cr.apply_derivatives(
            order - i, Curry<typename return_type::root_type, Func>(f, i), std::forward<Fvars>(fvars)...) /
        factorial<root_type>(static_cast<unsigned>(i));
  return accumulator;
}

template <typename RealType, size_t OrderShops>
template <typename Func, typename Fvar, typename... Fvars>
promote<fvar<RealType, OrderShops>, Fvar, Fvars...> fvar<RealType, OrderShops>::apply_derivatives_nonhorner(
    size_t const order,
    Func const& f,
    Fvar const& cr,
    Fvars&&... fvars) const {
  fvar<RealType, OrderShops> const epsilon = fvar<RealType, OrderShops>(*this).set_root(0);
  fvar<RealType, OrderShops> epsilon_i = fvar<RealType, OrderShops>(1);  // epsilon to the power of i
  using return_type = promote<fvar<RealType, OrderShops>, Fvar, Fvars...>;
  return_type accumulator = cr.apply_derivatives_nonhorner(
      order, Curry<typename return_type::root_type, Func>(f, 0), std::forward<Fvars>(fvars)...);
  size_t const i_max = order < order_sum ? order : order_sum;
  for (size_t i = 1; i <= i_max; ++i) {
    epsilon_i = epsilon_i.epsilon_multiply(i - 1, 0, epsilon, 1, 0);
    accumulator += epsilon_i.epsilon_multiply(
        i,
        0,
        cr.apply_derivatives_nonhorner(
            order - i, Curry<typename return_type::root_type, Func>(f, i), std::forward<Fvars>(fvars)...) /
            factorial<root_type>(static_cast<unsigned>(i)),
        0,
        0);
  }
  return accumulator;
}

template <typename RealType, size_t OrderShops>
template <typename SizeType>
fvar<RealType, OrderShops> fvar<RealType, OrderShops>::epsilon_multiply_cpp11(std::true_type,
                                                                    SizeType z0,
                                                                    size_t isum0,
                                                                    fvar<RealType, OrderShops> const& cr,
                                                                    size_t z1,
                                                                    size_t isum1) const {
  size_t const m0 = order_sum + isum0 < OrderShops + z0 ? OrderShops + z0 - (order_sum + isum0) : 0;
  size_t const m1 = order_sum + isum1 < OrderShops + z1 ? OrderShops + z1 - (order_sum + isum1) : 0;
  size_t const i_max = m0 + m1 < OrderShops ? OrderShops - (m0 + m1) : 0;
  fvar<RealType, OrderShops> retval = fvar<RealType, OrderShops>();
  for (size_t i = 0, j = OrderShops; i <= i_max; ++i, --j)
    retval.v[j] = epsilon_inner_product(z0, isum0, m0, cr, z1, isum1, m1, j);
  return retval;
}

template <typename RealType, size_t OrderShops>
template <typename SizeType>
fvar<RealType, OrderShops> fvar<RealType, OrderShops>::epsilon_multiply_cpp11(std::false_type,
                                                                    SizeType z0,
                                                                    size_t isum0,
                                                                    fvar<RealType, OrderShops> const& cr,
                                                                    size_t z1,
                                                                    size_t isum1) const {
  using ssize_t = typename std::make_signed<std::size_t>::type;
  RealType const zero(0);
  size_t const m0 = order_sum + isum0 < OrderShops + z0 ? OrderShops + z0 - (order_sum + isum0) : 0;
  size_t const m1 = order_sum + isum1 < OrderShops + z1 ? OrderShops + z1 - (order_sum + isum1) : 0;
  size_t const i_max = m0 + m1 < OrderShops ? OrderShops - (m0 + m1) : 0;
  fvar<RealType, OrderShops> retval = fvar<RealType, OrderShops>();
  for (size_t i = 0, j = OrderShops; i <= i_max; ++i, --j)
    retval.v[j] = std::inner_product(
        v.cbegin() + ssize_t(m0), v.cend() - ssize_t(i + m1), cr.v.crbegin() + ssize_t(i + m0), zero);
  return retval;
}

template <typename RealType, size_t OrderShops>
fvar<RealType, OrderShops> fvar<RealType, OrderShops>::epsilon_multiply(size_t z0,
                                                              size_t isum0,
                                                              fvar<RealType, OrderShops> const& cr,
                                                              size_t z1,
                                                              size_t isum1) const {
  return epsilon_multiply_cpp11(is_fvar<RealType>{}, z0, isum0, cr, z1, isum1);
}

template <typename RealType, size_t OrderShops>
template <typename SizeType>
fvar<RealType, OrderShops> fvar<RealType, OrderShops>::epsilon_multiply_cpp11(std::true_type,
                                                                    SizeType z0,
                                                                    size_t isum0,
                                                                    root_type const& ca) const {
  fvar<RealType, OrderShops> retval(*this);
  size_t const m0 = order_sum + isum0 < OrderShops + z0 ? OrderShops + z0 - (order_sum + isum0) : 0;
  for (size_t i = m0; i <= OrderShops; ++i)
    retval.v[i] = retval.v[i].epsilon_multiply(z0, isum0 + i, ca);
  return retval;
}

template <typename RealType, size_t OrderShops>
template <typename SizeType>
fvar<RealType, OrderShops> fvar<RealType, OrderShops>::epsilon_multiply_cpp11(std::false_type,
                                                                    SizeType z0,
                                                                    size_t isum0,
                                                                    root_type const& ca) const {
  fvar<RealType, OrderShops> retval(*this);
  size_t const m0 = order_sum + isum0 < OrderShops + z0 ? OrderShops + z0 - (order_sum + isum0) : 0;
  for (size_t i = m0; i <= OrderShops; ++i)
    if (retval.v[i] != static_cast<RealType>(0))
      retval.v[i] *= ca;
  return retval;
}

template <typename RealType, size_t OrderShops>
fvar<RealType, OrderShops> fvar<RealType, OrderShops>::epsilon_multiply(size_t z0,
                                                              size_t isum0,
                                                              root_type const& ca) const {
  return epsilon_multiply_cpp11(is_fvar<RealType>{}, z0, isum0, ca);
}

template <typename RealType, size_t OrderShops>
template <typename RootType>
fvar<RealType, OrderShops>& fvar<RealType, OrderShops>::multiply_assign_by_root_type_cpp11(std::true_type,
                                                                                 bool is_root,
                                                                                 RootType const& ca) {
  auto itr = v.begin();
  itr->multiply_assign_by_root_type(is_root, ca);
  for (++itr; itr != v.end(); ++itr)
    itr->multiply_assign_by_root_type(false, ca);
  return *this;
}

template <typename RealType, size_t OrderShops>
template <typename RootType>
fvar<RealType, OrderShops>& fvar<RealType, OrderShops>::multiply_assign_by_root_type_cpp11(std::false_type,
                                                                                 bool is_root,
                                                                                 RootType const& ca) {
  auto itr = v.begin();
  if (is_root || *itr != 0)
    *itr *= ca;  // Skip multiplication of 0 by ca=inf to avoid nan, except when is_root.
  for (++itr; itr != v.end(); ++itr)
    if (*itr != 0)
      *itr *= ca;
  return *this;
}

template <typename RealType, size_t OrderShops>
fvar<RealType, OrderShops>& fvar<RealType, OrderShops>::multiply_assign_by_root_type(bool is_root,
                                                                           root_type const& ca) {
  return multiply_assign_by_root_type_cpp11(is_fvar<RealType>{}, is_root, ca);
}

template <typename RealType, size_t OrderShops>
template <typename RootType>
fvar<RealType, OrderShops>& fvar<RealType, OrderShops>::negate_cpp11(std::true_type, RootType const&) {
  std::for_each(v.begin(), v.end(), [](RealType& r) { r.negate(); });
  return *this;
}

template <typename RealType, size_t OrderShops>
template <typename RootType>
fvar<RealType, OrderShops>& fvar<RealType, OrderShops>::negate_cpp11(std::false_type, RootType const&) {
  std::for_each(v.begin(), v.end(), [](RealType& a) { a = -a; });
  return *this;
}

template <typename RealType, size_t OrderShops>
fvar<RealType, OrderShops>& fvar<RealType, OrderShops>::negate() {
  return negate_cpp11(is_fvar<RealType>{}, static_cast<root_type>(*this));
}

template <typename RealType, size_t OrderShops>
template <typename RootType>
fvar<RealType, OrderShops>& fvar<RealType, OrderShops>::set_root_cpp11(std::true_type, RootType const& root) {
  v.front().set_root(root);
  return *this;
}

template <typename RealType, size_t OrderShops>
template <typename RootType>
fvar<RealType, OrderShops>& fvar<RealType, OrderShops>::set_root_cpp11(std::false_type, RootType const& root) {
  v.front() = root;
  return *this;
}

template <typename RealType, size_t OrderShops>
fvar<RealType, OrderShops>& fvar<RealType, OrderShops>::set_root(root_type const& root) {
  return set_root_cpp11(is_fvar<RealType>{}, root);
}

template <typename RealType, size_t OrderShops, size_t... Is>
auto make_fvar_for_tuple(mp::index_sequence<Is...>, RealType const& ca)
    -> decltype(make_fvar<RealType, zero<Is>::value..., OrderShops>(ca)) {
  return make_fvar<RealType, zero<Is>::value..., OrderShops>(ca);
}

template <typename RealType, size_t... Orders, size_t... Is, typename... RealTypes>
auto make_ftuple_impl(mp::index_sequence<Is...>, RealTypes const&... ca)
    -> decltype(std::make_tuple(make_fvar_for_tuple<RealType, Orders>(mp::make_index_sequence<Is>{},
                                                                      ca)...)) {
  return std::make_tuple(make_fvar_for_tuple<RealType, Orders>(mp::make_index_sequence<Is>{}, ca)...);
}

}  // namespace detail

template <typename RealType, size_t... Orders, typename... RealTypes>
auto make_ftuple(RealTypes const&... ca)
    -> decltype(detail::make_ftuple_impl<RealType, Orders...>(mp::index_sequence_for<RealTypes...>{},
                                                              ca...)) {
  static_assert(sizeof...(Orders) == sizeof...(RealTypes),
                "Number of Orders must match number of function parameters.");
  return detail::make_ftuple_impl<RealType, Orders...>(mp::index_sequence_for<RealTypes...>{}, ca...);
}

}  // namespace autodiff_v1
}  // namespace differentiation
}  // namespace math
}  // namespace boost
