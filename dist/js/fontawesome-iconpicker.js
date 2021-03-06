/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * @author Javi Aguilar, itsjavi.com
 * @license MIT License
 * @see https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 */


(function(e) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else {
        e(jQuery);
    }
})(function(j) {
    j.ui = j.ui || {};
    var e = j.ui.version = "1.12.1";
    (function() {
        var s, v = Math.max, x = Math.abs, t = /left|center|right/, i = /top|center|bottom/, l = /[\+\-]\d+(\.[\d]+)?%?/, o = /^\w+/, c = /%$/, a = j.fn.pos;
        function z(e, a, r) {
            return [ parseFloat(e[0]) * (c.test(e[0]) ? a / 100 : 1), parseFloat(e[1]) * (c.test(e[1]) ? r / 100 : 1) ];
        }
        function q(e, a) {
            return parseInt(j.css(e, a), 10) || 0;
        }
        function r(e) {
            var a = e[0];
            if (a.nodeType === 9) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                };
            }
            if (j.isWindow(a)) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                };
            }
            if (a.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: a.pageY,
                        left: a.pageX
                    }
                };
            }
            return {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            };
        }
        j.pos = {
            scrollbarWidth: function() {
                if (s !== undefined) {
                    return s;
                }
                var e, a, r = j("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"), t = r.children()[0];
                j("body").append(r);
                e = t.offsetWidth;
                r.css("overflow", "scroll");
                a = t.offsetWidth;
                if (e === a) {
                    a = r[0].clientWidth;
                }
                r.remove();
                return s = e - a;
            },
            getScrollInfo: function(e) {
                var a = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), r = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), t = a === "scroll" || a === "auto" && e.width < e.element[0].scrollWidth, s = r === "scroll" || r === "auto" && e.height < e.element[0].scrollHeight;
                return {
                    width: s ? j.pos.scrollbarWidth() : 0,
                    height: t ? j.pos.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(e) {
                var a = j(e || window), r = j.isWindow(a[0]), t = !!a[0] && a[0].nodeType === 9, s = !r && !t;
                return {
                    element: a,
                    isWindow: r,
                    isDocument: t,
                    offset: s ? j(e).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: a.scrollLeft(),
                    scrollTop: a.scrollTop(),
                    width: a.outerWidth(),
                    height: a.outerHeight()
                };
            }
        };
        j.fn.pos = function(m) {
            if (!m || !m.of) {
                return a.apply(this, arguments);
            }
            m = j.extend({}, m);
            var h, d, p, u, g, e, T = j(m.of), b = j.pos.getWithinInfo(m.within), w = j.pos.getScrollInfo(b), y = (m.collision || "flip").split(" "), k = {};
            e = r(T);
            if (T[0].preventDefault) {
                m.at = "left top";
            }
            d = e.width;
            p = e.height;
            u = e.offset;
            g = j.extend({}, u);
            j.each([ "my", "at" ], function() {
                var e = (m[this] || "").split(" "), a, r;
                if (e.length === 1) {
                    e = t.test(e[0]) ? e.concat([ "center" ]) : i.test(e[0]) ? [ "center" ].concat(e) : [ "center", "center" ];
                }
                e[0] = t.test(e[0]) ? e[0] : "center";
                e[1] = i.test(e[1]) ? e[1] : "center";
                a = l.exec(e[0]);
                r = l.exec(e[1]);
                k[this] = [ a ? a[0] : 0, r ? r[0] : 0 ];
                m[this] = [ o.exec(e[0])[0], o.exec(e[1])[0] ];
            });
            if (y.length === 1) {
                y[1] = y[0];
            }
            if (m.at[0] === "right") {
                g.left += d;
            } else if (m.at[0] === "center") {
                g.left += d / 2;
            }
            if (m.at[1] === "bottom") {
                g.top += p;
            } else if (m.at[1] === "center") {
                g.top += p / 2;
            }
            h = z(k.at, d, p);
            g.left += h[0];
            g.top += h[1];
            return this.each(function() {
                var r, e, l = j(this), o = l.outerWidth(), c = l.outerHeight(), a = q(this, "marginLeft"), t = q(this, "marginTop"), s = o + a + q(this, "marginRight") + w.width, i = c + t + q(this, "marginBottom") + w.height, n = j.extend({}, g), f = z(k.my, l.outerWidth(), l.outerHeight());
                if (m.my[0] === "right") {
                    n.left -= o;
                } else if (m.my[0] === "center") {
                    n.left -= o / 2;
                }
                if (m.my[1] === "bottom") {
                    n.top -= c;
                } else if (m.my[1] === "center") {
                    n.top -= c / 2;
                }
                n.left += f[0];
                n.top += f[1];
                r = {
                    marginLeft: a,
                    marginTop: t
                };
                j.each([ "left", "top" ], function(e, a) {
                    if (j.ui.pos[y[e]]) {
                        j.ui.pos[y[e]][a](n, {
                            targetWidth: d,
                            targetHeight: p,
                            elemWidth: o,
                            elemHeight: c,
                            collisionPosition: r,
                            collisionWidth: s,
                            collisionHeight: i,
                            offset: [ h[0] + f[0], h[1] + f[1] ],
                            my: m.my,
                            at: m.at,
                            within: b,
                            elem: l
                        });
                    }
                });
                if (m.using) {
                    e = function(e) {
                        var a = u.left - n.left, r = a + d - o, t = u.top - n.top, s = t + p - c, i = {
                            target: {
                                element: T,
                                left: u.left,
                                top: u.top,
                                width: d,
                                height: p
                            },
                            element: {
                                element: l,
                                left: n.left,
                                top: n.top,
                                width: o,
                                height: c
                            },
                            horizontal: r < 0 ? "left" : a > 0 ? "right" : "center",
                            vertical: s < 0 ? "top" : t > 0 ? "bottom" : "middle"
                        };
                        if (d < o && x(a + r) < d) {
                            i.horizontal = "center";
                        }
                        if (p < c && x(t + s) < p) {
                            i.vertical = "middle";
                        }
                        if (v(x(a), x(r)) > v(x(t), x(s))) {
                            i.important = "horizontal";
                        } else {
                            i.important = "vertical";
                        }
                        m.using.call(this, e, i);
                    };
                }
                l.offset(j.extend(n, {
                    using: e
                }));
            });
        };
        j.ui.pos = {
            _trigger: function(e, a, r, t) {
                if (a.elem) {
                    a.elem.trigger({
                        type: r,
                        position: e,
                        positionData: a,
                        triggered: t
                    });
                }
            },
            fit: {
                left: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "fitLeft");
                    var r = a.within, t = r.isWindow ? r.scrollLeft : r.offset.left, s = r.width, i = e.left - a.collisionPosition.marginLeft, l = t - i, o = i + a.collisionWidth - s - t, c;
                    if (a.collisionWidth > s) {
                        if (l > 0 && o <= 0) {
                            c = e.left + l + a.collisionWidth - s - t;
                            e.left += l - c;
                        } else if (o > 0 && l <= 0) {
                            e.left = t;
                        } else {
                            if (l > o) {
                                e.left = t + s - a.collisionWidth;
                            } else {
                                e.left = t;
                            }
                        }
                    } else if (l > 0) {
                        e.left += l;
                    } else if (o > 0) {
                        e.left -= o;
                    } else {
                        e.left = v(e.left - i, e.left);
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "fitLeft");
                },
                top: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "fitTop");
                    var r = a.within, t = r.isWindow ? r.scrollTop : r.offset.top, s = a.within.height, i = e.top - a.collisionPosition.marginTop, l = t - i, o = i + a.collisionHeight - s - t, c;
                    if (a.collisionHeight > s) {
                        if (l > 0 && o <= 0) {
                            c = e.top + l + a.collisionHeight - s - t;
                            e.top += l - c;
                        } else if (o > 0 && l <= 0) {
                            e.top = t;
                        } else {
                            if (l > o) {
                                e.top = t + s - a.collisionHeight;
                            } else {
                                e.top = t;
                            }
                        }
                    } else if (l > 0) {
                        e.top += l;
                    } else if (o > 0) {
                        e.top -= o;
                    } else {
                        e.top = v(e.top - i, e.top);
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "fitTop");
                }
            },
            flip: {
                left: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "flipLeft");
                    var r = a.within, t = r.offset.left + r.scrollLeft, s = r.width, i = r.isWindow ? r.scrollLeft : r.offset.left, l = e.left - a.collisionPosition.marginLeft, o = l - i, c = l + a.collisionWidth - s - i, n = a.my[0] === "left" ? -a.elemWidth : a.my[0] === "right" ? a.elemWidth : 0, f = a.at[0] === "left" ? a.targetWidth : a.at[0] === "right" ? -a.targetWidth : 0, m = -2 * a.offset[0], h, d;
                    if (o < 0) {
                        h = e.left + n + f + m + a.collisionWidth - s - t;
                        if (h < 0 || h < x(o)) {
                            e.left += n + f + m;
                        }
                    } else if (c > 0) {
                        d = e.left - a.collisionPosition.marginLeft + n + f + m - i;
                        if (d > 0 || x(d) < c) {
                            e.left += n + f + m;
                        }
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "flipLeft");
                },
                top: function(e, a) {
                    j.ui.pos._trigger(e, a, "posCollide", "flipTop");
                    var r = a.within, t = r.offset.top + r.scrollTop, s = r.height, i = r.isWindow ? r.scrollTop : r.offset.top, l = e.top - a.collisionPosition.marginTop, o = l - i, c = l + a.collisionHeight - s - i, n = a.my[1] === "top", f = n ? -a.elemHeight : a.my[1] === "bottom" ? a.elemHeight : 0, m = a.at[1] === "top" ? a.targetHeight : a.at[1] === "bottom" ? -a.targetHeight : 0, h = -2 * a.offset[1], d, p;
                    if (o < 0) {
                        p = e.top + f + m + h + a.collisionHeight - s - t;
                        if (p < 0 || p < x(o)) {
                            e.top += f + m + h;
                        }
                    } else if (c > 0) {
                        d = e.top - a.collisionPosition.marginTop + f + m + h - i;
                        if (d > 0 || x(d) < c) {
                            e.top += f + m + h;
                        }
                    }
                    j.ui.pos._trigger(e, a, "posCollided", "flipTop");
                }
            },
            flipfit: {
                left: function() {
                    j.ui.pos.flip.left.apply(this, arguments);
                    j.ui.pos.fit.left.apply(this, arguments);
                },
                top: function() {
                    j.ui.pos.flip.top.apply(this, arguments);
                    j.ui.pos.fit.top.apply(this, arguments);
                }
            }
        };
        (function() {
            var e, a, r, t, s, i = document.getElementsByTagName("body")[0], l = document.createElement("div");
            e = document.createElement(i ? "div" : "body");
            r = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (i) {
                j.extend(r, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
            }
            for (s in r) {
                e.style[s] = r[s];
            }
            e.appendChild(l);
            a = i || document.documentElement;
            a.insertBefore(e, a.firstChild);
            l.style.cssText = "position: absolute; left: 10.7432222px;";
            t = j(l).offset().left;
            j.support.offsetFractions = t > 10 && t < 11;
            e.innerHTML = "";
            a.removeChild(e);
        })();
    })();
    var a = j.ui.position;
});

(function(e) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
        e(window.jQuery);
    }
})(function(c) {
    "use strict";
    var l = {
        isEmpty: function(e) {
            return e === false || e === "" || e === null || e === undefined;
        },
        isEmptyObject: function(e) {
            return this.isEmpty(e) === true || e.length === 0;
        },
        isElement: function(e) {
            return c(e).length > 0;
        },
        isString: function(e) {
            return typeof e === "string" || e instanceof String;
        },
        isArray: function(e) {
            return c.isArray(e);
        },
        inArray: function(e, a) {
            return c.inArray(e, a) !== -1;
        },
        throwError: function(e) {
            throw "Font Awesome Icon Picker Exception: " + e;
        }
    };
    var r = function(e, a) {
        this._id = r._idCounter++;
        this.element = c(e).addClass("iconpicker-element");
        this._trigger("iconpickerCreate", {
            iconpickerValue: this.iconpickerValue
        });
        this.options = c.extend({}, r.defaultOptions, this.element.data(), a);
        this.options.templates = c.extend({}, r.defaultOptions.templates, this.options.templates);
        this.options.originalPlacement = this.options.placement;
        this.container = l.isElement(this.options.container) ? c(this.options.container) : false;
        if (this.container === false) {
            if (this.element.is(".dropdown-toggle")) {
                this.container = c("~ .dropdown-menu:first", this.element);
            } else {
                this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element;
            }
        }
        this.container.addClass("iconpicker-container");
        if (this.isDropdownMenu()) {
            this.options.placement = "inline";
        }
        this.input = this.element.is("input,textarea") ? this.element.addClass("iconpicker-input") : false;
        if (this.input === false) {
            this.input = this.container.find(this.options.input);
            if (!this.input.is("input,textarea")) {
                this.input = false;
            }
        }
        this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component);
        if (this.component.length === 0) {
            this.component = false;
        } else {
            this.component.find("i").addClass("iconpicker-component");
        }
        this._createPopover();
        this._createIconpicker();
        if (this.getAcceptButton().length === 0) {
            this.options.mustAccept = false;
        }
        if (this.isInputGroup()) {
            this.container.parent().append(this.popover);
        } else {
            this.container.append(this.popover);
        }
        this._bindElementEvents();
        this._bindWindowEvents();
        this.update(this.options.selected);
        if (this.isInline()) {
            this.show();
        }
        this._trigger("iconpickerCreated", {
            iconpickerValue: this.iconpickerValue
        });
    };
    r._idCounter = 0;
    r.defaultOptions = {
        title: false,
        selected: false,
        defaultValue: false,
        placement: "bottom",
        collision: "none",
        animation: true,
        hideOnSelect: false,
        showFooter: false,
        searchInFooter: false,
        mustAccept: false,
        selectedCustomClass: "bg-primary",
        icons: [],
        fullClassFormatter: function(e) {
            return e;
        },
        input: "input,.iconpicker-input",
        inputSearch: false,
        container: false,
        component: ".input-group-addon,.iconpicker-component",
        templates: {
            popover: '<div class="iconpicker-popover popover"><div class="arrow"></div>' + '<div class="popover-title"></div><div class="popover-content"></div></div>',
            footer: '<div class="popover-footer"></div>',
            buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' + ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
            search: '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
            iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
            iconpickerItem: '<a role="button" href="javascript:;" class="iconpicker-item"><i></i></a>'
        }
    };
    r.batch = function(e, a) {
        var r = Array.prototype.slice.call(arguments, 2);
        return c(e).each(function() {
            var e = c(this).data("iconpicker");
            if (!!e) {
                e[a].apply(e, r);
            }
        });
    };
    r.prototype = {
        constructor: r,
        options: {},
        _id: 0,
        _trigger: function(e, a) {
            a = a || {};
            this.element.trigger(c.extend({
                type: e,
                iconpickerInstance: this
            }, a));
        },
        _createPopover: function() {
            this.popover = c(this.options.templates.popover);
            var e = this.popover.find(".popover-title");
            if (!!this.options.title) {
                e.append(c('<div class="popover-title-text">' + this.options.title + "</div>"));
            }
            if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
                e.append(this.options.templates.search);
            } else if (!this.options.title) {
                e.remove();
            }
            if (this.options.showFooter && !l.isEmpty(this.options.templates.footer)) {
                var a = c(this.options.templates.footer);
                if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
                    a.append(c(this.options.templates.search));
                }
                if (!l.isEmpty(this.options.templates.buttons)) {
                    a.append(c(this.options.templates.buttons));
                }
                this.popover.append(a);
            }
            if (this.options.animation === true) {
                this.popover.addClass("fade");
            }
            return this.popover;
        },
        _createIconpicker: function() {
            var r = this;
            this.iconpicker = c(this.options.templates.iconpicker);
            var e = function(e) {
                var a = c(this);
                if (a.is("i")) {
                    a = a.parent();
                }
                r._trigger("iconpickerSelect", {
                    iconpickerItem: a,
                    iconpickerValue: r.iconpickerValue
                });
                if (r.options.mustAccept === false) {
                    r.update(a.data("iconpickerValue"));
                    r._trigger("iconpickerSelected", {
                        iconpickerItem: this,
                        iconpickerValue: r.iconpickerValue
                    });
                } else {
                    r.update(a.data("iconpickerValue"), true);
                }
                if (r.options.hideOnSelect && r.options.mustAccept === false) {
                    r.hide();
                }
            };
            var a = c(this.options.templates.iconpickerItem);
            var t = [];
            for (var s in this.options.icons) {
                if (typeof this.options.icons[s].title === "string") {
                    var i = a.clone();
                    i.find("i").addClass(this.options.fullClassFormatter(this.options.icons[s].title));
                    i.data("iconpickerValue", this.options.icons[s].title).on("click.iconpicker", e);
                    i.attr("title", "." + this.options.icons[s].title);
                    if (this.options.icons[s].searchTerms.length > 0) {
                        var l = "";
                        for (var o = 0; o < this.options.icons[s].searchTerms.length; o++) {
                            l = l + this.options.icons[s].searchTerms[o] + " ";
                        }
                        i.attr("data-search-terms", l);
                    }
                    t.push(i);
                }
            }
            this.iconpicker.find(".iconpicker-items").append(t);
            this.popover.find(".popover-content").append(this.iconpicker);
            return this.iconpicker;
        },
        _isEventInsideIconpicker: function(e) {
            var a = c(e.target);
            if ((!a.hasClass("iconpicker-element") || a.hasClass("iconpicker-element") && !a.is(this.element)) && a.parents(".iconpicker-popover").length === 0) {
                return false;
            }
            return true;
        },
        _bindElementEvents: function() {
            var a = this;
            this.getSearchInput().on("keyup.iconpicker", function() {
                a.filter(c(this).val().toLowerCase());
            });
            this.getAcceptButton().on("click.iconpicker", function() {
                var e = a.iconpicker.find(".iconpicker-selected").get(0);
                a.update(a.iconpickerValue);
                a._trigger("iconpickerSelected", {
                    iconpickerItem: e,
                    iconpickerValue: a.iconpickerValue
                });
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.getCancelButton().on("click.iconpicker", function() {
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.element.on("focus.iconpicker", function(e) {
                a.show();
                e.stopPropagation();
            });
            if (this.hasComponent()) {
                this.component.on("click.iconpicker", function() {
                    a.toggle();
                });
            }
            if (this.hasInput()) {
                this.input.on("keyup.iconpicker", function(e) {
                    if (!l.inArray(e.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ])) {
                        a.update();
                    } else {
                        a._updateFormGroupStatus(a.getValid(this.value) !== false);
                    }
                    if (a.options.inputSearch === true) {
                        a.filter(c(this).val().toLowerCase());
                    }
                });
            }
        },
        _bindWindowEvents: function() {
            var e = c(window.document);
            var a = this;
            var r = ".iconpicker.inst" + this._id;
            c(window).on("resize.iconpicker" + r + " orientationchange.iconpicker" + r, function(e) {
                if (a.popover.hasClass("in")) {
                    a.updatePlacement();
                }
            });
            if (!a.isInline()) {
                e.on("mouseup" + r, function(e) {
                    if (!a._isEventInsideIconpicker(e) && !a.isInline()) {
                        a.hide();
                    }
                });
            }
        },
        _unbindElementEvents: function() {
            this.popover.off(".iconpicker");
            this.element.off(".iconpicker");
            if (this.hasInput()) {
                this.input.off(".iconpicker");
            }
            if (this.hasComponent()) {
                this.component.off(".iconpicker");
            }
            if (this.hasContainer()) {
                this.container.off(".iconpicker");
            }
        },
        _unbindWindowEvents: function() {
            c(window).off(".iconpicker.inst" + this._id);
            c(window.document).off(".iconpicker.inst" + this._id);
        },
        updatePlacement: function(e, a) {
            e = e || this.options.placement;
            this.options.placement = e;
            a = a || this.options.collision;
            a = a === true ? "flip" : a;
            var r = {
                at: "right bottom",
                my: "right top",
                of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
                collision: a === true ? "flip" : a,
                within: window
            };
            this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner " + "rightTop right rightBottom bottomRight bottomRightCorner " + "bottom bottomLeft bottomLeftCorner leftBottom left leftTop");
            if (typeof e === "object") {
                return this.popover.pos(c.extend({}, r, e));
            }
            switch (e) {
              case "inline":
                {
                    r = false;
                }
                break;

              case "topLeftCorner":
                {
                    r.my = "right bottom";
                    r.at = "left top";
                }
                break;

              case "topLeft":
                {
                    r.my = "left bottom";
                    r.at = "left top";
                }
                break;

              case "top":
                {
                    r.my = "center bottom";
                    r.at = "center top";
                }
                break;

              case "topRight":
                {
                    r.my = "right bottom";
                    r.at = "right top";
                }
                break;

              case "topRightCorner":
                {
                    r.my = "left bottom";
                    r.at = "right top";
                }
                break;

              case "rightTop":
                {
                    r.my = "left bottom";
                    r.at = "right center";
                }
                break;

              case "right":
                {
                    r.my = "left center";
                    r.at = "right center";
                }
                break;

              case "rightBottom":
                {
                    r.my = "left top";
                    r.at = "right center";
                }
                break;

              case "bottomRightCorner":
                {
                    r.my = "left top";
                    r.at = "right bottom";
                }
                break;

              case "bottomRight":
                {
                    r.my = "right top";
                    r.at = "right bottom";
                }
                break;

              case "bottom":
                {
                    r.my = "center top";
                    r.at = "center bottom";
                }
                break;

              case "bottomLeft":
                {
                    r.my = "left top";
                    r.at = "left bottom";
                }
                break;

              case "bottomLeftCorner":
                {
                    r.my = "right top";
                    r.at = "left bottom";
                }
                break;

              case "leftBottom":
                {
                    r.my = "right top";
                    r.at = "left center";
                }
                break;

              case "left":
                {
                    r.my = "right center";
                    r.at = "left center";
                }
                break;

              case "leftTop":
                {
                    r.my = "right bottom";
                    r.at = "left center";
                }
                break;

              default:
                {
                    return false;
                }
                break;
            }
            this.popover.css({
                display: this.options.placement === "inline" ? "" : "block"
            });
            if (r !== false) {
                this.popover.pos(r).css("maxWidth", c(window).width() - this.container.offset().left - 5);
            } else {
                this.popover.css({
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto",
                    maxWidth: "none"
                });
            }
            this.popover.addClass(this.options.placement);
            return true;
        },
        _updateComponents: function() {
            this.iconpicker.find(".iconpicker-item.iconpicker-selected").removeClass("iconpicker-selected " + this.options.selectedCustomClass);
            if (this.iconpickerValue) {
                this.iconpicker.find("." + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, ".")).parent().addClass("iconpicker-selected " + this.options.selectedCustomClass);
            }
            if (this.hasComponent()) {
                var e = this.component.find("i");
                if (e.length > 0) {
                    e.attr("class", this.options.fullClassFormatter(this.iconpickerValue));
                } else {
                    this.component.html(this.getHtml());
                }
            }
        },
        _updateFormGroupStatus: function(e) {
            if (this.hasInput()) {
                if (e !== false) {
                    this.input.parents(".form-group:first").removeClass("has-error");
                } else {
                    this.input.parents(".form-group:first").addClass("has-error");
                }
                return true;
            }
            return false;
        },
        getValid: function(e) {
            if (!l.isString(e)) {
                e = "";
            }
            var a = e === "";
            e = c.trim(e);
            var r = false;
            for (var t = 0; t < this.options.icons.length; t++) {
                if (this.options.icons[t].title === e) {
                    r = true;
                    break;
                }
            }
            if (r || a) {
                return e;
            }
            return false;
        },
        setValue: function(e) {
            var a = this.getValid(e);
            if (a !== false) {
                this.iconpickerValue = a;
                this._trigger("iconpickerSetValue", {
                    iconpickerValue: a
                });
                return this.iconpickerValue;
            } else {
                this._trigger("iconpickerInvalid", {
                    iconpickerValue: e
                });
                return false;
            }
        },
        getHtml: function() {
            return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
        },
        setSourceValue: function(e) {
            e = this.setValue(e);
            if (e !== false && e !== "") {
                if (this.hasInput()) {
                    this.input.val(this.iconpickerValue);
                } else {
                    this.element.data("iconpickerValue", this.iconpickerValue);
                }
                this._trigger("iconpickerSetSourceValue", {
                    iconpickerValue: e
                });
            }
            return e;
        },
        getSourceValue: function(e) {
            e = e || this.options.defaultValue;
            var a = e;
            if (this.hasInput()) {
                a = this.input.val();
            } else {
                a = this.element.data("iconpickerValue");
            }
            if (a === undefined || a === "" || a === null || a === false) {
                a = e;
            }
            return a;
        },
        hasInput: function() {
            return this.input !== false;
        },
        isInputSearch: function() {
            return this.hasInput() && this.options.inputSearch === true;
        },
        isInputGroup: function() {
            return this.container.is(".input-group");
        },
        isDropdownMenu: function() {
            return this.container.is(".dropdown-menu");
        },
        hasSeparatedSearchInput: function() {
            return this.options.templates.search !== false && !this.isInputSearch();
        },
        hasComponent: function() {
            return this.component !== false;
        },
        hasContainer: function() {
            return this.container !== false;
        },
        getAcceptButton: function() {
            return this.popover.find(".iconpicker-btn-accept");
        },
        getCancelButton: function() {
            return this.popover.find(".iconpicker-btn-cancel");
        },
        getSearchInput: function() {
            return this.popover.find(".iconpicker-search");
        },
        filter: function(s) {
            if (l.isEmpty(s)) {
                this.iconpicker.find(".iconpicker-item").show();
                return c(false);
            } else {
                var i = [];
                this.iconpicker.find(".iconpicker-item").each(function() {
                    var e = c(this);
                    var a = e.attr("title").toLowerCase();
                    var r = e.attr("data-search-terms") ? e.attr("data-search-terms").toLowerCase() : "";
                    a = a + " " + r;
                    var t = false;
                    try {
                        t = new RegExp("(^|\\W)" + s, "g");
                    } catch (e) {
                        t = false;
                    }
                    if (t !== false && a.match(t)) {
                        i.push(e);
                        e.show();
                    } else {
                        e.hide();
                    }
                });
                return i;
            }
        },
        show: function() {
            if (this.popover.hasClass("in")) {
                return false;
            }
            c.iconpicker.batch(c(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide");
            this._trigger("iconpickerShow", {
                iconpickerValue: this.iconpickerValue
            });
            this.updatePlacement();
            this.popover.addClass("in");
            setTimeout(c.proxy(function() {
                this.popover.css("display", this.isInline() ? "" : "block");
                this._trigger("iconpickerShown", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        hide: function() {
            if (!this.popover.hasClass("in")) {
                return false;
            }
            this._trigger("iconpickerHide", {
                iconpickerValue: this.iconpickerValue
            });
            this.popover.removeClass("in");
            setTimeout(c.proxy(function() {
                this.popover.css("display", "none");
                this.getSearchInput().val("");
                this.filter("");
                this._trigger("iconpickerHidden", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        toggle: function() {
            if (this.popover.is(":visible")) {
                this.hide();
            } else {
                this.show(true);
            }
        },
        update: function(e, a) {
            e = e ? e : this.getSourceValue(this.iconpickerValue);
            this._trigger("iconpickerUpdate", {
                iconpickerValue: this.iconpickerValue
            });
            if (a === true) {
                e = this.setValue(e);
            } else {
                e = this.setSourceValue(e);
                this._updateFormGroupStatus(e !== false);
            }
            if (e !== false) {
                this._updateComponents();
            }
            this._trigger("iconpickerUpdated", {
                iconpickerValue: this.iconpickerValue
            });
            return e;
        },
        destroy: function() {
            this._trigger("iconpickerDestroy", {
                iconpickerValue: this.iconpickerValue
            });
            this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element");
            this._unbindElementEvents();
            this._unbindWindowEvents();
            c(this.popover).remove();
            this._trigger("iconpickerDestroyed", {
                iconpickerValue: this.iconpickerValue
            });
        },
        disable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", true);
                return true;
            }
            return false;
        },
        enable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", false);
                return true;
            }
            return false;
        },
        isDisabled: function() {
            if (this.hasInput()) {
                return this.input.prop("disabled") === true;
            }
            return false;
        },
        isInline: function() {
            return this.options.placement === "inline" || this.popover.hasClass("inline");
        }
    };
    c.iconpicker = r;
    c.fn.iconpicker = function(a) {
        return this.each(function() {
            var e = c(this);
            if (!e.data("iconpicker")) {
                e.data("iconpicker", new r(this, typeof a === "object" ? a : {}));
            }
        });
    };
    r.defaultOptions = c.extend(r.defaultOptions, {
        icons: [ {
            title: "fab fa-500px",
            searchTerms: []
        }, {
            title: "fas fa-abacus",
            searchTerms: [ "addition", "ancient", "arithmetic", "calculator", "counting", "hexadecimal", "math", "subtraction" ]
        }, {
            title: "far fa-abacus",
            searchTerms: [ "addition", "ancient", "arithmetic", "calculator", "counting", "hexadecimal", "math", "subtraction" ]
        }, {
            title: "fal fa-abacus",
            searchTerms: [ "addition", "ancient", "arithmetic", "calculator", "counting", "hexadecimal", "math", "subtraction" ]
        }, {
            title: "fab fa-accessible-icon",
            searchTerms: [ "accessibility", "handicap", "person", "wheelchair", "wheelchair-alt" ]
        }, {
            title: "fab fa-accusoft",
            searchTerms: []
        }, {
            title: "fas fa-acorn",
            searchTerms: [ "fall", "nature", "nut", "oak", "seasonal", "seed", "squirrel", "tree" ]
        }, {
            title: "far fa-acorn",
            searchTerms: [ "fall", "nature", "nut", "oak", "seasonal", "seed", "squirrel", "tree" ]
        }, {
            title: "fal fa-acorn",
            searchTerms: [ "fall", "nature", "nut", "oak", "seasonal", "seed", "squirrel", "tree" ]
        }, {
            title: "fab fa-acquisitions-incorporated",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop" ]
        }, {
            title: "fas fa-ad",
            searchTerms: [ "advertisement", "media", "newspaper", "promotion", "publicity" ]
        }, {
            title: "far fa-ad",
            searchTerms: [ "advertisement", "media", "newspaper", "promotion", "publicity" ]
        }, {
            title: "fal fa-ad",
            searchTerms: [ "advertisement", "media", "newspaper", "promotion", "publicity" ]
        }, {
            title: "fas fa-address-book",
            searchTerms: [ "contact", "directory", "index", "little black book", "rolodex" ]
        }, {
            title: "far fa-address-book",
            searchTerms: [ "contact", "directory", "index", "little black book", "rolodex" ]
        }, {
            title: "fal fa-address-book",
            searchTerms: [ "contact", "directory", "index", "little black book", "rolodex" ]
        }, {
            title: "fas fa-address-card",
            searchTerms: [ "about", "contact", "id", "identification", "postcard", "profile" ]
        }, {
            title: "far fa-address-card",
            searchTerms: [ "about", "contact", "id", "identification", "postcard", "profile" ]
        }, {
            title: "fal fa-address-card",
            searchTerms: [ "about", "contact", "id", "identification", "postcard", "profile" ]
        }, {
            title: "fas fa-adjust",
            searchTerms: [ "contrast", "dark", "light", "saturation" ]
        }, {
            title: "far fa-adjust",
            searchTerms: [ "contrast", "dark", "light", "saturation" ]
        }, {
            title: "fal fa-adjust",
            searchTerms: [ "contrast", "dark", "light", "saturation" ]
        }, {
            title: "fab fa-adn",
            searchTerms: []
        }, {
            title: "fab fa-adobe",
            searchTerms: [ "acrobat", "app", "design", "illustrator", "indesign", "photoshop" ]
        }, {
            title: "fab fa-adversal",
            searchTerms: []
        }, {
            title: "fab fa-affiliatetheme",
            searchTerms: []
        }, {
            title: "fas fa-air-conditioner",
            searchTerms: [ "ac", "cool", "heat", "heat pump", "hvac", "mini-split", "temperature", "unit" ]
        }, {
            title: "far fa-air-conditioner",
            searchTerms: [ "ac", "cool", "heat", "heat pump", "hvac", "mini-split", "temperature", "unit" ]
        }, {
            title: "fal fa-air-conditioner",
            searchTerms: [ "ac", "cool", "heat", "heat pump", "hvac", "mini-split", "temperature", "unit" ]
        }, {
            title: "fas fa-air-freshener",
            searchTerms: [ "car", "deodorize", "fresh", "pine", "scent" ]
        }, {
            title: "far fa-air-freshener",
            searchTerms: [ "car", "deodorize", "fresh", "pine", "scent" ]
        }, {
            title: "fal fa-air-freshener",
            searchTerms: [ "car", "deodorize", "fresh", "pine", "scent" ]
        }, {
            title: "fab fa-airbnb",
            searchTerms: []
        }, {
            title: "fas fa-alarm-clock",
            searchTerms: [ "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "far fa-alarm-clock",
            searchTerms: [ "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "fal fa-alarm-clock",
            searchTerms: [ "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "fas fa-alarm-exclamation",
            searchTerms: [ "alert", "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "far fa-alarm-exclamation",
            searchTerms: [ "alert", "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "fal fa-alarm-exclamation",
            searchTerms: [ "alert", "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "fas fa-alarm-plus",
            searchTerms: [ "alert", "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "far fa-alarm-plus",
            searchTerms: [ "alert", "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "fal fa-alarm-plus",
            searchTerms: [ "alert", "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "fas fa-alarm-snooze",
            searchTerms: [ "alert", "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "far fa-alarm-snooze",
            searchTerms: [ "alert", "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "fal fa-alarm-snooze",
            searchTerms: [ "alert", "date", "late", "reminder", "sleep", "snooze", "timer", "timestamp", "watch" ]
        }, {
            title: "fas fa-album",
            searchTerms: [ "library", "music", "record", "song", "vinyl" ]
        }, {
            title: "far fa-album",
            searchTerms: [ "library", "music", "record", "song", "vinyl" ]
        }, {
            title: "fal fa-album",
            searchTerms: [ "library", "music", "record", "song", "vinyl" ]
        }, {
            title: "fas fa-album-collection",
            searchTerms: [ "catalog", "library", "music", "record", "song", "vinyl" ]
        }, {
            title: "far fa-album-collection",
            searchTerms: [ "catalog", "library", "music", "record", "song", "vinyl" ]
        }, {
            title: "fal fa-album-collection",
            searchTerms: [ "catalog", "library", "music", "record", "song", "vinyl" ]
        }, {
            title: "fab fa-algolia",
            searchTerms: []
        }, {
            title: "fas fa-alicorn",
            searchTerms: [ "animal", "fantasy", "fauna", "horse", "mammal", "pegasus", "unicorn", "wing" ]
        }, {
            title: "far fa-alicorn",
            searchTerms: [ "animal", "fantasy", "fauna", "horse", "mammal", "pegasus", "unicorn", "wing" ]
        }, {
            title: "fal fa-alicorn",
            searchTerms: [ "animal", "fantasy", "fauna", "horse", "mammal", "pegasus", "unicorn", "wing" ]
        }, {
            title: "fas fa-alien",
            searchTerms: [ "ET", "extraterrestrial", "humanoid", "monster", "space", "strange", "ufo" ]
        }, {
            title: "far fa-alien",
            searchTerms: [ "ET", "extraterrestrial", "humanoid", "monster", "space", "strange", "ufo" ]
        }, {
            title: "fal fa-alien",
            searchTerms: [ "ET", "extraterrestrial", "humanoid", "monster", "space", "strange", "ufo" ]
        }, {
            title: "fas fa-alien-monster",
            searchTerms: [ "ET", "extraterrestrial", "humanoid", "monster", "space", "space invader", "strange", "ufo", "video game" ]
        }, {
            title: "far fa-alien-monster",
            searchTerms: [ "ET", "extraterrestrial", "humanoid", "monster", "space", "space invader", "strange", "ufo", "video game" ]
        }, {
            title: "fal fa-alien-monster",
            searchTerms: [ "ET", "extraterrestrial", "humanoid", "monster", "space", "space invader", "strange", "ufo", "video game" ]
        }, {
            title: "fas fa-align-center",
            searchTerms: [ "format", "middle", "paragraph", "text" ]
        }, {
            title: "far fa-align-center",
            searchTerms: [ "format", "middle", "paragraph", "text" ]
        }, {
            title: "fal fa-align-center",
            searchTerms: [ "format", "middle", "paragraph", "text" ]
        }, {
            title: "fas fa-align-justify",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "far fa-align-justify",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "fal fa-align-justify",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "fas fa-align-left",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "far fa-align-left",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "fal fa-align-left",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "fas fa-align-right",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "far fa-align-right",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "fal fa-align-right",
            searchTerms: [ "format", "paragraph", "text" ]
        }, {
            title: "fas fa-align-slash",
            searchTerms: [ "cancel", "format", "paragraph", "remove" ]
        }, {
            title: "far fa-align-slash",
            searchTerms: [ "cancel", "format", "paragraph", "remove" ]
        }, {
            title: "fal fa-align-slash",
            searchTerms: [ "cancel", "format", "paragraph", "remove" ]
        }, {
            title: "fab fa-alipay",
            searchTerms: []
        }, {
            title: "fas fa-allergies",
            searchTerms: [ "allergy", "freckles", "hand", "hives", "pox", "skin", "spots" ]
        }, {
            title: "far fa-allergies",
            searchTerms: [ "allergy", "freckles", "hand", "hives", "pox", "skin", "spots" ]
        }, {
            title: "fal fa-allergies",
            searchTerms: [ "allergy", "freckles", "hand", "hives", "pox", "skin", "spots" ]
        }, {
            title: "fab fa-amazon",
            searchTerms: []
        }, {
            title: "fab fa-amazon-pay",
            searchTerms: []
        }, {
            title: "fas fa-ambulance",
            searchTerms: [ "emergency", "emt", "er", "help", "hospital", "support", "vehicle" ]
        }, {
            title: "far fa-ambulance",
            searchTerms: [ "emergency", "emt", "er", "help", "hospital", "support", "vehicle" ]
        }, {
            title: "fal fa-ambulance",
            searchTerms: [ "emergency", "emt", "er", "help", "hospital", "support", "vehicle" ]
        }, {
            title: "fas fa-american-sign-language-interpreting",
            searchTerms: [ "asl", "deaf", "finger", "hand", "interpret", "speak" ]
        }, {
            title: "far fa-american-sign-language-interpreting",
            searchTerms: [ "asl", "deaf", "finger", "hand", "interpret", "speak" ]
        }, {
            title: "fal fa-american-sign-language-interpreting",
            searchTerms: [ "asl", "deaf", "finger", "hand", "interpret", "speak" ]
        }, {
            title: "fab fa-amilia",
            searchTerms: []
        }, {
            title: "fal fa-amp-guitar",
            searchTerms: [ "audio", "guitar", "loudspeaker", "music", "pa", "volume" ]
        }, {
            title: "far fa-amp-guitar",
            searchTerms: [ "audio", "guitar", "loudspeaker", "music", "pa", "volume" ]
        }, {
            title: "fas fa-amp-guitar",
            searchTerms: [ "audio", "guitar", "loudspeaker", "music", "pa", "volume" ]
        }, {
            title: "fas fa-analytics",
            searchTerms: [ "chart", "measure", "roi", "tracking", "trend" ]
        }, {
            title: "far fa-analytics",
            searchTerms: [ "chart", "measure", "roi", "tracking", "trend" ]
        }, {
            title: "fal fa-analytics",
            searchTerms: [ "chart", "measure", "roi", "tracking", "trend" ]
        }, {
            title: "fas fa-anchor",
            searchTerms: [ "berth", "boat", "dock", "embed", "link", "maritime", "moor", "secure" ]
        }, {
            title: "far fa-anchor",
            searchTerms: [ "berth", "boat", "dock", "embed", "link", "maritime", "moor", "secure" ]
        }, {
            title: "fal fa-anchor",
            searchTerms: [ "berth", "boat", "dock", "embed", "link", "maritime", "moor", "secure" ]
        }, {
            title: "fab fa-android",
            searchTerms: [ "robot" ]
        }, {
            title: "fas fa-angel",
            searchTerms: [ "christmas", "decoration", "halo", "holiday", "holy", "michael landon", "wings", "xmas" ]
        }, {
            title: "far fa-angel",
            searchTerms: [ "christmas", "decoration", "halo", "holiday", "holy", "michael landon", "wings", "xmas" ]
        }, {
            title: "fal fa-angel",
            searchTerms: [ "christmas", "decoration", "halo", "holiday", "holy", "michael landon", "wings", "xmas" ]
        }, {
            title: "fab fa-angellist",
            searchTerms: []
        }, {
            title: "fas fa-angle-double-down",
            searchTerms: [ "arrows", "caret", "download", "expand" ]
        }, {
            title: "far fa-angle-double-down",
            searchTerms: [ "arrows", "caret", "download", "expand" ]
        }, {
            title: "fal fa-angle-double-down",
            searchTerms: [ "arrows", "caret", "download", "expand" ]
        }, {
            title: "fas fa-angle-double-left",
            searchTerms: [ "arrows", "back", "caret", "laquo", "previous", "quote" ]
        }, {
            title: "far fa-angle-double-left",
            searchTerms: [ "arrows", "back", "caret", "laquo", "previous", "quote" ]
        }, {
            title: "fal fa-angle-double-left",
            searchTerms: [ "arrows", "back", "caret", "laquo", "previous", "quote" ]
        }, {
            title: "fas fa-angle-double-right",
            searchTerms: [ "arrows", "caret", "forward", "more", "next", "quote", "raquo" ]
        }, {
            title: "far fa-angle-double-right",
            searchTerms: [ "arrows", "caret", "forward", "more", "next", "quote", "raquo" ]
        }, {
            title: "fal fa-angle-double-right",
            searchTerms: [ "arrows", "caret", "forward", "more", "next", "quote", "raquo" ]
        }, {
            title: "fas fa-angle-double-up",
            searchTerms: [ "arrows", "caret", "collapse", "upload" ]
        }, {
            title: "far fa-angle-double-up",
            searchTerms: [ "arrows", "caret", "collapse", "upload" ]
        }, {
            title: "fal fa-angle-double-up",
            searchTerms: [ "arrows", "caret", "collapse", "upload" ]
        }, {
            title: "fas fa-angle-down",
            searchTerms: [ "arrow", "caret", "download", "expand" ]
        }, {
            title: "far fa-angle-down",
            searchTerms: [ "arrow", "caret", "download", "expand" ]
        }, {
            title: "fal fa-angle-down",
            searchTerms: [ "arrow", "caret", "download", "expand" ]
        }, {
            title: "fas fa-angle-left",
            searchTerms: [ "arrow", "back", "caret", "less", "previous" ]
        }, {
            title: "far fa-angle-left",
            searchTerms: [ "arrow", "back", "caret", "less", "previous" ]
        }, {
            title: "fal fa-angle-left",
            searchTerms: [ "arrow", "back", "caret", "less", "previous" ]
        }, {
            title: "fas fa-angle-right",
            searchTerms: [ "arrow", "care", "forward", "more", "next" ]
        }, {
            title: "far fa-angle-right",
            searchTerms: [ "arrow", "care", "forward", "more", "next" ]
        }, {
            title: "fal fa-angle-right",
            searchTerms: [ "arrow", "care", "forward", "more", "next" ]
        }, {
            title: "fas fa-angle-up",
            searchTerms: [ "arrow", "caret", "collapse", "upload" ]
        }, {
            title: "far fa-angle-up",
            searchTerms: [ "arrow", "caret", "collapse", "upload" ]
        }, {
            title: "fal fa-angle-up",
            searchTerms: [ "arrow", "caret", "collapse", "upload" ]
        }, {
            title: "fas fa-angry",
            searchTerms: [ "disapprove", "emoticon", "face", "mad", "upset" ]
        }, {
            title: "far fa-angry",
            searchTerms: [ "disapprove", "emoticon", "face", "mad", "upset" ]
        }, {
            title: "fal fa-angry",
            searchTerms: [ "disapprove", "emoticon", "face", "mad", "upset" ]
        }, {
            title: "fab fa-angrycreative",
            searchTerms: []
        }, {
            title: "fab fa-angular",
            searchTerms: []
        }, {
            title: "fas fa-ankh",
            searchTerms: [ "amulet", "copper", "coptic christianity", "copts", "crux ansata", "egypt", "venus" ]
        }, {
            title: "far fa-ankh",
            searchTerms: [ "amulet", "copper", "coptic christianity", "copts", "crux ansata", "egypt", "venus" ]
        }, {
            title: "fal fa-ankh",
            searchTerms: [ "amulet", "copper", "coptic christianity", "copts", "crux ansata", "egypt", "venus" ]
        }, {
            title: "fab fa-app-store",
            searchTerms: []
        }, {
            title: "fab fa-app-store-ios",
            searchTerms: []
        }, {
            title: "fab fa-apper",
            searchTerms: []
        }, {
            title: "fab fa-apple",
            searchTerms: [ "fruit", "ios", "mac", "operating system", "os", "osx" ]
        }, {
            title: "fas fa-apple-alt",
            searchTerms: [ "fall", "fruit", "fuji", "macintosh", "orchard", "seasonal", "vegan" ]
        }, {
            title: "far fa-apple-alt",
            searchTerms: [ "fall", "fruit", "fuji", "macintosh", "orchard", "seasonal", "vegan" ]
        }, {
            title: "fal fa-apple-alt",
            searchTerms: [ "fall", "fruit", "fuji", "macintosh", "orchard", "seasonal", "vegan" ]
        }, {
            title: "fas fa-apple-crate",
            searchTerms: [ "bushel", "container", "fall", "fruit", "fuji", "macintosh", "orchard", "peck", "seasonal" ]
        }, {
            title: "far fa-apple-crate",
            searchTerms: [ "bushel", "container", "fall", "fruit", "fuji", "macintosh", "orchard", "peck", "seasonal" ]
        }, {
            title: "fal fa-apple-crate",
            searchTerms: [ "bushel", "container", "fall", "fruit", "fuji", "macintosh", "orchard", "peck", "seasonal" ]
        }, {
            title: "fab fa-apple-pay",
            searchTerms: []
        }, {
            title: "fas fa-archive",
            searchTerms: [ "box", "package", "save", "storage" ]
        }, {
            title: "far fa-archive",
            searchTerms: [ "box", "package", "save", "storage" ]
        }, {
            title: "fal fa-archive",
            searchTerms: [ "box", "package", "save", "storage" ]
        }, {
            title: "fas fa-archway",
            searchTerms: [ "arc", "monument", "road", "street", "tunnel" ]
        }, {
            title: "far fa-archway",
            searchTerms: [ "arc", "monument", "road", "street", "tunnel" ]
        }, {
            title: "fal fa-archway",
            searchTerms: [ "arc", "monument", "road", "street", "tunnel" ]
        }, {
            title: "fas fa-arrow-alt-circle-down",
            searchTerms: [ "arrow-circle-o-down", "download" ]
        }, {
            title: "far fa-arrow-alt-circle-down",
            searchTerms: [ "arrow-circle-o-down", "download" ]
        }, {
            title: "fal fa-arrow-alt-circle-down",
            searchTerms: [ "arrow-circle-o-down", "download" ]
        }, {
            title: "fas fa-arrow-alt-circle-left",
            searchTerms: [ "arrow-circle-o-left", "back", "previous" ]
        }, {
            title: "far fa-arrow-alt-circle-left",
            searchTerms: [ "arrow-circle-o-left", "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-circle-left",
            searchTerms: [ "arrow-circle-o-left", "back", "previous" ]
        }, {
            title: "fas fa-arrow-alt-circle-right",
            searchTerms: [ "arrow-circle-o-right", "forward", "next" ]
        }, {
            title: "far fa-arrow-alt-circle-right",
            searchTerms: [ "arrow-circle-o-right", "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-circle-right",
            searchTerms: [ "arrow-circle-o-right", "forward", "next" ]
        }, {
            title: "fas fa-arrow-alt-circle-up",
            searchTerms: [ "arrow-circle-o-up" ]
        }, {
            title: "far fa-arrow-alt-circle-up",
            searchTerms: [ "arrow-circle-o-up" ]
        }, {
            title: "fal fa-arrow-alt-circle-up",
            searchTerms: [ "arrow-circle-o-up" ]
        }, {
            title: "fas fa-arrow-alt-down",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-alt-down",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-alt-down",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-alt-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-alt-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-alt-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-alt-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-alt-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-alt-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-alt-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fas fa-arrow-alt-from-top",
            searchTerms: [ "upload" ]
        }, {
            title: "far fa-arrow-alt-from-top",
            searchTerms: [ "upload" ]
        }, {
            title: "fal fa-arrow-alt-from-top",
            searchTerms: [ "upload" ]
        }, {
            title: "fas fa-arrow-alt-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-alt-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-alt-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-alt-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fas fa-arrow-alt-square-down",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-alt-square-down",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-alt-square-down",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-alt-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-alt-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-alt-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-alt-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fas fa-arrow-alt-square-up",
            searchTerms: [ "upload" ]
        }, {
            title: "far fa-arrow-alt-square-up",
            searchTerms: [ "upload" ]
        }, {
            title: "fal fa-arrow-alt-square-up",
            searchTerms: [ "upload" ]
        }, {
            title: "fas fa-arrow-alt-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-alt-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-alt-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-alt-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-alt-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-alt-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-alt-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-alt-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-alt-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fas fa-arrow-alt-to-top",
            searchTerms: [ "upload" ]
        }, {
            title: "far fa-arrow-alt-to-top",
            searchTerms: [ "upload" ]
        }, {
            title: "fal fa-arrow-alt-to-top",
            searchTerms: [ "upload" ]
        }, {
            title: "fas fa-arrow-alt-up",
            searchTerms: [ "upload" ]
        }, {
            title: "far fa-arrow-alt-up",
            searchTerms: [ "upload" ]
        }, {
            title: "fal fa-arrow-alt-up",
            searchTerms: [ "upload" ]
        }, {
            title: "fas fa-arrow-circle-down",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-circle-down",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-circle-down",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-circle-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-circle-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fas fa-arrow-circle-up",
            searchTerms: [ "upload" ]
        }, {
            title: "far fa-arrow-circle-up",
            searchTerms: [ "upload" ]
        }, {
            title: "fal fa-arrow-circle-up",
            searchTerms: [ "upload" ]
        }, {
            title: "fas fa-arrow-down",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-down",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-down",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-from-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-from-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-from-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fas fa-arrow-from-top",
            searchTerms: [ "upload" ]
        }, {
            title: "far fa-arrow-from-top",
            searchTerms: [ "upload" ]
        }, {
            title: "fal fa-arrow-from-top",
            searchTerms: [ "upload" ]
        }, {
            title: "fas fa-arrow-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fas fa-arrow-square-down",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-square-down",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-square-down",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-square-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-square-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fas fa-arrow-square-up",
            searchTerms: [ "upload" ]
        }, {
            title: "far fa-arrow-square-up",
            searchTerms: [ "upload" ]
        }, {
            title: "fal fa-arrow-square-up",
            searchTerms: [ "upload" ]
        }, {
            title: "fas fa-arrow-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "far fa-arrow-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fal fa-arrow-to-bottom",
            searchTerms: [ "download" ]
        }, {
            title: "fas fa-arrow-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "far fa-arrow-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fal fa-arrow-to-left",
            searchTerms: [ "back", "previous" ]
        }, {
            title: "fas fa-arrow-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "far fa-arrow-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fal fa-arrow-to-right",
            searchTerms: [ "forward", "next" ]
        }, {
            title: "fas fa-arrow-to-top",
            searchTerms: [ "upload" ]
        }, {
            title: "far fa-arrow-to-top",
            searchTerms: [ "upload" ]
        }, {
            title: "fal fa-arrow-to-top",
            searchTerms: [ "upload" ]
        }, {
            title: "fas fa-arrow-up",
            searchTerms: [ "forward", "upload" ]
        }, {
            title: "far fa-arrow-up",
            searchTerms: [ "forward", "upload" ]
        }, {
            title: "fal fa-arrow-up",
            searchTerms: [ "forward", "upload" ]
        }, {
            title: "fas fa-arrows",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "far fa-arrows",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "fal fa-arrows",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "fas fa-arrows-alt",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "far fa-arrows-alt",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "fal fa-arrows-alt",
            searchTerms: [ "arrow", "arrows", "bigger", "enlarge", "expand", "fullscreen", "move", "position", "reorder", "resize" ]
        }, {
            title: "fas fa-arrows-alt-h",
            searchTerms: [ "arrows-h", "expand", "horizontal", "landscape", "resize", "wide" ]
        }, {
            title: "far fa-arrows-alt-h",
            searchTerms: [ "arrows-h", "expand", "horizontal", "landscape", "resize", "wide" ]
        }, {
            title: "fal fa-arrows-alt-h",
            searchTerms: [ "arrows-h", "expand", "horizontal", "landscape", "resize", "wide" ]
        }, {
            title: "fas fa-arrows-alt-v",
            searchTerms: [ "arrows-v", "expand", "portrait", "resize", "tall", "vertical" ]
        }, {
            title: "far fa-arrows-alt-v",
            searchTerms: [ "arrows-v", "expand", "portrait", "resize", "tall", "vertical" ]
        }, {
            title: "fal fa-arrows-alt-v",
            searchTerms: [ "arrows-v", "expand", "portrait", "resize", "tall", "vertical" ]
        }, {
            title: "fas fa-arrows-h",
            searchTerms: [ "expand", "horizontal", "landscape", "resize", "wide" ]
        }, {
            title: "far fa-arrows-h",
            searchTerms: [ "expand", "horizontal", "landscape", "resize", "wide" ]
        }, {
            title: "fal fa-arrows-h",
            searchTerms: [ "expand", "horizontal", "landscape", "resize", "wide" ]
        }, {
            title: "fas fa-arrows-v",
            searchTerms: [ "expand", "portrait", "resize", "tall", "vertical" ]
        }, {
            title: "far fa-arrows-v",
            searchTerms: [ "expand", "portrait", "resize", "tall", "vertical" ]
        }, {
            title: "fal fa-arrows-v",
            searchTerms: [ "expand", "portrait", "resize", "tall", "vertical" ]
        }, {
            title: "fab fa-artstation",
            searchTerms: []
        }, {
            title: "fas fa-assistive-listening-systems",
            searchTerms: [ "amplify", "audio", "deaf", "ear", "headset", "hearing", "sound" ]
        }, {
            title: "far fa-assistive-listening-systems",
            searchTerms: [ "amplify", "audio", "deaf", "ear", "headset", "hearing", "sound" ]
        }, {
            title: "fal fa-assistive-listening-systems",
            searchTerms: [ "amplify", "audio", "deaf", "ear", "headset", "hearing", "sound" ]
        }, {
            title: "fas fa-asterisk",
            searchTerms: [ "annotation", "details", "reference", "star" ]
        }, {
            title: "far fa-asterisk",
            searchTerms: [ "annotation", "details", "reference", "star" ]
        }, {
            title: "fal fa-asterisk",
            searchTerms: [ "annotation", "details", "reference", "star" ]
        }, {
            title: "fab fa-asymmetrik",
            searchTerms: []
        }, {
            title: "fas fa-at",
            searchTerms: [ "address", "author", "e-mail", "email", "handle" ]
        }, {
            title: "far fa-at",
            searchTerms: [ "address", "author", "e-mail", "email", "handle" ]
        }, {
            title: "fal fa-at",
            searchTerms: [ "address", "author", "e-mail", "email", "handle" ]
        }, {
            title: "fas fa-atlas",
            searchTerms: [ "book", "directions", "geography", "globe", "map", "travel", "wayfinding" ]
        }, {
            title: "far fa-atlas",
            searchTerms: [ "book", "directions", "geography", "globe", "map", "travel", "wayfinding" ]
        }, {
            title: "fal fa-atlas",
            searchTerms: [ "book", "directions", "geography", "globe", "map", "travel", "wayfinding" ]
        }, {
            title: "fab fa-atlassian",
            searchTerms: []
        }, {
            title: "fas fa-atom",
            searchTerms: [ "atheism", "chemistry", "electron", "ion", "isotope", "neutron", "nuclear", "proton", "science" ]
        }, {
            title: "far fa-atom",
            searchTerms: [ "atheism", "chemistry", "electron", "ion", "isotope", "neutron", "nuclear", "proton", "science" ]
        }, {
            title: "fal fa-atom",
            searchTerms: [ "atheism", "chemistry", "electron", "ion", "isotope", "neutron", "nuclear", "proton", "science" ]
        }, {
            title: "fas fa-atom-alt",
            searchTerms: [ "atheism", "chemistry", "electron", "ion", "isotope", "neutron", "nuclear", "proton", "science", "space" ]
        }, {
            title: "far fa-atom-alt",
            searchTerms: [ "atheism", "chemistry", "electron", "ion", "isotope", "neutron", "nuclear", "proton", "science", "space" ]
        }, {
            title: "fal fa-atom-alt",
            searchTerms: [ "atheism", "chemistry", "electron", "ion", "isotope", "neutron", "nuclear", "proton", "science", "space" ]
        }, {
            title: "fab fa-audible",
            searchTerms: []
        }, {
            title: "fas fa-audio-description",
            searchTerms: [ "blind", "narration", "video", "visual" ]
        }, {
            title: "far fa-audio-description",
            searchTerms: [ "blind", "narration", "video", "visual" ]
        }, {
            title: "fal fa-audio-description",
            searchTerms: [ "blind", "narration", "video", "visual" ]
        }, {
            title: "fab fa-autoprefixer",
            searchTerms: []
        }, {
            title: "fab fa-avianex",
            searchTerms: []
        }, {
            title: "fab fa-aviato",
            searchTerms: []
        }, {
            title: "fas fa-award",
            searchTerms: [ "honor", "praise", "prize", "recognition", "ribbon", "trophy" ]
        }, {
            title: "far fa-award",
            searchTerms: [ "honor", "praise", "prize", "recognition", "ribbon", "trophy" ]
        }, {
            title: "fal fa-award",
            searchTerms: [ "honor", "praise", "prize", "recognition", "ribbon", "trophy" ]
        }, {
            title: "fab fa-aws",
            searchTerms: []
        }, {
            title: "fas fa-axe",
            searchTerms: [ "blade", "cut", "fall", "lumberjack", "outdoors", "sharp", "swing", "tool", "weapon" ]
        }, {
            title: "far fa-axe",
            searchTerms: [ "blade", "cut", "fall", "lumberjack", "outdoors", "sharp", "swing", "tool", "weapon" ]
        }, {
            title: "fal fa-axe",
            searchTerms: [ "blade", "cut", "fall", "lumberjack", "outdoors", "sharp", "swing", "tool", "weapon" ]
        }, {
            title: "fas fa-axe-battle",
            searchTerms: [ "Dungeons & Dragons", "barbarian", "d&d", "dnd", "fantasy", "gimli", "lumberjack", "melee attack" ]
        }, {
            title: "far fa-axe-battle",
            searchTerms: [ "Dungeons & Dragons", "barbarian", "d&d", "dnd", "fantasy", "gimli", "lumberjack", "melee attack" ]
        }, {
            title: "fal fa-axe-battle",
            searchTerms: [ "Dungeons & Dragons", "barbarian", "d&d", "dnd", "fantasy", "gimli", "lumberjack", "melee attack" ]
        }, {
            title: "fas fa-baby",
            searchTerms: [ "child", "diaper", "doll", "human", "infant", "kid", "offspring", "person", "sprout" ]
        }, {
            title: "far fa-baby",
            searchTerms: [ "child", "diaper", "doll", "human", "infant", "kid", "offspring", "person", "sprout" ]
        }, {
            title: "fal fa-baby",
            searchTerms: [ "child", "diaper", "doll", "human", "infant", "kid", "offspring", "person", "sprout" ]
        }, {
            title: "fas fa-baby-carriage",
            searchTerms: [ "buggy", "carrier", "infant", "push", "stroller", "transportation", "walk", "wheels" ]
        }, {
            title: "far fa-baby-carriage",
            searchTerms: [ "buggy", "carrier", "infant", "push", "stroller", "transportation", "walk", "wheels" ]
        }, {
            title: "fal fa-baby-carriage",
            searchTerms: [ "buggy", "carrier", "infant", "push", "stroller", "transportation", "walk", "wheels" ]
        }, {
            title: "fas fa-backpack",
            searchTerms: [ "bag", "book", "carry", "hiking", "school", "travel" ]
        }, {
            title: "far fa-backpack",
            searchTerms: [ "bag", "book", "carry", "hiking", "school", "travel" ]
        }, {
            title: "fal fa-backpack",
            searchTerms: [ "bag", "book", "carry", "hiking", "school", "travel" ]
        }, {
            title: "fas fa-backspace",
            searchTerms: [ "command", "delete", "erase", "keyboard", "undo" ]
        }, {
            title: "far fa-backspace",
            searchTerms: [ "command", "delete", "erase", "keyboard", "undo" ]
        }, {
            title: "fal fa-backspace",
            searchTerms: [ "command", "delete", "erase", "keyboard", "undo" ]
        }, {
            title: "fas fa-backward",
            searchTerms: [ "previous", "rewind" ]
        }, {
            title: "far fa-backward",
            searchTerms: [ "previous", "rewind" ]
        }, {
            title: "fal fa-backward",
            searchTerms: [ "previous", "rewind" ]
        }, {
            title: "fas fa-bacon",
            searchTerms: [ "blt", "breakfast", "ham", "lard", "meat", "pancetta", "pork", "rasher" ]
        }, {
            title: "far fa-bacon",
            searchTerms: [ "blt", "breakfast", "ham", "lard", "meat", "pancetta", "pork", "rasher" ]
        }, {
            title: "fal fa-bacon",
            searchTerms: [ "blt", "breakfast", "ham", "lard", "meat", "pancetta", "pork", "rasher" ]
        }, {
            title: "fas fa-badge",
            searchTerms: [ "discount", "meatball", "verified", "verify" ]
        }, {
            title: "far fa-badge",
            searchTerms: [ "discount", "meatball", "verified", "verify" ]
        }, {
            title: "fal fa-badge",
            searchTerms: [ "discount", "meatball", "verified", "verify" ]
        }, {
            title: "fas fa-badge-check",
            searchTerms: [ "accept", "achievement", "agree", "award", "confirm", "correct", "done", "ok", "security", "select", "success", "verified", "verify", "winner", "yes" ]
        }, {
            title: "far fa-badge-check",
            searchTerms: [ "accept", "achievement", "agree", "award", "confirm", "correct", "done", "ok", "security", "select", "success", "verified", "verify", "winner", "yes" ]
        }, {
            title: "fal fa-badge-check",
            searchTerms: [ "accept", "achievement", "agree", "award", "confirm", "correct", "done", "ok", "security", "select", "success", "verified", "verify", "winner", "yes" ]
        }, {
            title: "fas fa-badge-dollar",
            searchTerms: [ "deal", "discount", "money", "save", "usd" ]
        }, {
            title: "far fa-badge-dollar",
            searchTerms: [ "deal", "discount", "money", "save", "usd" ]
        }, {
            title: "fal fa-badge-dollar",
            searchTerms: [ "deal", "discount", "money", "save", "usd" ]
        }, {
            title: "fas fa-badge-percent",
            searchTerms: [ "deal", "discount", "money", "save", "usd" ]
        }, {
            title: "far fa-badge-percent",
            searchTerms: [ "deal", "discount", "money", "save", "usd" ]
        }, {
            title: "fal fa-badge-percent",
            searchTerms: [ "deal", "discount", "money", "save", "usd" ]
        }, {
            title: "fal fa-badge-sheriff",
            searchTerms: [ "cowboy", "justice", "law", "old west", "western" ]
        }, {
            title: "far fa-badge-sheriff",
            searchTerms: [ "cowboy", "justice", "law", "old west", "western" ]
        }, {
            title: "fas fa-badge-sheriff",
            searchTerms: [ "cowboy", "justice", "law", "old west", "western" ]
        }, {
            title: "fas fa-badger-honey",
            searchTerms: [ "animal", "care", "dont", "ewww", "fauna", "mammal", "nasty" ]
        }, {
            title: "far fa-badger-honey",
            searchTerms: [ "animal", "care", "dont", "ewww", "fauna", "mammal", "nasty" ]
        }, {
            title: "fal fa-badger-honey",
            searchTerms: [ "animal", "care", "dont", "ewww", "fauna", "mammal", "nasty" ]
        }, {
            title: "fas fa-bags-shopping",
            searchTerms: [ "buy", "checkout", "order", "shopping", "store" ]
        }, {
            title: "far fa-bags-shopping",
            searchTerms: [ "buy", "checkout", "order", "shopping", "store" ]
        }, {
            title: "fal fa-bags-shopping",
            searchTerms: [ "buy", "checkout", "order", "shopping", "store" ]
        }, {
            title: "fas fa-bahai",
            searchTerms: [ "bahai", "bahá'í", "star" ]
        }, {
            title: "far fa-bahai",
            searchTerms: [ "bahai", "bahá'í", "star" ]
        }, {
            title: "fal fa-bahai",
            searchTerms: [ "bahai", "bahá'í", "star" ]
        }, {
            title: "fas fa-balance-scale",
            searchTerms: [ "balanced", "justice", "legal", "measure", "weight" ]
        }, {
            title: "far fa-balance-scale",
            searchTerms: [ "balanced", "justice", "legal", "measure", "weight" ]
        }, {
            title: "fal fa-balance-scale",
            searchTerms: [ "balanced", "justice", "legal", "measure", "weight" ]
        }, {
            title: "fas fa-balance-scale-left",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "far fa-balance-scale-left",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fal fa-balance-scale-left",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fas fa-balance-scale-right",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "far fa-balance-scale-right",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fal fa-balance-scale-right",
            searchTerms: [ "justice", "legal", "measure", "unbalanced", "weight" ]
        }, {
            title: "fas fa-ball-pile",
            searchTerms: [ "balance", "cannon", "group", "pyramid", "snowball" ]
        }, {
            title: "far fa-ball-pile",
            searchTerms: [ "balance", "cannon", "group", "pyramid", "snowball" ]
        }, {
            title: "fal fa-ball-pile",
            searchTerms: [ "balance", "cannon", "group", "pyramid", "snowball" ]
        }, {
            title: "fas fa-ballot",
            searchTerms: [ "checklist", "choice", "election", "vote", "voting" ]
        }, {
            title: "far fa-ballot",
            searchTerms: [ "checklist", "choice", "election", "vote", "voting" ]
        }, {
            title: "fal fa-ballot",
            searchTerms: [ "checklist", "choice", "election", "vote", "voting" ]
        }, {
            title: "fas fa-ballot-check",
            searchTerms: [ "checklist", "choice", "completed", "done", "election", "finished", "select", "success", "tick", "vote", "voting" ]
        }, {
            title: "far fa-ballot-check",
            searchTerms: [ "checklist", "choice", "completed", "done", "election", "finished", "select", "success", "tick", "vote", "voting" ]
        }, {
            title: "fal fa-ballot-check",
            searchTerms: [ "checklist", "choice", "completed", "done", "election", "finished", "select", "success", "tick", "vote", "voting" ]
        }, {
            title: "fas fa-ban",
            searchTerms: [ "abort", "ban", "block", "cancel", "delete", "hide", "prohibit", "remove", "stop", "trash" ]
        }, {
            title: "far fa-ban",
            searchTerms: [ "abort", "ban", "block", "cancel", "delete", "hide", "prohibit", "remove", "stop", "trash" ]
        }, {
            title: "fal fa-ban",
            searchTerms: [ "abort", "ban", "block", "cancel", "delete", "hide", "prohibit", "remove", "stop", "trash" ]
        }, {
            title: "fas fa-band-aid",
            searchTerms: [ "bandage", "boo boo", "first aid", "ouch" ]
        }, {
            title: "far fa-band-aid",
            searchTerms: [ "bandage", "boo boo", "first aid", "ouch" ]
        }, {
            title: "fal fa-band-aid",
            searchTerms: [ "bandage", "boo boo", "first aid", "ouch" ]
        }, {
            title: "fab fa-bandcamp",
            searchTerms: []
        }, {
            title: "fas fa-banjo",
            searchTerms: [ "bluegrass", "folk", "guitar", "instrument", "jazz", "music" ]
        }, {
            title: "far fa-banjo",
            searchTerms: [ "bluegrass", "folk", "guitar", "instrument", "jazz", "music" ]
        }, {
            title: "fal fa-banjo",
            searchTerms: [ "bluegrass", "folk", "guitar", "instrument", "jazz", "music" ]
        }, {
            title: "fas fa-barcode",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "far fa-barcode",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "fal fa-barcode",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "fas fa-barcode-alt",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "far fa-barcode-alt",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "fal fa-barcode-alt",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "fas fa-barcode-read",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "far fa-barcode-read",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "fal fa-barcode-read",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "fas fa-barcode-scan",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "far fa-barcode-scan",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "fal fa-barcode-scan",
            searchTerms: [ "info", "laser", "price", "scan", "upc" ]
        }, {
            title: "fas fa-bars",
            searchTerms: [ "checklist", "drag", "hamburger", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "todo", "ul" ]
        }, {
            title: "far fa-bars",
            searchTerms: [ "checklist", "drag", "hamburger", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "todo", "ul" ]
        }, {
            title: "fal fa-bars",
            searchTerms: [ "checklist", "drag", "hamburger", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "todo", "ul" ]
        }, {
            title: "fas fa-baseball",
            searchTerms: [ "bat", "league", "mlb", "slugger", "softball", "sport" ]
        }, {
            title: "far fa-baseball",
            searchTerms: [ "bat", "league", "mlb", "slugger", "softball", "sport" ]
        }, {
            title: "fal fa-baseball",
            searchTerms: [ "bat", "league", "mlb", "slugger", "softball", "sport" ]
        }, {
            title: "fas fa-baseball-ball",
            searchTerms: [ "foul", "hardball", "league", "leather", "mlb", "softball", "sport" ]
        }, {
            title: "far fa-baseball-ball",
            searchTerms: [ "foul", "hardball", "league", "leather", "mlb", "softball", "sport" ]
        }, {
            title: "fal fa-baseball-ball",
            searchTerms: [ "foul", "hardball", "league", "leather", "mlb", "softball", "sport" ]
        }, {
            title: "fas fa-basketball-ball",
            searchTerms: [ "dribble", "dunk", "hoop", "nba" ]
        }, {
            title: "far fa-basketball-ball",
            searchTerms: [ "dribble", "dunk", "hoop", "nba" ]
        }, {
            title: "fal fa-basketball-ball",
            searchTerms: [ "dribble", "dunk", "hoop", "nba" ]
        }, {
            title: "fas fa-basketball-hoop",
            searchTerms: [ "backboard", "dunk", "hoop", "nba" ]
        }, {
            title: "far fa-basketball-hoop",
            searchTerms: [ "backboard", "dunk", "hoop", "nba" ]
        }, {
            title: "fal fa-basketball-hoop",
            searchTerms: [ "backboard", "dunk", "hoop", "nba" ]
        }, {
            title: "fas fa-bat",
            searchTerms: [ "animal", "batman", "bruce wayne", "flying", "gotham", "halloween", "mammal", "vampire", "wings" ]
        }, {
            title: "far fa-bat",
            searchTerms: [ "animal", "batman", "bruce wayne", "flying", "gotham", "halloween", "mammal", "vampire", "wings" ]
        }, {
            title: "fal fa-bat",
            searchTerms: [ "animal", "batman", "bruce wayne", "flying", "gotham", "halloween", "mammal", "vampire", "wings" ]
        }, {
            title: "fas fa-bath",
            searchTerms: [ "clean", "shower", "tub", "wash" ]
        }, {
            title: "far fa-bath",
            searchTerms: [ "clean", "shower", "tub", "wash" ]
        }, {
            title: "fal fa-bath",
            searchTerms: [ "clean", "shower", "tub", "wash" ]
        }, {
            title: "fas fa-battery-bolt",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "far fa-battery-bolt",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fal fa-battery-bolt",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fas fa-battery-empty",
            searchTerms: [ "charge", "dead", "power", "status" ]
        }, {
            title: "far fa-battery-empty",
            searchTerms: [ "charge", "dead", "power", "status" ]
        }, {
            title: "fal fa-battery-empty",
            searchTerms: [ "charge", "dead", "power", "status" ]
        }, {
            title: "fas fa-battery-full",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "far fa-battery-full",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fal fa-battery-full",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fas fa-battery-half",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "far fa-battery-half",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fal fa-battery-half",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fas fa-battery-quarter",
            searchTerms: [ "charge", "low", "power", "status" ]
        }, {
            title: "far fa-battery-quarter",
            searchTerms: [ "charge", "low", "power", "status" ]
        }, {
            title: "fal fa-battery-quarter",
            searchTerms: [ "charge", "low", "power", "status" ]
        }, {
            title: "fas fa-battery-slash",
            searchTerms: [ "charge", "dead", "power", "status" ]
        }, {
            title: "far fa-battery-slash",
            searchTerms: [ "charge", "dead", "power", "status" ]
        }, {
            title: "fal fa-battery-slash",
            searchTerms: [ "charge", "dead", "power", "status" ]
        }, {
            title: "fas fa-battery-three-quarters",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "far fa-battery-three-quarters",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fal fa-battery-three-quarters",
            searchTerms: [ "charge", "power", "status" ]
        }, {
            title: "fab fa-battle-net",
            searchTerms: []
        }, {
            title: "fas fa-bed",
            searchTerms: [ "lodging", "mattress", "rest", "sleep", "travel" ]
        }, {
            title: "far fa-bed",
            searchTerms: [ "lodging", "mattress", "rest", "sleep", "travel" ]
        }, {
            title: "fal fa-bed",
            searchTerms: [ "lodging", "mattress", "rest", "sleep", "travel" ]
        }, {
            title: "fas fa-bed-alt",
            searchTerms: [ "double", "king", "lodging", "mattress", "pillows", "queen", "rest", "sleep", "travel" ]
        }, {
            title: "far fa-bed-alt",
            searchTerms: [ "double", "king", "lodging", "mattress", "pillows", "queen", "rest", "sleep", "travel" ]
        }, {
            title: "fal fa-bed-alt",
            searchTerms: [ "double", "king", "lodging", "mattress", "pillows", "queen", "rest", "sleep", "travel" ]
        }, {
            title: "fas fa-bed-bunk",
            searchTerms: [ "lodging", "mattress", "rest", "siblings", "sleep", "sleepover", "travel" ]
        }, {
            title: "far fa-bed-bunk",
            searchTerms: [ "lodging", "mattress", "rest", "siblings", "sleep", "sleepover", "travel" ]
        }, {
            title: "fal fa-bed-bunk",
            searchTerms: [ "lodging", "mattress", "rest", "siblings", "sleep", "sleepover", "travel" ]
        }, {
            title: "fas fa-bed-empty",
            searchTerms: [ "lodging", "mattress", "rest", "sleep", "travel" ]
        }, {
            title: "far fa-bed-empty",
            searchTerms: [ "lodging", "mattress", "rest", "sleep", "travel" ]
        }, {
            title: "fal fa-bed-empty",
            searchTerms: [ "lodging", "mattress", "rest", "sleep", "travel" ]
        }, {
            title: "fas fa-beer",
            searchTerms: [ "alcohol", "ale", "bar", "beverage", "brewery", "drink", "lager", "liquor", "mug", "stein" ]
        }, {
            title: "far fa-beer",
            searchTerms: [ "alcohol", "ale", "bar", "beverage", "brewery", "drink", "lager", "liquor", "mug", "stein" ]
        }, {
            title: "fal fa-beer",
            searchTerms: [ "alcohol", "ale", "bar", "beverage", "brewery", "drink", "lager", "liquor", "mug", "stein" ]
        }, {
            title: "fab fa-behance",
            searchTerms: []
        }, {
            title: "fab fa-behance-square",
            searchTerms: []
        }, {
            title: "fas fa-bell",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "far fa-bell",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "fal fa-bell",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "fas fa-bell-exclamation",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "far fa-bell-exclamation",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "fal fa-bell-exclamation",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "fas fa-bell-on",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "far fa-bell-on",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "fal fa-bell-on",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "fas fa-bell-plus",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "far fa-bell-plus",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "fal fa-bell-plus",
            searchTerms: [ "alarm", "alert", "chime", "notification", "reminder" ]
        }, {
            title: "fas fa-bell-school",
            searchTerms: [ "alert", "chime", "class", "notification", "reminder" ]
        }, {
            title: "far fa-bell-school",
            searchTerms: [ "alert", "chime", "class", "notification", "reminder" ]
        }, {
            title: "fal fa-bell-school",
            searchTerms: [ "alert", "chime", "class", "notification", "reminder" ]
        }, {
            title: "fas fa-bell-school-slash",
            searchTerms: [ "alert", "cancel", "class", "disabled", "notification", "off", "reminder" ]
        }, {
            title: "far fa-bell-school-slash",
            searchTerms: [ "alert", "cancel", "class", "disabled", "notification", "off", "reminder" ]
        }, {
            title: "fal fa-bell-school-slash",
            searchTerms: [ "alert", "cancel", "class", "disabled", "notification", "off", "reminder" ]
        }, {
            title: "fas fa-bell-slash",
            searchTerms: [ "alert", "cancel", "disabled", "notification", "off", "reminder" ]
        }, {
            title: "far fa-bell-slash",
            searchTerms: [ "alert", "cancel", "disabled", "notification", "off", "reminder" ]
        }, {
            title: "fal fa-bell-slash",
            searchTerms: [ "alert", "cancel", "disabled", "notification", "off", "reminder" ]
        }, {
            title: "fas fa-bells",
            searchTerms: [ "alert", "christmas", "holiday", "notification", "reminder", "xmas" ]
        }, {
            title: "far fa-bells",
            searchTerms: [ "alert", "christmas", "holiday", "notification", "reminder", "xmas" ]
        }, {
            title: "fal fa-bells",
            searchTerms: [ "alert", "christmas", "holiday", "notification", "reminder", "xmas" ]
        }, {
            title: "fas fa-betamax",
            searchTerms: [ "cassette", "rental", "retro", "tape", "vhs", "video", "vintage" ]
        }, {
            title: "far fa-betamax",
            searchTerms: [ "cassette", "rental", "retro", "tape", "vhs", "video", "vintage" ]
        }, {
            title: "fal fa-betamax",
            searchTerms: [ "cassette", "rental", "retro", "tape", "vhs", "video", "vintage" ]
        }, {
            title: "fas fa-bezier-curve",
            searchTerms: [ "curves", "illustrator", "lines", "path", "vector" ]
        }, {
            title: "far fa-bezier-curve",
            searchTerms: [ "curves", "illustrator", "lines", "path", "vector" ]
        }, {
            title: "fal fa-bezier-curve",
            searchTerms: [ "curves", "illustrator", "lines", "path", "vector" ]
        }, {
            title: "fas fa-bible",
            searchTerms: [ "book", "catholicism", "christianity", "god", "holy" ]
        }, {
            title: "far fa-bible",
            searchTerms: [ "book", "catholicism", "christianity", "god", "holy" ]
        }, {
            title: "fal fa-bible",
            searchTerms: [ "book", "catholicism", "christianity", "god", "holy" ]
        }, {
            title: "fas fa-bicycle",
            searchTerms: [ "bike", "gears", "pedal", "transportation", "vehicle" ]
        }, {
            title: "far fa-bicycle",
            searchTerms: [ "bike", "gears", "pedal", "transportation", "vehicle" ]
        }, {
            title: "fal fa-bicycle",
            searchTerms: [ "bike", "gears", "pedal", "transportation", "vehicle" ]
        }, {
            title: "fas fa-biking",
            searchTerms: [ "bicycle", "bike", "cycle", "cycling", "ride", "wheel" ]
        }, {
            title: "far fa-biking",
            searchTerms: [ "bicycle", "bike", "cycle", "cycling", "ride", "wheel" ]
        }, {
            title: "fal fa-biking",
            searchTerms: [ "bicycle", "bike", "cycle", "cycling", "ride", "wheel" ]
        }, {
            title: "fas fa-biking-mountain",
            searchTerms: [ "bicycle", "bike", "cycle", "cycling", "offroad", "ride", "trail", "wheel" ]
        }, {
            title: "far fa-biking-mountain",
            searchTerms: [ "bicycle", "bike", "cycle", "cycling", "offroad", "ride", "trail", "wheel" ]
        }, {
            title: "fal fa-biking-mountain",
            searchTerms: [ "bicycle", "bike", "cycle", "cycling", "offroad", "ride", "trail", "wheel" ]
        }, {
            title: "fab fa-bimobject",
            searchTerms: []
        }, {
            title: "fas fa-binoculars",
            searchTerms: [ "glasses", "magnify", "scenic", "spyglass", "view" ]
        }, {
            title: "far fa-binoculars",
            searchTerms: [ "glasses", "magnify", "scenic", "spyglass", "view" ]
        }, {
            title: "fal fa-binoculars",
            searchTerms: [ "glasses", "magnify", "scenic", "spyglass", "view" ]
        }, {
            title: "fas fa-biohazard",
            searchTerms: [ "danger", "dangerous", "hazmat", "medical", "radioactive", "toxic", "waste", "zombie" ]
        }, {
            title: "far fa-biohazard",
            searchTerms: [ "danger", "dangerous", "hazmat", "medical", "radioactive", "toxic", "waste", "zombie" ]
        }, {
            title: "fal fa-biohazard",
            searchTerms: [ "danger", "dangerous", "hazmat", "medical", "radioactive", "toxic", "waste", "zombie" ]
        }, {
            title: "fas fa-birthday-cake",
            searchTerms: [ "anniversary", "bakery", "candles", "celebration", "dessert", "frosting", "holiday", "party", "pastry" ]
        }, {
            title: "far fa-birthday-cake",
            searchTerms: [ "anniversary", "bakery", "candles", "celebration", "dessert", "frosting", "holiday", "party", "pastry" ]
        }, {
            title: "fal fa-birthday-cake",
            searchTerms: [ "anniversary", "bakery", "candles", "celebration", "dessert", "frosting", "holiday", "party", "pastry" ]
        }, {
            title: "fab fa-bitbucket",
            searchTerms: [ "atlassian", "bitbucket-square", "git" ]
        }, {
            title: "fab fa-bitcoin",
            searchTerms: []
        }, {
            title: "fab fa-bity",
            searchTerms: []
        }, {
            title: "fab fa-black-tie",
            searchTerms: []
        }, {
            title: "fab fa-blackberry",
            searchTerms: []
        }, {
            title: "fas fa-blanket",
            searchTerms: [ "bed", "cover", "cozy", "sleep", "warm" ]
        }, {
            title: "far fa-blanket",
            searchTerms: [ "bed", "cover", "cozy", "sleep", "warm" ]
        }, {
            title: "fal fa-blanket",
            searchTerms: [ "bed", "cover", "cozy", "sleep", "warm" ]
        }, {
            title: "fas fa-blender",
            searchTerms: [ "cocktail", "milkshake", "mixer", "puree", "smoothie" ]
        }, {
            title: "far fa-blender",
            searchTerms: [ "cocktail", "milkshake", "mixer", "puree", "smoothie" ]
        }, {
            title: "fal fa-blender",
            searchTerms: [ "cocktail", "milkshake", "mixer", "puree", "smoothie" ]
        }, {
            title: "fas fa-blender-phone",
            searchTerms: [ "appliance", "cocktail", "communication", "fantasy", "milkshake", "mixer", "puree", "silly", "smoothie" ]
        }, {
            title: "far fa-blender-phone",
            searchTerms: [ "appliance", "cocktail", "communication", "fantasy", "milkshake", "mixer", "puree", "silly", "smoothie" ]
        }, {
            title: "fal fa-blender-phone",
            searchTerms: [ "appliance", "cocktail", "communication", "fantasy", "milkshake", "mixer", "puree", "silly", "smoothie" ]
        }, {
            title: "fas fa-blind",
            searchTerms: [ "cane", "disability", "person", "sight" ]
        }, {
            title: "far fa-blind",
            searchTerms: [ "cane", "disability", "person", "sight" ]
        }, {
            title: "fal fa-blind",
            searchTerms: [ "cane", "disability", "person", "sight" ]
        }, {
            title: "fas fa-blinds",
            searchTerms: [ "privacy", "shutter", "window" ]
        }, {
            title: "far fa-blinds",
            searchTerms: [ "privacy", "shutter", "window" ]
        }, {
            title: "fal fa-blinds",
            searchTerms: [ "privacy", "shutter", "window" ]
        }, {
            title: "fas fa-blinds-open",
            searchTerms: [ "privacy", "shutter", "window" ]
        }, {
            title: "far fa-blinds-open",
            searchTerms: [ "privacy", "shutter", "window" ]
        }, {
            title: "fal fa-blinds-open",
            searchTerms: [ "privacy", "shutter", "window" ]
        }, {
            title: "fas fa-blinds-raised",
            searchTerms: [ "privacy", "shutter", "window" ]
        }, {
            title: "far fa-blinds-raised",
            searchTerms: [ "privacy", "shutter", "window" ]
        }, {
            title: "fal fa-blinds-raised",
            searchTerms: [ "privacy", "shutter", "window" ]
        }, {
            title: "fas fa-blog",
            searchTerms: [ "journal", "log", "online", "personal", "post", "web 2.0", "wordpress", "writing" ]
        }, {
            title: "far fa-blog",
            searchTerms: [ "journal", "log", "online", "personal", "post", "web 2.0", "wordpress", "writing" ]
        }, {
            title: "fal fa-blog",
            searchTerms: [ "journal", "log", "online", "personal", "post", "web 2.0", "wordpress", "writing" ]
        }, {
            title: "fab fa-blogger",
            searchTerms: []
        }, {
            title: "fab fa-blogger-b",
            searchTerms: []
        }, {
            title: "fab fa-bluetooth",
            searchTerms: []
        }, {
            title: "fab fa-bluetooth-b",
            searchTerms: []
        }, {
            title: "fas fa-bold",
            searchTerms: [ "emphasis", "format", "text" ]
        }, {
            title: "far fa-bold",
            searchTerms: [ "emphasis", "format", "text" ]
        }, {
            title: "fal fa-bold",
            searchTerms: [ "emphasis", "format", "text" ]
        }, {
            title: "fas fa-bolt",
            searchTerms: [ "electricity", "lightning", "weather", "zap" ]
        }, {
            title: "far fa-bolt",
            searchTerms: [ "electricity", "lightning", "weather", "zap" ]
        }, {
            title: "fal fa-bolt",
            searchTerms: [ "electricity", "lightning", "weather", "zap" ]
        }, {
            title: "fas fa-bomb",
            searchTerms: [ "error", "explode", "fuse", "grenade", "warning" ]
        }, {
            title: "far fa-bomb",
            searchTerms: [ "error", "explode", "fuse", "grenade", "warning" ]
        }, {
            title: "fal fa-bomb",
            searchTerms: [ "error", "explode", "fuse", "grenade", "warning" ]
        }, {
            title: "fas fa-bone",
            searchTerms: [ "calcium", "dog", "skeletal", "skeleton", "tibia" ]
        }, {
            title: "far fa-bone",
            searchTerms: [ "calcium", "dog", "skeletal", "skeleton", "tibia" ]
        }, {
            title: "fal fa-bone",
            searchTerms: [ "calcium", "dog", "skeletal", "skeleton", "tibia" ]
        }, {
            title: "fas fa-bone-break",
            searchTerms: [ "broken", "calcium", "dog", "fracture", "skeletal", "skeleton", "tibia" ]
        }, {
            title: "far fa-bone-break",
            searchTerms: [ "broken", "calcium", "dog", "fracture", "skeletal", "skeleton", "tibia" ]
        }, {
            title: "fal fa-bone-break",
            searchTerms: [ "broken", "calcium", "dog", "fracture", "skeletal", "skeleton", "tibia" ]
        }, {
            title: "fas fa-bong",
            searchTerms: [ "aparatus", "cannabis", "marijuana", "pipe", "smoke", "smoking" ]
        }, {
            title: "far fa-bong",
            searchTerms: [ "aparatus", "cannabis", "marijuana", "pipe", "smoke", "smoking" ]
        }, {
            title: "fal fa-bong",
            searchTerms: [ "aparatus", "cannabis", "marijuana", "pipe", "smoke", "smoking" ]
        }, {
            title: "fas fa-book",
            searchTerms: [ "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "far fa-book",
            searchTerms: [ "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "fal fa-book",
            searchTerms: [ "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "fas fa-book-alt",
            searchTerms: [ "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "far fa-book-alt",
            searchTerms: [ "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "fal fa-book-alt",
            searchTerms: [ "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "fas fa-book-dead",
            searchTerms: [ "Dungeons & Dragons", "crossbones", "d&d", "dark arts", "death", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "necronomicon", "read", "skull", "spell" ]
        }, {
            title: "far fa-book-dead",
            searchTerms: [ "Dungeons & Dragons", "crossbones", "d&d", "dark arts", "death", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "necronomicon", "read", "skull", "spell" ]
        }, {
            title: "fal fa-book-dead",
            searchTerms: [ "Dungeons & Dragons", "crossbones", "d&d", "dark arts", "death", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "necronomicon", "read", "skull", "spell" ]
        }, {
            title: "fas fa-book-heart",
            searchTerms: [ "charity", "diary", "documentation", "donation", "health", "history", "journal", "library", "read" ]
        }, {
            title: "far fa-book-heart",
            searchTerms: [ "charity", "diary", "documentation", "donation", "health", "history", "journal", "library", "read" ]
        }, {
            title: "fal fa-book-heart",
            searchTerms: [ "charity", "diary", "documentation", "donation", "health", "history", "journal", "library", "read" ]
        }, {
            title: "fas fa-book-medical",
            searchTerms: [ "diary", "documentation", "health", "history", "journal", "library", "read", "record" ]
        }, {
            title: "far fa-book-medical",
            searchTerms: [ "diary", "documentation", "health", "history", "journal", "library", "read", "record" ]
        }, {
            title: "fal fa-book-medical",
            searchTerms: [ "diary", "documentation", "health", "history", "journal", "library", "read", "record" ]
        }, {
            title: "fas fa-book-open",
            searchTerms: [ "flyer", "library", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "far fa-book-open",
            searchTerms: [ "flyer", "library", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "fal fa-book-open",
            searchTerms: [ "flyer", "library", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "fas fa-book-reader",
            searchTerms: [ "flyer", "library", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "far fa-book-reader",
            searchTerms: [ "flyer", "library", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "fal fa-book-reader",
            searchTerms: [ "flyer", "library", "notebook", "open book", "pamphlet", "reading" ]
        }, {
            title: "fas fa-book-spells",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dark arts", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "mage", "magic", "read", "sorcery", "voodoo", "witch", "wizard" ]
        }, {
            title: "far fa-book-spells",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dark arts", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "mage", "magic", "read", "sorcery", "voodoo", "witch", "wizard" ]
        }, {
            title: "fal fa-book-spells",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dark arts", "dnd", "documentation", "evil", "fantasy", "halloween", "holiday", "mage", "magic", "read", "sorcery", "voodoo", "witch", "wizard" ]
        }, {
            title: "fas fa-book-user",
            searchTerms: [ "address", "biography", "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "far fa-book-user",
            searchTerms: [ "address", "biography", "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "fal fa-book-user",
            searchTerms: [ "address", "biography", "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "fas fa-bookmark",
            searchTerms: [ "favorite", "marker", "read", "remember", "save" ]
        }, {
            title: "far fa-bookmark",
            searchTerms: [ "favorite", "marker", "read", "remember", "save" ]
        }, {
            title: "fal fa-bookmark",
            searchTerms: [ "favorite", "marker", "read", "remember", "save" ]
        }, {
            title: "fas fa-books",
            searchTerms: [ "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "far fa-books",
            searchTerms: [ "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "fal fa-books",
            searchTerms: [ "diary", "documentation", "journal", "library", "read" ]
        }, {
            title: "fas fa-books-medical",
            searchTerms: [ "add", "diary", "documentation", "health", "journal", "library", "read", "records" ]
        }, {
            title: "far fa-books-medical",
            searchTerms: [ "add", "diary", "documentation", "health", "journal", "library", "read", "records" ]
        }, {
            title: "fal fa-books-medical",
            searchTerms: [ "add", "diary", "documentation", "health", "journal", "library", "read", "records" ]
        }, {
            title: "fas fa-boombox",
            searchTerms: [ "cassette", "jambox", "john cusack", "music", "radio", "say anything" ]
        }, {
            title: "far fa-boombox",
            searchTerms: [ "cassette", "jambox", "john cusack", "music", "radio", "say anything" ]
        }, {
            title: "fal fa-boombox",
            searchTerms: [ "cassette", "jambox", "john cusack", "music", "radio", "say anything" ]
        }, {
            title: "fas fa-boot",
            searchTerms: [ "clothing", "foot", "hiking", "shoe", "sturdy" ]
        }, {
            title: "far fa-boot",
            searchTerms: [ "clothing", "foot", "hiking", "shoe", "sturdy" ]
        }, {
            title: "fal fa-boot",
            searchTerms: [ "clothing", "foot", "hiking", "shoe", "sturdy" ]
        }, {
            title: "fas fa-booth-curtain",
            searchTerms: [ "changing room", "election", "vote", "voting", "voting booth" ]
        }, {
            title: "far fa-booth-curtain",
            searchTerms: [ "changing room", "election", "vote", "voting", "voting booth" ]
        }, {
            title: "fal fa-booth-curtain",
            searchTerms: [ "changing room", "election", "vote", "voting", "voting booth" ]
        }, {
            title: "fab fa-bootstrap",
            searchTerms: []
        }, {
            title: "fas fa-border-all",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-all",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-all",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-border-bottom",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-bottom",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-bottom",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-border-center-h",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-center-h",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-center-h",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-border-center-v",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-center-v",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-center-v",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-border-inner",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-inner",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-inner",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-border-left",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-left",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-left",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-border-none",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-none",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-none",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-border-outer",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-outer",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-outer",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-border-right",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-right",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-right",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-border-style",
            searchTerms: []
        }, {
            title: "far fa-border-style",
            searchTerms: []
        }, {
            title: "fal fa-border-style",
            searchTerms: []
        }, {
            title: "fas fa-border-style-alt",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-style-alt",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-style-alt",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-border-top",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "far fa-border-top",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fal fa-border-top",
            searchTerms: [ "cell", "grid", "outline", "stroke", "table" ]
        }, {
            title: "fas fa-bow-arrow",
            searchTerms: [ "Dungeons & Dragons", "archery", "d&d", "dnd", "fantasy", "legolas", "ranged attack", "ranger", "weapon" ]
        }, {
            title: "far fa-bow-arrow",
            searchTerms: [ "Dungeons & Dragons", "archery", "d&d", "dnd", "fantasy", "legolas", "ranged attack", "ranger", "weapon" ]
        }, {
            title: "fal fa-bow-arrow",
            searchTerms: [ "Dungeons & Dragons", "archery", "d&d", "dnd", "fantasy", "legolas", "ranged attack", "ranger", "weapon" ]
        }, {
            title: "fas fa-bowling-ball",
            searchTerms: [ "alley", "candlepin", "gutter", "lane", "strike", "tenpin" ]
        }, {
            title: "far fa-bowling-ball",
            searchTerms: [ "alley", "candlepin", "gutter", "lane", "strike", "tenpin" ]
        }, {
            title: "fal fa-bowling-ball",
            searchTerms: [ "alley", "candlepin", "gutter", "lane", "strike", "tenpin" ]
        }, {
            title: "fas fa-bowling-pins",
            searchTerms: [ "alley", "candlepin", "gutter", "lane", "strike", "tenpin" ]
        }, {
            title: "far fa-bowling-pins",
            searchTerms: [ "alley", "candlepin", "gutter", "lane", "strike", "tenpin" ]
        }, {
            title: "fal fa-bowling-pins",
            searchTerms: [ "alley", "candlepin", "gutter", "lane", "strike", "tenpin" ]
        }, {
            title: "fas fa-box",
            searchTerms: [ "archive", "container", "package", "storage" ]
        }, {
            title: "far fa-box",
            searchTerms: [ "archive", "container", "package", "storage" ]
        }, {
            title: "fal fa-box",
            searchTerms: [ "archive", "container", "package", "storage" ]
        }, {
            title: "fas fa-box-alt",
            searchTerms: [ "archive", "container", "package", "storage" ]
        }, {
            title: "far fa-box-alt",
            searchTerms: [ "archive", "container", "package", "storage" ]
        }, {
            title: "fal fa-box-alt",
            searchTerms: [ "archive", "container", "package", "storage" ]
        }, {
            title: "fas fa-box-ballot",
            searchTerms: [ "election", "politics", "vote", "voting" ]
        }, {
            title: "far fa-box-ballot",
            searchTerms: [ "election", "politics", "vote", "voting" ]
        }, {
            title: "fal fa-box-ballot",
            searchTerms: [ "election", "politics", "vote", "voting" ]
        }, {
            title: "fas fa-box-check",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "package", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "far fa-box-check",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "package", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fal fa-box-check",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "package", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fas fa-box-fragile",
            searchTerms: [ "broken", "careful", "glass", "package" ]
        }, {
            title: "far fa-box-fragile",
            searchTerms: [ "broken", "careful", "glass", "package" ]
        }, {
            title: "fal fa-box-fragile",
            searchTerms: [ "broken", "careful", "glass", "package" ]
        }, {
            title: "fas fa-box-full",
            searchTerms: [ "attic", "package", "packed", "storage" ]
        }, {
            title: "far fa-box-full",
            searchTerms: [ "attic", "package", "packed", "storage" ]
        }, {
            title: "fal fa-box-full",
            searchTerms: [ "attic", "package", "packed", "storage" ]
        }, {
            title: "fas fa-box-heart",
            searchTerms: [ "care", "donation", "package", "storage" ]
        }, {
            title: "far fa-box-heart",
            searchTerms: [ "care", "donation", "package", "storage" ]
        }, {
            title: "fal fa-box-heart",
            searchTerms: [ "care", "donation", "package", "storage" ]
        }, {
            title: "fas fa-box-open",
            searchTerms: [ "archive", "container", "package", "storage", "unpack" ]
        }, {
            title: "far fa-box-open",
            searchTerms: [ "archive", "container", "package", "storage", "unpack" ]
        }, {
            title: "fal fa-box-open",
            searchTerms: [ "archive", "container", "package", "storage", "unpack" ]
        }, {
            title: "fas fa-box-up",
            searchTerms: [ "archive", "container", "package", "shipping", "storage" ]
        }, {
            title: "far fa-box-up",
            searchTerms: [ "archive", "container", "package", "shipping", "storage" ]
        }, {
            title: "fal fa-box-up",
            searchTerms: [ "archive", "container", "package", "shipping", "storage" ]
        }, {
            title: "fas fa-box-usd",
            searchTerms: [ "$", "dollar-sign", "donation", "money", "usd" ]
        }, {
            title: "far fa-box-usd",
            searchTerms: [ "$", "dollar-sign", "donation", "money", "usd" ]
        }, {
            title: "fal fa-box-usd",
            searchTerms: [ "$", "dollar-sign", "donation", "money", "usd" ]
        }, {
            title: "fas fa-boxes",
            searchTerms: [ "archives", "inventory", "storage", "warehouse" ]
        }, {
            title: "far fa-boxes",
            searchTerms: [ "archives", "inventory", "storage", "warehouse" ]
        }, {
            title: "fal fa-boxes",
            searchTerms: [ "archives", "inventory", "storage", "warehouse" ]
        }, {
            title: "fas fa-boxes-alt",
            searchTerms: [ "archives", "inventory", "storage", "warehouse" ]
        }, {
            title: "far fa-boxes-alt",
            searchTerms: [ "archives", "inventory", "storage", "warehouse" ]
        }, {
            title: "fal fa-boxes-alt",
            searchTerms: [ "archives", "inventory", "storage", "warehouse" ]
        }, {
            title: "fas fa-boxing-glove",
            searchTerms: [ "boxer", "fight", "heavyweight", "spar" ]
        }, {
            title: "far fa-boxing-glove",
            searchTerms: [ "boxer", "fight", "heavyweight", "spar" ]
        }, {
            title: "fal fa-boxing-glove",
            searchTerms: [ "boxer", "fight", "heavyweight", "spar" ]
        }, {
            title: "fas fa-brackets",
            searchTerms: [ "code", "developer", "development", "parentheses" ]
        }, {
            title: "far fa-brackets",
            searchTerms: [ "code", "developer", "development", "parentheses" ]
        }, {
            title: "fal fa-brackets",
            searchTerms: [ "code", "developer", "development", "parentheses" ]
        }, {
            title: "fas fa-brackets-curly",
            searchTerms: [ "code", "developer", "development", "parentheses" ]
        }, {
            title: "far fa-brackets-curly",
            searchTerms: [ "code", "developer", "development", "parentheses" ]
        }, {
            title: "fal fa-brackets-curly",
            searchTerms: [ "code", "developer", "development", "parentheses" ]
        }, {
            title: "fas fa-braille",
            searchTerms: [ "alphabet", "blind", "dots", "raised", "vision" ]
        }, {
            title: "far fa-braille",
            searchTerms: [ "alphabet", "blind", "dots", "raised", "vision" ]
        }, {
            title: "fal fa-braille",
            searchTerms: [ "alphabet", "blind", "dots", "raised", "vision" ]
        }, {
            title: "fas fa-brain",
            searchTerms: [ "cerebellum", "gray matter", "intellect", "medulla oblongata", "mind", "noodle", "wit" ]
        }, {
            title: "far fa-brain",
            searchTerms: [ "cerebellum", "gray matter", "intellect", "medulla oblongata", "mind", "noodle", "wit" ]
        }, {
            title: "fal fa-brain",
            searchTerms: [ "cerebellum", "gray matter", "intellect", "medulla oblongata", "mind", "noodle", "wit" ]
        }, {
            title: "fas fa-bread-loaf",
            searchTerms: [ "bake", "bakery", "baking", "dough", "flour", "gluten", "grain", "sandwich", "sourdough", "toast", "wheat", "yeast" ]
        }, {
            title: "far fa-bread-loaf",
            searchTerms: [ "bake", "bakery", "baking", "dough", "flour", "gluten", "grain", "sandwich", "sourdough", "toast", "wheat", "yeast" ]
        }, {
            title: "fal fa-bread-loaf",
            searchTerms: [ "bake", "bakery", "baking", "dough", "flour", "gluten", "grain", "sandwich", "sourdough", "toast", "wheat", "yeast" ]
        }, {
            title: "fas fa-bread-slice",
            searchTerms: [ "bake", "bakery", "baking", "dough", "flour", "gluten", "grain", "sandwich", "sourdough", "toast", "wheat", "yeast" ]
        }, {
            title: "far fa-bread-slice",
            searchTerms: [ "bake", "bakery", "baking", "dough", "flour", "gluten", "grain", "sandwich", "sourdough", "toast", "wheat", "yeast" ]
        }, {
            title: "fal fa-bread-slice",
            searchTerms: [ "bake", "bakery", "baking", "dough", "flour", "gluten", "grain", "sandwich", "sourdough", "toast", "wheat", "yeast" ]
        }, {
            title: "fas fa-briefcase",
            searchTerms: [ "bag", "business", "luggage", "office", "work" ]
        }, {
            title: "far fa-briefcase",
            searchTerms: [ "bag", "business", "luggage", "office", "work" ]
        }, {
            title: "fal fa-briefcase",
            searchTerms: [ "bag", "business", "luggage", "office", "work" ]
        }, {
            title: "fas fa-briefcase-medical",
            searchTerms: [ "doctor", "emt", "first aid", "health" ]
        }, {
            title: "far fa-briefcase-medical",
            searchTerms: [ "doctor", "emt", "first aid", "health" ]
        }, {
            title: "fal fa-briefcase-medical",
            searchTerms: [ "doctor", "emt", "first aid", "health" ]
        }, {
            title: "fas fa-bring-forward",
            searchTerms: [ "arrange", "front", "layer", "order", "stack" ]
        }, {
            title: "far fa-bring-forward",
            searchTerms: [ "arrange", "front", "layer", "order", "stack" ]
        }, {
            title: "fal fa-bring-forward",
            searchTerms: [ "arrange", "front", "layer", "order", "stack" ]
        }, {
            title: "fas fa-bring-front",
            searchTerms: [ "arrange", "forward", "layer", "order", "stack" ]
        }, {
            title: "far fa-bring-front",
            searchTerms: [ "arrange", "forward", "layer", "order", "stack" ]
        }, {
            title: "fal fa-bring-front",
            searchTerms: [ "arrange", "forward", "layer", "order", "stack" ]
        }, {
            title: "fas fa-broadcast-tower",
            searchTerms: [ "airwaves", "antenna", "radio", "reception", "waves" ]
        }, {
            title: "far fa-broadcast-tower",
            searchTerms: [ "airwaves", "antenna", "radio", "reception", "waves" ]
        }, {
            title: "fal fa-broadcast-tower",
            searchTerms: [ "airwaves", "antenna", "radio", "reception", "waves" ]
        }, {
            title: "fas fa-broom",
            searchTerms: [ "clean", "firebolt", "fly", "halloween", "nimbus 2000", "quidditch", "sweep", "witch" ]
        }, {
            title: "far fa-broom",
            searchTerms: [ "clean", "firebolt", "fly", "halloween", "nimbus 2000", "quidditch", "sweep", "witch" ]
        }, {
            title: "fal fa-broom",
            searchTerms: [ "clean", "firebolt", "fly", "halloween", "nimbus 2000", "quidditch", "sweep", "witch" ]
        }, {
            title: "fas fa-browser",
            searchTerms: [ "app", "application", "desktop", "explorer", "internet", "web", "website" ]
        }, {
            title: "far fa-browser",
            searchTerms: [ "app", "application", "desktop", "explorer", "internet", "web", "website" ]
        }, {
            title: "fal fa-browser",
            searchTerms: [ "app", "application", "desktop", "explorer", "internet", "web", "website" ]
        }, {
            title: "fas fa-brush",
            searchTerms: [ "art", "bristles", "color", "handle", "paint" ]
        }, {
            title: "far fa-brush",
            searchTerms: [ "art", "bristles", "color", "handle", "paint" ]
        }, {
            title: "fal fa-brush",
            searchTerms: [ "art", "bristles", "color", "handle", "paint" ]
        }, {
            title: "fab fa-btc",
            searchTerms: []
        }, {
            title: "fab fa-buffer",
            searchTerms: []
        }, {
            title: "fas fa-bug",
            searchTerms: [ "beetle", "error", "insect", "report" ]
        }, {
            title: "far fa-bug",
            searchTerms: [ "beetle", "error", "insect", "report" ]
        }, {
            title: "fal fa-bug",
            searchTerms: [ "beetle", "error", "insect", "report" ]
        }, {
            title: "fas fa-building",
            searchTerms: [ "apartment", "business", "city", "company", "office", "work" ]
        }, {
            title: "far fa-building",
            searchTerms: [ "apartment", "business", "city", "company", "office", "work" ]
        }, {
            title: "fal fa-building",
            searchTerms: [ "apartment", "business", "city", "company", "office", "work" ]
        }, {
            title: "fas fa-bullhorn",
            searchTerms: [ "announcement", "broadcast", "louder", "megaphone", "share" ]
        }, {
            title: "far fa-bullhorn",
            searchTerms: [ "announcement", "broadcast", "louder", "megaphone", "share" ]
        }, {
            title: "fal fa-bullhorn",
            searchTerms: [ "announcement", "broadcast", "louder", "megaphone", "share" ]
        }, {
            title: "fas fa-bullseye",
            searchTerms: [ "archery", "goal", "objective", "target" ]
        }, {
            title: "far fa-bullseye",
            searchTerms: [ "archery", "goal", "objective", "target" ]
        }, {
            title: "fal fa-bullseye",
            searchTerms: [ "archery", "goal", "objective", "target" ]
        }, {
            title: "fas fa-bullseye-arrow",
            searchTerms: [ "archery", "arrow", "goal", "objective", "robin hood", "target" ]
        }, {
            title: "far fa-bullseye-arrow",
            searchTerms: [ "archery", "arrow", "goal", "objective", "robin hood", "target" ]
        }, {
            title: "fal fa-bullseye-arrow",
            searchTerms: [ "archery", "arrow", "goal", "objective", "robin hood", "target" ]
        }, {
            title: "fas fa-bullseye-pointer",
            searchTerms: [ "archery", "goal", "objective", "target" ]
        }, {
            title: "far fa-bullseye-pointer",
            searchTerms: [ "archery", "goal", "objective", "target" ]
        }, {
            title: "fal fa-bullseye-pointer",
            searchTerms: [ "archery", "goal", "objective", "target" ]
        }, {
            title: "fas fa-burger-soda",
            searchTerms: [ "bacon", "beef", "cheeseburger", "fast food", "grill", "ground beef", "hamburger", "junk food", "pop", "sandwich", "slider" ]
        }, {
            title: "far fa-burger-soda",
            searchTerms: [ "bacon", "beef", "cheeseburger", "fast food", "grill", "ground beef", "hamburger", "junk food", "pop", "sandwich", "slider" ]
        }, {
            title: "fal fa-burger-soda",
            searchTerms: [ "bacon", "beef", "cheeseburger", "fast food", "grill", "ground beef", "hamburger", "junk food", "pop", "sandwich", "slider" ]
        }, {
            title: "fas fa-burn",
            searchTerms: [ "caliente", "energy", "fire", "flame", "gas", "heat", "hot" ]
        }, {
            title: "far fa-burn",
            searchTerms: [ "caliente", "energy", "fire", "flame", "gas", "heat", "hot" ]
        }, {
            title: "fal fa-burn",
            searchTerms: [ "caliente", "energy", "fire", "flame", "gas", "heat", "hot" ]
        }, {
            title: "fab fa-buromobelexperte",
            searchTerms: []
        }, {
            title: "fas fa-burrito",
            searchTerms: [ "beans", "breakfast", "chimichanga", "mexican", "salsa", "taco", "tortilla" ]
        }, {
            title: "far fa-burrito",
            searchTerms: [ "beans", "breakfast", "chimichanga", "mexican", "salsa", "taco", "tortilla" ]
        }, {
            title: "fal fa-burrito",
            searchTerms: [ "beans", "breakfast", "chimichanga", "mexican", "salsa", "taco", "tortilla" ]
        }, {
            title: "fas fa-bus",
            searchTerms: [ "public transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "far fa-bus",
            searchTerms: [ "public transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "fal fa-bus",
            searchTerms: [ "public transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "fas fa-bus-alt",
            searchTerms: [ "mta", "public transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "far fa-bus-alt",
            searchTerms: [ "mta", "public transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "fal fa-bus-alt",
            searchTerms: [ "mta", "public transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "fas fa-bus-school",
            searchTerms: [ "education", "school", "transportation", "vehicle" ]
        }, {
            title: "far fa-bus-school",
            searchTerms: [ "education", "school", "transportation", "vehicle" ]
        }, {
            title: "fal fa-bus-school",
            searchTerms: [ "education", "school", "transportation", "vehicle" ]
        }, {
            title: "fas fa-business-time",
            searchTerms: [ "alarm", "briefcase", "business socks", "clock", "flight of the conchords", "reminder", "wednesday" ]
        }, {
            title: "far fa-business-time",
            searchTerms: [ "alarm", "briefcase", "business socks", "clock", "flight of the conchords", "reminder", "wednesday" ]
        }, {
            title: "fal fa-business-time",
            searchTerms: [ "alarm", "briefcase", "business socks", "clock", "flight of the conchords", "reminder", "wednesday" ]
        }, {
            title: "fab fa-buy-n-large",
            searchTerms: []
        }, {
            title: "fab fa-buysellads",
            searchTerms: []
        }, {
            title: "fas fa-cabinet-filing",
            searchTerms: [ "archive", "files", "records", "register", "storage" ]
        }, {
            title: "far fa-cabinet-filing",
            searchTerms: [ "archive", "files", "records", "register", "storage" ]
        }, {
            title: "fal fa-cabinet-filing",
            searchTerms: [ "archive", "files", "records", "register", "storage" ]
        }, {
            title: "fal fa-cactus",
            searchTerms: [ "cowboy", "desert", "flora", "old west", "plant", "succulent", "western" ]
        }, {
            title: "far fa-cactus",
            searchTerms: [ "cowboy", "desert", "flora", "old west", "plant", "succulent", "western" ]
        }, {
            title: "fas fa-cactus",
            searchTerms: [ "cowboy", "desert", "flora", "old west", "plant", "succulent", "western" ]
        }, {
            title: "fas fa-calculator",
            searchTerms: [ "abacus", "addition", "arithmetic", "counting", "math", "multiplication", "subtraction" ]
        }, {
            title: "far fa-calculator",
            searchTerms: [ "abacus", "addition", "arithmetic", "counting", "math", "multiplication", "subtraction" ]
        }, {
            title: "fal fa-calculator",
            searchTerms: [ "abacus", "addition", "arithmetic", "counting", "math", "multiplication", "subtraction" ]
        }, {
            title: "fas fa-calculator-alt",
            searchTerms: [ "abacus", "addition", "arithmetic", "counting", "math", "multiplication", "subtraction" ]
        }, {
            title: "far fa-calculator-alt",
            searchTerms: [ "abacus", "addition", "arithmetic", "counting", "math", "multiplication", "subtraction" ]
        }, {
            title: "fal fa-calculator-alt",
            searchTerms: [ "abacus", "addition", "arithmetic", "counting", "math", "multiplication", "subtraction" ]
        }, {
            title: "fas fa-calendar",
            searchTerms: [ "calendar-o", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "far fa-calendar",
            searchTerms: [ "calendar-o", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fal fa-calendar",
            searchTerms: [ "calendar-o", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fas fa-calendar-alt",
            searchTerms: [ "calendar", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "far fa-calendar-alt",
            searchTerms: [ "calendar", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fal fa-calendar-alt",
            searchTerms: [ "calendar", "date", "event", "schedule", "time", "when" ]
        }, {
            title: "fas fa-calendar-check",
            searchTerms: [ "accept", "agree", "appointment", "confirm", "correct", "date", "done", "event", "ok", "schedule", "select", "success", "tick", "time", "todo", "when" ]
        }, {
            title: "far fa-calendar-check",
            searchTerms: [ "accept", "agree", "appointment", "confirm", "correct", "date", "done", "event", "ok", "schedule", "select", "success", "tick", "time", "todo", "when" ]
        }, {
            title: "fal fa-calendar-check",
            searchTerms: [ "accept", "agree", "appointment", "confirm", "correct", "date", "done", "event", "ok", "schedule", "select", "success", "tick", "time", "todo", "when" ]
        }, {
            title: "fas fa-calendar-day",
            searchTerms: [ "date", "detail", "event", "focus", "schedule", "single day", "time", "today", "when" ]
        }, {
            title: "far fa-calendar-day",
            searchTerms: [ "date", "detail", "event", "focus", "schedule", "single day", "time", "today", "when" ]
        }, {
            title: "fal fa-calendar-day",
            searchTerms: [ "date", "detail", "event", "focus", "schedule", "single day", "time", "today", "when" ]
        }, {
            title: "fas fa-calendar-edit",
            searchTerms: [ "date", "edit", "event", "pen", "pencil", "schedule", "time", "update", "when", "write" ]
        }, {
            title: "far fa-calendar-edit",
            searchTerms: [ "date", "edit", "event", "pen", "pencil", "schedule", "time", "update", "when", "write" ]
        }, {
            title: "fal fa-calendar-edit",
            searchTerms: [ "date", "edit", "event", "pen", "pencil", "schedule", "time", "update", "when", "write" ]
        }, {
            title: "fas fa-calendar-exclamation",
            searchTerms: [ "calendar", "date", "event", "important", "schedule", "time", "when" ]
        }, {
            title: "far fa-calendar-exclamation",
            searchTerms: [ "calendar", "date", "event", "important", "schedule", "time", "when" ]
        }, {
            title: "fal fa-calendar-exclamation",
            searchTerms: [ "calendar", "date", "event", "important", "schedule", "time", "when" ]
        }, {
            title: "fas fa-calendar-minus",
            searchTerms: [ "calendar", "date", "delete", "event", "negative", "remove", "schedule", "time", "when" ]
        }, {
            title: "far fa-calendar-minus",
            searchTerms: [ "calendar", "date", "delete", "event", "negative", "remove", "schedule", "time", "when" ]
        }, {
            title: "fal fa-calendar-minus",
            searchTerms: [ "calendar", "date", "delete", "event", "negative", "remove", "schedule", "time", "when" ]
        }, {
            title: "fas fa-calendar-plus",
            searchTerms: [ "add", "calendar", "create", "date", "event", "new", "positive", "schedule", "time", "when" ]
        }, {
            title: "far fa-calendar-plus",
            searchTerms: [ "add", "calendar", "create", "date", "event", "new", "positive", "schedule", "time", "when" ]
        }, {
            title: "fal fa-calendar-plus",
            searchTerms: [ "add", "calendar", "create", "date", "event", "new", "positive", "schedule", "time", "when" ]
        }, {
            title: "fas fa-calendar-star",
            searchTerms: [ "calendar", "date", "event", "favorite", "important", "schedule", "time", "when" ]
        }, {
            title: "far fa-calendar-star",
            searchTerms: [ "calendar", "date", "event", "favorite", "important", "schedule", "time", "when" ]
        }, {
            title: "fal fa-calendar-star",
            searchTerms: [ "calendar", "date", "event", "favorite", "important", "schedule", "time", "when" ]
        }, {
            title: "fas fa-calendar-times",
            searchTerms: [ "archive", "calendar", "date", "delete", "event", "remove", "schedule", "time", "when", "x" ]
        }, {
            title: "far fa-calendar-times",
            searchTerms: [ "archive", "calendar", "date", "delete", "event", "remove", "schedule", "time", "when", "x" ]
        }, {
            title: "fal fa-calendar-times",
            searchTerms: [ "archive", "calendar", "date", "delete", "event", "remove", "schedule", "time", "when", "x" ]
        }, {
            title: "fas fa-calendar-week",
            searchTerms: [ "date", "detail", "event", "focus", "schedule", "single week", "time", "today", "when" ]
        }, {
            title: "far fa-calendar-week",
            searchTerms: [ "date", "detail", "event", "focus", "schedule", "single week", "time", "today", "when" ]
        }, {
            title: "fal fa-calendar-week",
            searchTerms: [ "date", "detail", "event", "focus", "schedule", "single week", "time", "today", "when" ]
        }, {
            title: "fas fa-camcorder",
            searchTerms: [ "cinema", "director", "film", "handheld", "movie", "retro", "theater", "video", "vintage" ]
        }, {
            title: "far fa-camcorder",
            searchTerms: [ "cinema", "director", "film", "handheld", "movie", "retro", "theater", "video", "vintage" ]
        }, {
            title: "fal fa-camcorder",
            searchTerms: [ "cinema", "director", "film", "handheld", "movie", "retro", "theater", "video", "vintage" ]
        }, {
            title: "fas fa-camera",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "far fa-camera",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "fal fa-camera",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "fas fa-camera-alt",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "far fa-camera-alt",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "fal fa-camera-alt",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "fas fa-camera-home",
            searchTerms: [ "chat", "conference call", "facetime", "podcast", "security", "video", "videoconferencing", "youtube" ]
        }, {
            title: "far fa-camera-home",
            searchTerms: [ "chat", "conference call", "facetime", "podcast", "security", "video", "videoconferencing", "youtube" ]
        }, {
            title: "fal fa-camera-home",
            searchTerms: [ "chat", "conference call", "facetime", "podcast", "security", "video", "videoconferencing", "youtube" ]
        }, {
            title: "fas fa-camera-movie",
            searchTerms: [ "cinema", "director", "film", "movie", "theater", "video" ]
        }, {
            title: "far fa-camera-movie",
            searchTerms: [ "cinema", "director", "film", "movie", "theater", "video" ]
        }, {
            title: "fal fa-camera-movie",
            searchTerms: [ "cinema", "director", "film", "movie", "theater", "video" ]
        }, {
            title: "fas fa-camera-polaroid",
            searchTerms: [ "capture", "film", "instant camera", "lens", "photo", "photography", "retro", "snapshot", "vintage" ]
        }, {
            title: "far fa-camera-polaroid",
            searchTerms: [ "capture", "film", "instant camera", "lens", "photo", "photography", "retro", "snapshot", "vintage" ]
        }, {
            title: "fal fa-camera-polaroid",
            searchTerms: [ "capture", "film", "instant camera", "lens", "photo", "photography", "retro", "snapshot", "vintage" ]
        }, {
            title: "fas fa-camera-retro",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "far fa-camera-retro",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "fal fa-camera-retro",
            searchTerms: [ "image", "lens", "photo", "picture", "record", "shutter", "video" ]
        }, {
            title: "fas fa-campfire",
            searchTerms: [ "Dungeons & Dragons", "caliente", "campaign", "camping", "d&d", "dnd", "fall", "fire", "flame", "gathering", "heat", "hot", "meeting", "outdoors", "seasonal", "tent", "wilderness" ]
        }, {
            title: "far fa-campfire",
            searchTerms: [ "Dungeons & Dragons", "caliente", "campaign", "camping", "d&d", "dnd", "fall", "fire", "flame", "gathering", "heat", "hot", "meeting", "outdoors", "seasonal", "tent", "wilderness" ]
        }, {
            title: "fal fa-campfire",
            searchTerms: [ "Dungeons & Dragons", "caliente", "campaign", "camping", "d&d", "dnd", "fall", "fire", "flame", "gathering", "heat", "hot", "meeting", "outdoors", "seasonal", "tent", "wilderness" ]
        }, {
            title: "fas fa-campground",
            searchTerms: [ "camping", "fall", "outdoors", "teepee", "tent", "tipi" ]
        }, {
            title: "far fa-campground",
            searchTerms: [ "camping", "fall", "outdoors", "teepee", "tent", "tipi" ]
        }, {
            title: "fal fa-campground",
            searchTerms: [ "camping", "fall", "outdoors", "teepee", "tent", "tipi" ]
        }, {
            title: "fab fa-canadian-maple-leaf",
            searchTerms: [ "canada", "flag", "flora", "nature", "plant" ]
        }, {
            title: "fas fa-candle-holder",
            searchTerms: [ "fire", "flame", "halloween", "holiday", "hot", "light", "lit", "wick" ]
        }, {
            title: "far fa-candle-holder",
            searchTerms: [ "fire", "flame", "halloween", "holiday", "hot", "light", "lit", "wick" ]
        }, {
            title: "fal fa-candle-holder",
            searchTerms: [ "fire", "flame", "halloween", "holiday", "hot", "light", "lit", "wick" ]
        }, {
            title: "fas fa-candy-cane",
            searchTerms: [ "candy", "christmas", "holiday", "mint", "peppermint", "striped", "xmas" ]
        }, {
            title: "far fa-candy-cane",
            searchTerms: [ "candy", "christmas", "holiday", "mint", "peppermint", "striped", "xmas" ]
        }, {
            title: "fal fa-candy-cane",
            searchTerms: [ "candy", "christmas", "holiday", "mint", "peppermint", "striped", "xmas" ]
        }, {
            title: "fas fa-candy-corn",
            searchTerms: [ "halloween", "holiday", "sugar", "triangles" ]
        }, {
            title: "far fa-candy-corn",
            searchTerms: [ "halloween", "holiday", "sugar", "triangles" ]
        }, {
            title: "fal fa-candy-corn",
            searchTerms: [ "halloween", "holiday", "sugar", "triangles" ]
        }, {
            title: "fas fa-cannabis",
            searchTerms: [ "bud", "chronic", "drugs", "endica", "endo", "ganja", "marijuana", "mary jane", "pot", "reefer", "sativa", "spliff", "weed", "whacky-tabacky" ]
        }, {
            title: "far fa-cannabis",
            searchTerms: [ "bud", "chronic", "drugs", "endica", "endo", "ganja", "marijuana", "mary jane", "pot", "reefer", "sativa", "spliff", "weed", "whacky-tabacky" ]
        }, {
            title: "fal fa-cannabis",
            searchTerms: [ "bud", "chronic", "drugs", "endica", "endo", "ganja", "marijuana", "mary jane", "pot", "reefer", "sativa", "spliff", "weed", "whacky-tabacky" ]
        }, {
            title: "fas fa-capsules",
            searchTerms: [ "drugs", "medicine", "pills", "prescription" ]
        }, {
            title: "far fa-capsules",
            searchTerms: [ "drugs", "medicine", "pills", "prescription" ]
        }, {
            title: "fal fa-capsules",
            searchTerms: [ "drugs", "medicine", "pills", "prescription" ]
        }, {
            title: "fas fa-car",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "far fa-car",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "fal fa-car",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "fas fa-car-alt",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "far fa-car-alt",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "fal fa-car-alt",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "fas fa-car-battery",
            searchTerms: [ "auto", "electric", "mechanic", "power" ]
        }, {
            title: "far fa-car-battery",
            searchTerms: [ "auto", "electric", "mechanic", "power" ]
        }, {
            title: "fal fa-car-battery",
            searchTerms: [ "auto", "electric", "mechanic", "power" ]
        }, {
            title: "fas fa-car-building",
            searchTerms: [ "city", "office", "transportation", "travel", "work" ]
        }, {
            title: "far fa-car-building",
            searchTerms: [ "city", "office", "transportation", "travel", "work" ]
        }, {
            title: "fal fa-car-building",
            searchTerms: [ "city", "office", "transportation", "travel", "work" ]
        }, {
            title: "fas fa-car-bump",
            searchTerms: [ "auto", "automobile", "off-road", "sedan", "transportation", "vehicle" ]
        }, {
            title: "far fa-car-bump",
            searchTerms: [ "auto", "automobile", "off-road", "sedan", "transportation", "vehicle" ]
        }, {
            title: "fal fa-car-bump",
            searchTerms: [ "auto", "automobile", "off-road", "sedan", "transportation", "vehicle" ]
        }, {
            title: "fas fa-car-bus",
            searchTerms: [ "directions", "ground transportation", "map", "transportation", "travel" ]
        }, {
            title: "far fa-car-bus",
            searchTerms: [ "directions", "ground transportation", "map", "transportation", "travel" ]
        }, {
            title: "fal fa-car-bus",
            searchTerms: [ "directions", "ground transportation", "map", "transportation", "travel" ]
        }, {
            title: "fas fa-car-crash",
            searchTerms: [ "accident", "auto", "automobile", "insurance", "sedan", "transportation", "vehicle", "wreck" ]
        }, {
            title: "far fa-car-crash",
            searchTerms: [ "accident", "auto", "automobile", "insurance", "sedan", "transportation", "vehicle", "wreck" ]
        }, {
            title: "fal fa-car-crash",
            searchTerms: [ "accident", "auto", "automobile", "insurance", "sedan", "transportation", "vehicle", "wreck" ]
        }, {
            title: "fas fa-car-garage",
            searchTerms: [ "auto", "automobile", "mechanic", "sedan", "transportation", "vehicle" ]
        }, {
            title: "far fa-car-garage",
            searchTerms: [ "auto", "automobile", "mechanic", "sedan", "transportation", "vehicle" ]
        }, {
            title: "fal fa-car-garage",
            searchTerms: [ "auto", "automobile", "mechanic", "sedan", "transportation", "vehicle" ]
        }, {
            title: "fas fa-car-mechanic",
            searchTerms: [ "auto", "automobile", "mechanic", "repair", "sedan", "transportation", "vehicle" ]
        }, {
            title: "far fa-car-mechanic",
            searchTerms: [ "auto", "automobile", "mechanic", "repair", "sedan", "transportation", "vehicle" ]
        }, {
            title: "fal fa-car-mechanic",
            searchTerms: [ "auto", "automobile", "mechanic", "repair", "sedan", "transportation", "vehicle" ]
        }, {
            title: "fas fa-car-side",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "far fa-car-side",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "fal fa-car-side",
            searchTerms: [ "auto", "automobile", "sedan", "transportation", "travel", "vehicle" ]
        }, {
            title: "fas fa-car-tilt",
            searchTerms: [ "accident", "auto", "automobile", "insurance", "sedan", "transportation", "vehicle", "wreck" ]
        }, {
            title: "far fa-car-tilt",
            searchTerms: [ "accident", "auto", "automobile", "insurance", "sedan", "transportation", "vehicle", "wreck" ]
        }, {
            title: "fal fa-car-tilt",
            searchTerms: [ "accident", "auto", "automobile", "insurance", "sedan", "transportation", "vehicle", "wreck" ]
        }, {
            title: "fas fa-car-wash",
            searchTerms: [ "auto", "automobile", "clean", "sedan", "transportation", "vehicle" ]
        }, {
            title: "far fa-car-wash",
            searchTerms: [ "auto", "automobile", "clean", "sedan", "transportation", "vehicle" ]
        }, {
            title: "fal fa-car-wash",
            searchTerms: [ "auto", "automobile", "clean", "sedan", "transportation", "vehicle" ]
        }, {
            title: "fas fa-caravan",
            searchTerms: [ "camper", "motor home", "rv", "trailer", "travel" ]
        }, {
            title: "far fa-caravan",
            searchTerms: [ "camper", "motor home", "rv", "trailer", "travel" ]
        }, {
            title: "fal fa-caravan",
            searchTerms: [ "camper", "motor home", "rv", "trailer", "travel" ]
        }, {
            title: "fas fa-caravan-alt",
            searchTerms: [ "camper", "motor home", "rv", "trailer", "travel" ]
        }, {
            title: "far fa-caravan-alt",
            searchTerms: [ "camper", "motor home", "rv", "trailer", "travel" ]
        }, {
            title: "fal fa-caravan-alt",
            searchTerms: [ "camper", "motor home", "rv", "trailer", "travel" ]
        }, {
            title: "fas fa-caret-circle-down",
            searchTerms: [ "arrow", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "far fa-caret-circle-down",
            searchTerms: [ "arrow", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "fal fa-caret-circle-down",
            searchTerms: [ "arrow", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "fas fa-caret-circle-left",
            searchTerms: [ "arrow", "back", "previous", "triangle" ]
        }, {
            title: "far fa-caret-circle-left",
            searchTerms: [ "arrow", "back", "previous", "triangle" ]
        }, {
            title: "fal fa-caret-circle-left",
            searchTerms: [ "arrow", "back", "previous", "triangle" ]
        }, {
            title: "fas fa-caret-circle-right",
            searchTerms: [ "arrow", "forward", "next", "triangle" ]
        }, {
            title: "far fa-caret-circle-right",
            searchTerms: [ "arrow", "forward", "next", "triangle" ]
        }, {
            title: "fal fa-caret-circle-right",
            searchTerms: [ "arrow", "forward", "next", "triangle" ]
        }, {
            title: "fas fa-caret-circle-up",
            searchTerms: [ "arrow", "collapse", "triangle", "upload" ]
        }, {
            title: "far fa-caret-circle-up",
            searchTerms: [ "arrow", "collapse", "triangle", "upload" ]
        }, {
            title: "fal fa-caret-circle-up",
            searchTerms: [ "arrow", "collapse", "triangle", "upload" ]
        }, {
            title: "fas fa-caret-down",
            searchTerms: [ "arrow", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "far fa-caret-down",
            searchTerms: [ "arrow", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "fal fa-caret-down",
            searchTerms: [ "arrow", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "fas fa-caret-left",
            searchTerms: [ "arrow", "back", "previous", "triangle" ]
        }, {
            title: "far fa-caret-left",
            searchTerms: [ "arrow", "back", "previous", "triangle" ]
        }, {
            title: "fal fa-caret-left",
            searchTerms: [ "arrow", "back", "previous", "triangle" ]
        }, {
            title: "fas fa-caret-right",
            searchTerms: [ "arrow", "forward", "next", "triangle" ]
        }, {
            title: "far fa-caret-right",
            searchTerms: [ "arrow", "forward", "next", "triangle" ]
        }, {
            title: "fal fa-caret-right",
            searchTerms: [ "arrow", "forward", "next", "triangle" ]
        }, {
            title: "fas fa-caret-square-down",
            searchTerms: [ "arrow", "caret-square-o-down", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "far fa-caret-square-down",
            searchTerms: [ "arrow", "caret-square-o-down", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "fal fa-caret-square-down",
            searchTerms: [ "arrow", "caret-square-o-down", "dropdown", "expand", "menu", "more", "triangle" ]
        }, {
            title: "fas fa-caret-square-left",
            searchTerms: [ "arrow", "back", "caret-square-o-left", "previous", "triangle" ]
        }, {
            title: "far fa-caret-square-left",
            searchTerms: [ "arrow", "back", "caret-square-o-left", "previous", "triangle" ]
        }, {
            title: "fal fa-caret-square-left",
            searchTerms: [ "arrow", "back", "caret-square-o-left", "previous", "triangle" ]
        }, {
            title: "fas fa-caret-square-right",
            searchTerms: [ "arrow", "caret-square-o-right", "forward", "next", "triangle" ]
        }, {
            title: "far fa-caret-square-right",
            searchTerms: [ "arrow", "caret-square-o-right", "forward", "next", "triangle" ]
        }, {
            title: "fal fa-caret-square-right",
            searchTerms: [ "arrow", "caret-square-o-right", "forward", "next", "triangle" ]
        }, {
            title: "fas fa-caret-square-up",
            searchTerms: [ "arrow", "caret-square-o-up", "collapse", "triangle", "upload" ]
        }, {
            title: "far fa-caret-square-up",
            searchTerms: [ "arrow", "caret-square-o-up", "collapse", "triangle", "upload" ]
        }, {
            title: "fal fa-caret-square-up",
            searchTerms: [ "arrow", "caret-square-o-up", "collapse", "triangle", "upload" ]
        }, {
            title: "fas fa-caret-up",
            searchTerms: [ "arrow", "collapse", "triangle" ]
        }, {
            title: "far fa-caret-up",
            searchTerms: [ "arrow", "collapse", "triangle" ]
        }, {
            title: "fal fa-caret-up",
            searchTerms: [ "arrow", "collapse", "triangle" ]
        }, {
            title: "fas fa-carrot",
            searchTerms: [ "bugs bunny", "orange", "vegan", "vegetable" ]
        }, {
            title: "far fa-carrot",
            searchTerms: [ "bugs bunny", "orange", "vegan", "vegetable" ]
        }, {
            title: "fal fa-carrot",
            searchTerms: [ "bugs bunny", "orange", "vegan", "vegetable" ]
        }, {
            title: "fas fa-cars",
            searchTerms: [ "automobiles", "autos", "transportation", "travel" ]
        }, {
            title: "far fa-cars",
            searchTerms: [ "automobiles", "autos", "transportation", "travel" ]
        }, {
            title: "fal fa-cars",
            searchTerms: [ "automobiles", "autos", "transportation", "travel" ]
        }, {
            title: "fas fa-cart-arrow-down",
            searchTerms: [ "download", "save", "shopping" ]
        }, {
            title: "far fa-cart-arrow-down",
            searchTerms: [ "download", "save", "shopping" ]
        }, {
            title: "fal fa-cart-arrow-down",
            searchTerms: [ "download", "save", "shopping" ]
        }, {
            title: "fas fa-cart-plus",
            searchTerms: [ "add", "create", "new", "positive", "shopping" ]
        }, {
            title: "far fa-cart-plus",
            searchTerms: [ "add", "create", "new", "positive", "shopping" ]
        }, {
            title: "fal fa-cart-plus",
            searchTerms: [ "add", "create", "new", "positive", "shopping" ]
        }, {
            title: "fas fa-cash-register",
            searchTerms: [ "buy", "cha-ching", "change", "checkout", "commerce", "leaerboard", "machine", "pay", "payment", "purchase", "store" ]
        }, {
            title: "far fa-cash-register",
            searchTerms: [ "buy", "cha-ching", "change", "checkout", "commerce", "leaerboard", "machine", "pay", "payment", "purchase", "store" ]
        }, {
            title: "fal fa-cash-register",
            searchTerms: [ "buy", "cha-ching", "change", "checkout", "commerce", "leaerboard", "machine", "pay", "payment", "purchase", "store" ]
        }, {
            title: "fas fa-cassette-tape",
            searchTerms: [ "mixtape", "music", "play", "recording", "walkman" ]
        }, {
            title: "far fa-cassette-tape",
            searchTerms: [ "mixtape", "music", "play", "recording", "walkman" ]
        }, {
            title: "fal fa-cassette-tape",
            searchTerms: [ "mixtape", "music", "play", "recording", "walkman" ]
        }, {
            title: "fas fa-cat",
            searchTerms: [ "feline", "halloween", "holiday", "kitten", "kitty", "meow", "pet" ]
        }, {
            title: "far fa-cat",
            searchTerms: [ "feline", "halloween", "holiday", "kitten", "kitty", "meow", "pet" ]
        }, {
            title: "fal fa-cat",
            searchTerms: [ "feline", "halloween", "holiday", "kitten", "kitty", "meow", "pet" ]
        }, {
            title: "fas fa-cat-space",
            searchTerms: [ "animal", "astronaut", "cosmonaut", "fauna", "meow", "space" ]
        }, {
            title: "far fa-cat-space",
            searchTerms: [ "animal", "astronaut", "cosmonaut", "fauna", "meow", "space" ]
        }, {
            title: "fal fa-cat-space",
            searchTerms: [ "animal", "astronaut", "cosmonaut", "fauna", "meow", "space" ]
        }, {
            title: "fas fa-cauldron",
            searchTerms: [ "boil", "bubble", "cooking", "halloween", "holiday", "magic", "pot", "sorcery", "toil", "trouble", "witch", "wizard" ]
        }, {
            title: "far fa-cauldron",
            searchTerms: [ "boil", "bubble", "cooking", "halloween", "holiday", "magic", "pot", "sorcery", "toil", "trouble", "witch", "wizard" ]
        }, {
            title: "fal fa-cauldron",
            searchTerms: [ "boil", "bubble", "cooking", "halloween", "holiday", "magic", "pot", "sorcery", "toil", "trouble", "witch", "wizard" ]
        }, {
            title: "fab fa-cc-amazon-pay",
            searchTerms: []
        }, {
            title: "fab fa-cc-amex",
            searchTerms: [ "amex" ]
        }, {
            title: "fab fa-cc-apple-pay",
            searchTerms: []
        }, {
            title: "fab fa-cc-diners-club",
            searchTerms: []
        }, {
            title: "fab fa-cc-discover",
            searchTerms: []
        }, {
            title: "fab fa-cc-jcb",
            searchTerms: []
        }, {
            title: "fab fa-cc-mastercard",
            searchTerms: []
        }, {
            title: "fab fa-cc-paypal",
            searchTerms: []
        }, {
            title: "fab fa-cc-stripe",
            searchTerms: []
        }, {
            title: "fab fa-cc-visa",
            searchTerms: []
        }, {
            title: "fas fa-cctv",
            searchTerms: [ 1984, "Big Brother", "George Orwell", "camera", "security", "surveillance", "video" ]
        }, {
            title: "far fa-cctv",
            searchTerms: [ 1984, "Big Brother", "George Orwell", "camera", "security", "surveillance", "video" ]
        }, {
            title: "fal fa-cctv",
            searchTerms: [ 1984, "Big Brother", "George Orwell", "camera", "security", "surveillance", "video" ]
        }, {
            title: "fab fa-centercode",
            searchTerms: []
        }, {
            title: "fab fa-centos",
            searchTerms: [ "linux", "operating system", "os" ]
        }, {
            title: "fas fa-certificate",
            searchTerms: [ "badge", "star", "verified" ]
        }, {
            title: "far fa-certificate",
            searchTerms: [ "badge", "star", "verified" ]
        }, {
            title: "fal fa-certificate",
            searchTerms: [ "badge", "star", "verified" ]
        }, {
            title: "fas fa-chair",
            searchTerms: [ "furniture", "seat", "sit" ]
        }, {
            title: "far fa-chair",
            searchTerms: [ "furniture", "seat", "sit" ]
        }, {
            title: "fal fa-chair",
            searchTerms: [ "furniture", "seat", "sit" ]
        }, {
            title: "fas fa-chair-office",
            searchTerms: [ "ergonomic", "furniture", "seat" ]
        }, {
            title: "far fa-chair-office",
            searchTerms: [ "ergonomic", "furniture", "seat" ]
        }, {
            title: "fal fa-chair-office",
            searchTerms: [ "ergonomic", "furniture", "seat" ]
        }, {
            title: "fas fa-chalkboard",
            searchTerms: [ "blackboard", "learning", "school", "teaching", "whiteboard", "writing" ]
        }, {
            title: "far fa-chalkboard",
            searchTerms: [ "blackboard", "learning", "school", "teaching", "whiteboard", "writing" ]
        }, {
            title: "fal fa-chalkboard",
            searchTerms: [ "blackboard", "learning", "school", "teaching", "whiteboard", "writing" ]
        }, {
            title: "fas fa-chalkboard-teacher",
            searchTerms: [ "blackboard", "instructor", "learning", "professor", "school", "whiteboard", "writing" ]
        }, {
            title: "far fa-chalkboard-teacher",
            searchTerms: [ "blackboard", "instructor", "learning", "professor", "school", "whiteboard", "writing" ]
        }, {
            title: "fal fa-chalkboard-teacher",
            searchTerms: [ "blackboard", "instructor", "learning", "professor", "school", "whiteboard", "writing" ]
        }, {
            title: "fas fa-charging-station",
            searchTerms: [ "electric", "ev", "tesla", "vehicle" ]
        }, {
            title: "far fa-charging-station",
            searchTerms: [ "electric", "ev", "tesla", "vehicle" ]
        }, {
            title: "fal fa-charging-station",
            searchTerms: [ "electric", "ev", "tesla", "vehicle" ]
        }, {
            title: "fas fa-chart-area",
            searchTerms: [ "analytics", "area", "chart", "graph" ]
        }, {
            title: "far fa-chart-area",
            searchTerms: [ "analytics", "area", "chart", "graph" ]
        }, {
            title: "fal fa-chart-area",
            searchTerms: [ "analytics", "area", "chart", "graph" ]
        }, {
            title: "fas fa-chart-bar",
            searchTerms: [ "analytics", "bar", "chart", "graph" ]
        }, {
            title: "far fa-chart-bar",
            searchTerms: [ "analytics", "bar", "chart", "graph" ]
        }, {
            title: "fal fa-chart-bar",
            searchTerms: [ "analytics", "bar", "chart", "graph" ]
        }, {
            title: "fas fa-chart-line",
            searchTerms: [ "activity", "analytics", "chart", "dashboard", "gain", "graph", "increase", "line" ]
        }, {
            title: "far fa-chart-line",
            searchTerms: [ "activity", "analytics", "chart", "dashboard", "gain", "graph", "increase", "line" ]
        }, {
            title: "fal fa-chart-line",
            searchTerms: [ "activity", "analytics", "chart", "dashboard", "gain", "graph", "increase", "line" ]
        }, {
            title: "fas fa-chart-line-down",
            searchTerms: [ "analytics", "chart", "dashboard", "decline", "graph", "line", "loss" ]
        }, {
            title: "far fa-chart-line-down",
            searchTerms: [ "analytics", "chart", "dashboard", "decline", "graph", "line", "loss" ]
        }, {
            title: "fal fa-chart-line-down",
            searchTerms: [ "analytics", "chart", "dashboard", "decline", "graph", "line", "loss" ]
        }, {
            title: "fas fa-chart-network",
            searchTerms: [ "activity", "analytics", "association", "dashboard", "diagram", "distribution", "map", "network" ]
        }, {
            title: "far fa-chart-network",
            searchTerms: [ "activity", "analytics", "association", "dashboard", "diagram", "distribution", "map", "network" ]
        }, {
            title: "fal fa-chart-network",
            searchTerms: [ "activity", "analytics", "association", "dashboard", "diagram", "distribution", "map", "network" ]
        }, {
            title: "fas fa-chart-pie",
            searchTerms: [ "analytics", "chart", "diagram", "graph", "pie" ]
        }, {
            title: "far fa-chart-pie",
            searchTerms: [ "analytics", "chart", "diagram", "graph", "pie" ]
        }, {
            title: "fal fa-chart-pie",
            searchTerms: [ "analytics", "chart", "diagram", "graph", "pie" ]
        }, {
            title: "fas fa-chart-pie-alt",
            searchTerms: [ "analytics", "chart", "diagram", "graph", "pie" ]
        }, {
            title: "far fa-chart-pie-alt",
            searchTerms: [ "analytics", "chart", "diagram", "graph", "pie" ]
        }, {
            title: "fal fa-chart-pie-alt",
            searchTerms: [ "analytics", "chart", "diagram", "graph", "pie" ]
        }, {
            title: "fas fa-chart-scatter",
            searchTerms: [ "analytics", "chart", "diagram", "graph", "plot" ]
        }, {
            title: "far fa-chart-scatter",
            searchTerms: [ "analytics", "chart", "diagram", "graph", "plot" ]
        }, {
            title: "fal fa-chart-scatter",
            searchTerms: [ "analytics", "chart", "diagram", "graph", "plot" ]
        }, {
            title: "fas fa-check",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "far fa-check",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fal fa-check",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fas fa-check-circle",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "far fa-check-circle",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fal fa-check-circle",
            searchTerms: [ "accept", "agree", "confirm", "correct", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fas fa-check-double",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo" ]
        }, {
            title: "far fa-check-double",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo" ]
        }, {
            title: "fal fa-check-double",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "notice", "notification", "notify", "ok", "select", "success", "tick", "todo" ]
        }, {
            title: "fas fa-check-square",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "far fa-check-square",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fal fa-check-square",
            searchTerms: [ "accept", "agree", "checkmark", "confirm", "correct", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fas fa-cheese",
            searchTerms: [ "cheddar", "curd", "gouda", "melt", "parmesan", "sandwich", "swiss", "wedge" ]
        }, {
            title: "far fa-cheese",
            searchTerms: [ "cheddar", "curd", "gouda", "melt", "parmesan", "sandwich", "swiss", "wedge" ]
        }, {
            title: "fal fa-cheese",
            searchTerms: [ "cheddar", "curd", "gouda", "melt", "parmesan", "sandwich", "swiss", "wedge" ]
        }, {
            title: "fas fa-cheese-swiss",
            searchTerms: [ "cheddar", "curd", "gouda", "melt", "parmesan", "sandwich", "swiss", "wedge" ]
        }, {
            title: "far fa-cheese-swiss",
            searchTerms: [ "cheddar", "curd", "gouda", "melt", "parmesan", "sandwich", "swiss", "wedge" ]
        }, {
            title: "fal fa-cheese-swiss",
            searchTerms: [ "cheddar", "curd", "gouda", "melt", "parmesan", "sandwich", "swiss", "wedge" ]
        }, {
            title: "fas fa-cheeseburger",
            searchTerms: [ "bacon", "beef", "burger", "burger king", "fast food", "grill", "ground beef", "hamburger", "mcdonalds", "sandwich", "slider", "wendys", "white castle" ]
        }, {
            title: "far fa-cheeseburger",
            searchTerms: [ "bacon", "beef", "burger", "burger king", "fast food", "grill", "ground beef", "hamburger", "mcdonalds", "sandwich", "slider", "wendys", "white castle" ]
        }, {
            title: "fal fa-cheeseburger",
            searchTerms: [ "bacon", "beef", "burger", "burger king", "fast food", "grill", "ground beef", "hamburger", "mcdonalds", "sandwich", "slider", "wendys", "white castle" ]
        }, {
            title: "fas fa-chess",
            searchTerms: [ "board", "castle", "checkmate", "game", "king", "rook", "strategy", "tournament" ]
        }, {
            title: "far fa-chess",
            searchTerms: [ "board", "castle", "checkmate", "game", "king", "rook", "strategy", "tournament" ]
        }, {
            title: "fal fa-chess",
            searchTerms: [ "board", "castle", "checkmate", "game", "king", "rook", "strategy", "tournament" ]
        }, {
            title: "fas fa-chess-bishop",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-bishop",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-bishop",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chess-bishop-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-bishop-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-bishop-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chess-board",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-board",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-board",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chess-clock",
            searchTerms: [ "board", "checkmate", "game", "strategy", "timer", "tournament" ]
        }, {
            title: "far fa-chess-clock",
            searchTerms: [ "board", "checkmate", "game", "strategy", "timer", "tournament" ]
        }, {
            title: "fal fa-chess-clock",
            searchTerms: [ "board", "checkmate", "game", "strategy", "timer", "tournament" ]
        }, {
            title: "fas fa-chess-clock-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy", "timer", "tournament" ]
        }, {
            title: "far fa-chess-clock-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy", "timer", "tournament" ]
        }, {
            title: "fal fa-chess-clock-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy", "timer", "tournament" ]
        }, {
            title: "fas fa-chess-king",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-king",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-king",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chess-king-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-king-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-king-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chess-knight",
            searchTerms: [ "board", "checkmate", "game", "horse", "strategy" ]
        }, {
            title: "far fa-chess-knight",
            searchTerms: [ "board", "checkmate", "game", "horse", "strategy" ]
        }, {
            title: "fal fa-chess-knight",
            searchTerms: [ "board", "checkmate", "game", "horse", "strategy" ]
        }, {
            title: "fas fa-chess-knight-alt",
            searchTerms: [ "board", "checkmate", "game", "horse", "strategy" ]
        }, {
            title: "far fa-chess-knight-alt",
            searchTerms: [ "board", "checkmate", "game", "horse", "strategy" ]
        }, {
            title: "fal fa-chess-knight-alt",
            searchTerms: [ "board", "checkmate", "game", "horse", "strategy" ]
        }, {
            title: "fas fa-chess-pawn",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-pawn",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-pawn",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chess-pawn-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-pawn-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-pawn-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chess-queen",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-queen",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-queen",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chess-queen-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-queen-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-queen-alt",
            searchTerms: [ "board", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chess-rook",
            searchTerms: [ "board", "castle", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-rook",
            searchTerms: [ "board", "castle", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-rook",
            searchTerms: [ "board", "castle", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chess-rook-alt",
            searchTerms: [ "board", "castle", "checkmate", "game", "strategy" ]
        }, {
            title: "far fa-chess-rook-alt",
            searchTerms: [ "board", "castle", "checkmate", "game", "strategy" ]
        }, {
            title: "fal fa-chess-rook-alt",
            searchTerms: [ "board", "castle", "checkmate", "game", "strategy" ]
        }, {
            title: "fas fa-chevron-circle-down",
            searchTerms: [ "arrow", "download", "dropdown", "menu", "more" ]
        }, {
            title: "far fa-chevron-circle-down",
            searchTerms: [ "arrow", "download", "dropdown", "menu", "more" ]
        }, {
            title: "fal fa-chevron-circle-down",
            searchTerms: [ "arrow", "download", "dropdown", "menu", "more" ]
        }, {
            title: "fas fa-chevron-circle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "far fa-chevron-circle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fal fa-chevron-circle-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fas fa-chevron-circle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "far fa-chevron-circle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fal fa-chevron-circle-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fas fa-chevron-circle-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "far fa-chevron-circle-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "fal fa-chevron-circle-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "fas fa-chevron-double-down",
            searchTerms: [ "arrow", "download", "expand" ]
        }, {
            title: "far fa-chevron-double-down",
            searchTerms: [ "arrow", "download", "expand" ]
        }, {
            title: "fal fa-chevron-double-down",
            searchTerms: [ "arrow", "download", "expand" ]
        }, {
            title: "fas fa-chevron-double-left",
            searchTerms: [ "arrow", "back", "bracket", "previous" ]
        }, {
            title: "far fa-chevron-double-left",
            searchTerms: [ "arrow", "back", "bracket", "previous" ]
        }, {
            title: "fal fa-chevron-double-left",
            searchTerms: [ "arrow", "back", "bracket", "previous" ]
        }, {
            title: "fas fa-chevron-double-right",
            searchTerms: [ "arrow", "bracket", "forward", "next" ]
        }, {
            title: "far fa-chevron-double-right",
            searchTerms: [ "arrow", "bracket", "forward", "next" ]
        }, {
            title: "fal fa-chevron-double-right",
            searchTerms: [ "arrow", "bracket", "forward", "next" ]
        }, {
            title: "fas fa-chevron-double-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "far fa-chevron-double-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "fal fa-chevron-double-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "fas fa-chevron-down",
            searchTerms: [ "arrow", "download", "expand" ]
        }, {
            title: "far fa-chevron-down",
            searchTerms: [ "arrow", "download", "expand" ]
        }, {
            title: "fal fa-chevron-down",
            searchTerms: [ "arrow", "download", "expand" ]
        }, {
            title: "fas fa-chevron-left",
            searchTerms: [ "arrow", "back", "bracket", "previous" ]
        }, {
            title: "far fa-chevron-left",
            searchTerms: [ "arrow", "back", "bracket", "previous" ]
        }, {
            title: "fal fa-chevron-left",
            searchTerms: [ "arrow", "back", "bracket", "previous" ]
        }, {
            title: "fas fa-chevron-right",
            searchTerms: [ "arrow", "bracket", "forward", "next" ]
        }, {
            title: "far fa-chevron-right",
            searchTerms: [ "arrow", "bracket", "forward", "next" ]
        }, {
            title: "fal fa-chevron-right",
            searchTerms: [ "arrow", "bracket", "forward", "next" ]
        }, {
            title: "fas fa-chevron-square-down",
            searchTerms: [ "arrow", "download", "dropdown", "expand", "menu", "more" ]
        }, {
            title: "far fa-chevron-square-down",
            searchTerms: [ "arrow", "download", "dropdown", "expand", "menu", "more" ]
        }, {
            title: "fal fa-chevron-square-down",
            searchTerms: [ "arrow", "download", "dropdown", "expand", "menu", "more" ]
        }, {
            title: "fas fa-chevron-square-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "far fa-chevron-square-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fal fa-chevron-square-left",
            searchTerms: [ "arrow", "back", "previous" ]
        }, {
            title: "fas fa-chevron-square-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "far fa-chevron-square-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fal fa-chevron-square-right",
            searchTerms: [ "arrow", "forward", "next" ]
        }, {
            title: "fas fa-chevron-square-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "far fa-chevron-square-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "fal fa-chevron-square-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "fas fa-chevron-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "far fa-chevron-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "fal fa-chevron-up",
            searchTerms: [ "arrow", "collapse", "upload" ]
        }, {
            title: "fas fa-child",
            searchTerms: [ "boy", "girl", "kid", "toddler", "young" ]
        }, {
            title: "far fa-child",
            searchTerms: [ "boy", "girl", "kid", "toddler", "young" ]
        }, {
            title: "fal fa-child",
            searchTerms: [ "boy", "girl", "kid", "toddler", "young" ]
        }, {
            title: "fas fa-chimney",
            searchTerms: [ "brick", "exhaust", "fireplace", "house", "roof", "vent" ]
        }, {
            title: "far fa-chimney",
            searchTerms: [ "brick", "exhaust", "fireplace", "house", "roof", "vent" ]
        }, {
            title: "fal fa-chimney",
            searchTerms: [ "brick", "exhaust", "fireplace", "house", "roof", "vent" ]
        }, {
            title: "fab fa-chrome",
            searchTerms: [ "browser" ]
        }, {
            title: "fab fa-chromecast",
            searchTerms: []
        }, {
            title: "fas fa-church",
            searchTerms: [ "building", "cathedral", "chapel", "community", "religion" ]
        }, {
            title: "far fa-church",
            searchTerms: [ "building", "cathedral", "chapel", "community", "religion" ]
        }, {
            title: "fal fa-church",
            searchTerms: [ "building", "cathedral", "chapel", "community", "religion" ]
        }, {
            title: "fas fa-circle",
            searchTerms: [ "circle-thin", "diameter", "dot", "ellipse", "notification", "round" ]
        }, {
            title: "far fa-circle",
            searchTerms: [ "circle-thin", "diameter", "dot", "ellipse", "notification", "round" ]
        }, {
            title: "fal fa-circle",
            searchTerms: [ "circle-thin", "diameter", "dot", "ellipse", "notification", "round" ]
        }, {
            title: "fas fa-circle-notch",
            searchTerms: [ "circle-o-notch", "diameter", "dot", "ellipse", "round", "spinner" ]
        }, {
            title: "far fa-circle-notch",
            searchTerms: [ "circle-o-notch", "diameter", "dot", "ellipse", "round", "spinner" ]
        }, {
            title: "fal fa-circle-notch",
            searchTerms: [ "circle-o-notch", "diameter", "dot", "ellipse", "round", "spinner" ]
        }, {
            title: "fas fa-city",
            searchTerms: [ "buildings", "busy", "skyscrapers", "urban", "windows" ]
        }, {
            title: "far fa-city",
            searchTerms: [ "buildings", "busy", "skyscrapers", "urban", "windows" ]
        }, {
            title: "fal fa-city",
            searchTerms: [ "buildings", "busy", "skyscrapers", "urban", "windows" ]
        }, {
            title: "fas fa-clarinet",
            searchTerms: [ "instrument", "jazz", "music", "woodwind" ]
        }, {
            title: "far fa-clarinet",
            searchTerms: [ "instrument", "jazz", "music", "woodwind" ]
        }, {
            title: "fal fa-clarinet",
            searchTerms: [ "instrument", "jazz", "music", "woodwind" ]
        }, {
            title: "fas fa-claw-marks",
            searchTerms: [ "attack", "damage", "halloween", "rip", "scratch", "snikt", "tear", "torn", "wolverine" ]
        }, {
            title: "far fa-claw-marks",
            searchTerms: [ "attack", "damage", "halloween", "rip", "scratch", "snikt", "tear", "torn", "wolverine" ]
        }, {
            title: "fal fa-claw-marks",
            searchTerms: [ "attack", "damage", "halloween", "rip", "scratch", "snikt", "tear", "torn", "wolverine" ]
        }, {
            title: "fas fa-clinic-medical",
            searchTerms: [ "doctor", "general practitioner", "hospital", "infirmary", "medicine", "office", "outpatient" ]
        }, {
            title: "far fa-clinic-medical",
            searchTerms: [ "doctor", "general practitioner", "hospital", "infirmary", "medicine", "office", "outpatient" ]
        }, {
            title: "fal fa-clinic-medical",
            searchTerms: [ "doctor", "general practitioner", "hospital", "infirmary", "medicine", "office", "outpatient" ]
        }, {
            title: "fas fa-clipboard",
            searchTerms: [ "copy", "notes", "paste", "record" ]
        }, {
            title: "far fa-clipboard",
            searchTerms: [ "copy", "notes", "paste", "record" ]
        }, {
            title: "fal fa-clipboard",
            searchTerms: [ "copy", "notes", "paste", "record" ]
        }, {
            title: "fas fa-clipboard-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "far fa-clipboard-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fal fa-clipboard-check",
            searchTerms: [ "accept", "agree", "confirm", "done", "ok", "select", "success", "tick", "todo", "yes" ]
        }, {
            title: "fas fa-clipboard-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "intinerary", "ol", "schedule", "tick", "todo", "ul" ]
        }, {
            title: "far fa-clipboard-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "intinerary", "ol", "schedule", "tick", "todo", "ul" ]
        }, {
            title: "fal fa-clipboard-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "intinerary", "ol", "schedule", "tick", "todo", "ul" ]
        }, {
            title: "fas fa-clipboard-list-check",
            searchTerms: [ "checklist", "completed", "done", "election", "finished", "intinerary", "ol", "schedule", "tick", "todo", "ul", "vote", "voting" ]
        }, {
            title: "far fa-clipboard-list-check",
            searchTerms: [ "checklist", "completed", "done", "election", "finished", "intinerary", "ol", "schedule", "tick", "todo", "ul", "vote", "voting" ]
        }, {
            title: "fal fa-clipboard-list-check",
            searchTerms: [ "checklist", "completed", "done", "election", "finished", "intinerary", "ol", "schedule", "tick", "todo", "ul", "vote", "voting" ]
        }, {
            title: "fas fa-clipboard-prescription",
            searchTerms: [ "copy", "history", "medical", "notes", "paste", "record" ]
        }, {
            title: "far fa-clipboard-prescription",
            searchTerms: [ "copy", "history", "medical", "notes", "paste", "record" ]
        }, {
            title: "fal fa-clipboard-prescription",
            searchTerms: [ "copy", "history", "medical", "notes", "paste", "record" ]
        }, {
            title: "fas fa-clipboard-user",
            searchTerms: [ "attendance", "record", "roster", "staff" ]
        }, {
            title: "far fa-clipboard-user",
            searchTerms: [ "attendance", "record", "roster", "staff" ]
        }, {
            title: "fal fa-clipboard-user",
            searchTerms: [ "attendance", "record", "roster", "staff" ]
        }, {
            title: "fas fa-clock",
            searchTerms: [ "date", "late", "schedule", "time", "timer", "timestamp", "watch" ]
        }, {
            title: "far fa-clock",
            searchTerms: [ "date", "late", "schedule", "time", "timer", "timestamp", "watch" ]
        }, {
            title: "fal fa-clock",
            searchTerms: [ "date", "late", "schedule", "time", "timer", "timestamp", "watch" ]
        }, {
            title: "fas fa-clone",
            searchTerms: [ "arrange", "copy", "duplicate", "paste" ]
        }, {
            title: "far fa-clone",
            searchTerms: [ "arrange", "copy", "duplicate", "paste" ]
        }, {
            title: "fal fa-clone",
            searchTerms: [ "arrange", "copy", "duplicate", "paste" ]
        }, {
            title: "fas fa-closed-captioning",
            searchTerms: [ "cc", "deaf", "hearing", "subtitle", "subtitling", "text", "video" ]
        }, {
            title: "far fa-closed-captioning",
            searchTerms: [ "cc", "deaf", "hearing", "subtitle", "subtitling", "text", "video" ]
        }, {
            title: "fal fa-closed-captioning",
            searchTerms: [ "cc", "deaf", "hearing", "subtitle", "subtitling", "text", "video" ]
        }, {
            title: "fas fa-cloud",
            searchTerms: [ "atmosphere", "fog", "overcast", "save", "upload", "weather" ]
        }, {
            title: "far fa-cloud",
            searchTerms: [ "atmosphere", "fog", "overcast", "save", "upload", "weather" ]
        }, {
            title: "fal fa-cloud",
            searchTerms: [ "atmosphere", "fog", "overcast", "save", "upload", "weather" ]
        }, {
            title: "fas fa-cloud-download",
            searchTerms: [ "download", "export", "save" ]
        }, {
            title: "far fa-cloud-download",
            searchTerms: [ "download", "export", "save" ]
        }, {
            title: "fal fa-cloud-download",
            searchTerms: [ "download", "export", "save" ]
        }, {
            title: "fas fa-cloud-download-alt",
            searchTerms: [ "download", "export", "save" ]
        }, {
            title: "far fa-cloud-download-alt",
            searchTerms: [ "download", "export", "save" ]
        }, {
            title: "fal fa-cloud-download-alt",
            searchTerms: [ "download", "export", "save" ]
        }, {
            title: "fas fa-cloud-drizzle",
            searchTerms: [ "precipitation", "rain", "sprinkle" ]
        }, {
            title: "far fa-cloud-drizzle",
            searchTerms: [ "precipitation", "rain", "sprinkle" ]
        }, {
            title: "fal fa-cloud-drizzle",
            searchTerms: [ "precipitation", "rain", "sprinkle" ]
        }, {
            title: "fas fa-cloud-hail",
            searchTerms: [ "golf balls", "ice", "precipitation", "sleet", "snow", "storm" ]
        }, {
            title: "far fa-cloud-hail",
            searchTerms: [ "golf balls", "ice", "precipitation", "sleet", "snow", "storm" ]
        }, {
            title: "fal fa-cloud-hail",
            searchTerms: [ "golf balls", "ice", "precipitation", "sleet", "snow", "storm" ]
        }, {
            title: "fas fa-cloud-hail-mixed",
            searchTerms: [ "freezing", "ice", "precipitation", "rain", "sleet", "snow", "storm" ]
        }, {
            title: "far fa-cloud-hail-mixed",
            searchTerms: [ "freezing", "ice", "precipitation", "rain", "sleet", "snow", "storm" ]
        }, {
            title: "fal fa-cloud-hail-mixed",
            searchTerms: [ "freezing", "ice", "precipitation", "rain", "sleet", "snow", "storm" ]
        }, {
            title: "fas fa-cloud-meatball",
            searchTerms: [ "FLDSMDFR", "food", "spaghetti", "storm" ]
        }, {
            title: "far fa-cloud-meatball",
            searchTerms: [ "FLDSMDFR", "food", "spaghetti", "storm" ]
        }, {
            title: "fal fa-cloud-meatball",
            searchTerms: [ "FLDSMDFR", "food", "spaghetti", "storm" ]
        }, {
            title: "fas fa-cloud-moon",
            searchTerms: [ "crescent", "evening", "lunar", "night", "partly cloudy", "sky" ]
        }, {
            title: "far fa-cloud-moon",
            searchTerms: [ "crescent", "evening", "lunar", "night", "partly cloudy", "sky" ]
        }, {
            title: "fal fa-cloud-moon",
            searchTerms: [ "crescent", "evening", "lunar", "night", "partly cloudy", "sky" ]
        }, {
            title: "fas fa-cloud-moon-rain",
            searchTerms: [ "crescent", "evening", "lunar", "night", "partly cloudy", "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "far fa-cloud-moon-rain",
            searchTerms: [ "crescent", "evening", "lunar", "night", "partly cloudy", "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fal fa-cloud-moon-rain",
            searchTerms: [ "crescent", "evening", "lunar", "night", "partly cloudy", "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fas fa-cloud-music",
            searchTerms: [ "download", "music", "spotify", "streaming" ]
        }, {
            title: "far fa-cloud-music",
            searchTerms: [ "download", "music", "spotify", "streaming" ]
        }, {
            title: "fal fa-cloud-music",
            searchTerms: [ "download", "music", "spotify", "streaming" ]
        }, {
            title: "fas fa-cloud-rain",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "far fa-cloud-rain",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fal fa-cloud-rain",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fas fa-cloud-rainbow",
            searchTerms: [ "gold", "leprechaun", "prism", "rain", "sky" ]
        }, {
            title: "far fa-cloud-rainbow",
            searchTerms: [ "gold", "leprechaun", "prism", "rain", "sky" ]
        }, {
            title: "fal fa-cloud-rainbow",
            searchTerms: [ "gold", "leprechaun", "prism", "rain", "sky" ]
        }, {
            title: "fas fa-cloud-showers",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "far fa-cloud-showers",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fal fa-cloud-showers",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fas fa-cloud-showers-heavy",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "far fa-cloud-showers-heavy",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fal fa-cloud-showers-heavy",
            searchTerms: [ "precipitation", "rain", "sky", "storm" ]
        }, {
            title: "fas fa-cloud-sleet",
            searchTerms: [ "freezing", "hail", "precipitation", "rain", "winter", "wintry mix" ]
        }, {
            title: "far fa-cloud-sleet",
            searchTerms: [ "freezing", "hail", "precipitation", "rain", "winter", "wintry mix" ]
        }, {
            title: "fal fa-cloud-sleet",
            searchTerms: [ "freezing", "hail", "precipitation", "rain", "winter", "wintry mix" ]
        }, {
            title: "fas fa-cloud-snow",
            searchTerms: [ "blizzard", "noreaster", "precipitation", "winter" ]
        }, {
            title: "far fa-cloud-snow",
            searchTerms: [ "blizzard", "noreaster", "precipitation", "winter" ]
        }, {
            title: "fal fa-cloud-snow",
            searchTerms: [ "blizzard", "noreaster", "precipitation", "winter" ]
        }, {
            title: "fas fa-cloud-sun",
            searchTerms: [ "clear", "day", "daytime", "fall", "outdoors", "overcast", "partly cloudy" ]
        }, {
            title: "far fa-cloud-sun",
            searchTerms: [ "clear", "day", "daytime", "fall", "outdoors", "overcast", "partly cloudy" ]
        }, {
            title: "fal fa-cloud-sun",
            searchTerms: [ "clear", "day", "daytime", "fall", "outdoors", "overcast", "partly cloudy" ]
        }, {
            title: "fas fa-cloud-sun-rain",
            searchTerms: [ "day", "overcast", "precipitation", "storm", "summer", "sunshower" ]
        }, {
            title: "far fa-cloud-sun-rain",
            searchTerms: [ "day", "overcast", "precipitation", "storm", "summer", "sunshower" ]
        }, {
            title: "fal fa-cloud-sun-rain",
            searchTerms: [ "day", "overcast", "precipitation", "storm", "summer", "sunshower" ]
        }, {
            title: "fas fa-cloud-upload",
            searchTerms: [ "import", "save", "upload" ]
        }, {
            title: "far fa-cloud-upload",
            searchTerms: [ "import", "save", "upload" ]
        }, {
            title: "fal fa-cloud-upload",
            searchTerms: [ "import", "save", "upload" ]
        }, {
            title: "fas fa-cloud-upload-alt",
            searchTerms: [ "cloud-upload", "import", "save", "upload" ]
        }, {
            title: "far fa-cloud-upload-alt",
            searchTerms: [ "cloud-upload", "import", "save", "upload" ]
        }, {
            title: "fal fa-cloud-upload-alt",
            searchTerms: [ "cloud-upload", "import", "save", "upload" ]
        }, {
            title: "fas fa-clouds",
            searchTerms: [ "cloudy", "fog", "haze", "overcast", "smoke", "storm", "weather" ]
        }, {
            title: "far fa-clouds",
            searchTerms: [ "cloudy", "fog", "haze", "overcast", "smoke", "storm", "weather" ]
        }, {
            title: "fal fa-clouds",
            searchTerms: [ "cloudy", "fog", "haze", "overcast", "smoke", "storm", "weather" ]
        }, {
            title: "fas fa-clouds-moon",
            searchTerms: [ "cloudy", "moonlight", "night", "overcast", "sky" ]
        }, {
            title: "far fa-clouds-moon",
            searchTerms: [ "cloudy", "moonlight", "night", "overcast", "sky" ]
        }, {
            title: "fal fa-clouds-moon",
            searchTerms: [ "cloudy", "moonlight", "night", "overcast", "sky" ]
        }, {
            title: "fas fa-clouds-sun",
            searchTerms: [ "cloudy", "day", "moonlight", "overcast", "sky", "summer" ]
        }, {
            title: "far fa-clouds-sun",
            searchTerms: [ "cloudy", "day", "moonlight", "overcast", "sky", "summer" ]
        }, {
            title: "fal fa-clouds-sun",
            searchTerms: [ "cloudy", "day", "moonlight", "overcast", "sky", "summer" ]
        }, {
            title: "fab fa-cloudscale",
            searchTerms: []
        }, {
            title: "fab fa-cloudsmith",
            searchTerms: []
        }, {
            title: "fab fa-cloudversify",
            searchTerms: []
        }, {
            title: "fas fa-club",
            searchTerms: [ "card", "game", "poker", "suit" ]
        }, {
            title: "far fa-club",
            searchTerms: [ "card", "game", "poker", "suit" ]
        }, {
            title: "fal fa-club",
            searchTerms: [ "card", "game", "poker", "suit" ]
        }, {
            title: "fas fa-cocktail",
            searchTerms: [ "alcohol", "beverage", "drink", "gin", "glass", "margarita", "martini", "vodka" ]
        }, {
            title: "far fa-cocktail",
            searchTerms: [ "alcohol", "beverage", "drink", "gin", "glass", "margarita", "martini", "vodka" ]
        }, {
            title: "fal fa-cocktail",
            searchTerms: [ "alcohol", "beverage", "drink", "gin", "glass", "margarita", "martini", "vodka" ]
        }, {
            title: "fas fa-code",
            searchTerms: [ "brackets", "code", "development", "html" ]
        }, {
            title: "far fa-code",
            searchTerms: [ "brackets", "code", "development", "html" ]
        }, {
            title: "fal fa-code",
            searchTerms: [ "brackets", "code", "development", "html" ]
        }, {
            title: "fas fa-code-branch",
            searchTerms: [ "branch", "code-fork", "fork", "git", "github", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "far fa-code-branch",
            searchTerms: [ "branch", "code-fork", "fork", "git", "github", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fal fa-code-branch",
            searchTerms: [ "branch", "code-fork", "fork", "git", "github", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fas fa-code-commit",
            searchTerms: [ "commit", "git", "github", "hash", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "far fa-code-commit",
            searchTerms: [ "commit", "git", "github", "hash", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fal fa-code-commit",
            searchTerms: [ "commit", "git", "github", "hash", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fas fa-code-merge",
            searchTerms: [ "git", "github", "merge", "pr", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "far fa-code-merge",
            searchTerms: [ "git", "github", "merge", "pr", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fal fa-code-merge",
            searchTerms: [ "git", "github", "merge", "pr", "rebase", "svn", "vcs", "version" ]
        }, {
            title: "fab fa-codepen",
            searchTerms: []
        }, {
            title: "fab fa-codiepie",
            searchTerms: []
        }, {
            title: "fas fa-coffee",
            searchTerms: [ "beverage", "breakfast", "cafe", "drink", "fall", "morning", "mug", "seasonal", "tea" ]
        }, {
            title: "far fa-coffee",
            searchTerms: [ "beverage", "breakfast", "cafe", "drink", "fall", "morning", "mug", "seasonal", "tea" ]
        }, {
            title: "fal fa-coffee",
            searchTerms: [ "beverage", "breakfast", "cafe", "drink", "fall", "morning", "mug", "seasonal", "tea" ]
        }, {
            title: "fas fa-coffee-pot",
            searchTerms: [ "beverage", "breakfast", "brew", "cafe", "carafe", "drink", "morning" ]
        }, {
            title: "far fa-coffee-pot",
            searchTerms: [ "beverage", "breakfast", "brew", "cafe", "carafe", "drink", "morning" ]
        }, {
            title: "fal fa-coffee-pot",
            searchTerms: [ "beverage", "breakfast", "brew", "cafe", "carafe", "drink", "morning" ]
        }, {
            title: "fas fa-coffee-togo",
            searchTerms: [ "beverage", "breakfast", "cafe", "drink", "latte", "morning", "mug", "starbucks", "takeout", "tea", "travel" ]
        }, {
            title: "far fa-coffee-togo",
            searchTerms: [ "beverage", "breakfast", "cafe", "drink", "latte", "morning", "mug", "starbucks", "takeout", "tea", "travel" ]
        }, {
            title: "fal fa-coffee-togo",
            searchTerms: [ "beverage", "breakfast", "cafe", "drink", "latte", "morning", "mug", "starbucks", "takeout", "tea", "travel" ]
        }, {
            title: "fas fa-coffin",
            searchTerms: [ "box", "burial", "casket", "cemetery", "death", "eulogy", "funeral", "halloween", "vampire" ]
        }, {
            title: "far fa-coffin",
            searchTerms: [ "box", "burial", "casket", "cemetery", "death", "eulogy", "funeral", "halloween", "vampire" ]
        }, {
            title: "fal fa-coffin",
            searchTerms: [ "box", "burial", "casket", "cemetery", "death", "eulogy", "funeral", "halloween", "vampire" ]
        }, {
            title: "fas fa-cog",
            searchTerms: [ "gear", "mechanical", "settings", "sprocket", "wheel" ]
        }, {
            title: "far fa-cog",
            searchTerms: [ "gear", "mechanical", "settings", "sprocket", "wheel" ]
        }, {
            title: "fal fa-cog",
            searchTerms: [ "gear", "mechanical", "settings", "sprocket", "wheel" ]
        }, {
            title: "fas fa-cogs",
            searchTerms: [ "gears", "mechanical", "settings", "sprocket", "wheel" ]
        }, {
            title: "far fa-cogs",
            searchTerms: [ "gears", "mechanical", "settings", "sprocket", "wheel" ]
        }, {
            title: "fal fa-cogs",
            searchTerms: [ "gears", "mechanical", "settings", "sprocket", "wheel" ]
        }, {
            title: "fas fa-coin",
            searchTerms: [ "dime", "money", "nickel", "penny", "quarter" ]
        }, {
            title: "far fa-coin",
            searchTerms: [ "dime", "money", "nickel", "penny", "quarter" ]
        }, {
            title: "fal fa-coin",
            searchTerms: [ "dime", "money", "nickel", "penny", "quarter" ]
        }, {
            title: "fas fa-coins",
            searchTerms: [ "currency", "dime", "financial", "gold", "money", "penny" ]
        }, {
            title: "far fa-coins",
            searchTerms: [ "currency", "dime", "financial", "gold", "money", "penny" ]
        }, {
            title: "fal fa-coins",
            searchTerms: [ "currency", "dime", "financial", "gold", "money", "penny" ]
        }, {
            title: "fas fa-columns",
            searchTerms: [ "browser", "dashboard", "organize", "panes", "split" ]
        }, {
            title: "far fa-columns",
            searchTerms: [ "browser", "dashboard", "organize", "panes", "split" ]
        }, {
            title: "fal fa-columns",
            searchTerms: [ "browser", "dashboard", "organize", "panes", "split" ]
        }, {
            title: "fas fa-comet",
            searchTerms: [ "asteroid", "dust", "ice", "meteor", "orbit", "rock", "shooting star", "solar system", "space" ]
        }, {
            title: "far fa-comet",
            searchTerms: [ "asteroid", "dust", "ice", "meteor", "orbit", "rock", "shooting star", "solar system", "space" ]
        }, {
            title: "fal fa-comet",
            searchTerms: [ "asteroid", "dust", "ice", "meteor", "orbit", "rock", "shooting star", "solar system", "space" ]
        }, {
            title: "fas fa-comment",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-alt",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-alt",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-alt-check",
            searchTerms: [ "accept", "agree", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "select", "sms", "speech", "success", "synced", "texting", "tick", "todo" ]
        }, {
            title: "far fa-comment-alt-check",
            searchTerms: [ "accept", "agree", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "select", "sms", "speech", "success", "synced", "texting", "tick", "todo" ]
        }, {
            title: "fal fa-comment-alt-check",
            searchTerms: [ "accept", "agree", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "select", "sms", "speech", "success", "synced", "texting", "tick", "todo" ]
        }, {
            title: "fas fa-comment-alt-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "far fa-comment-alt-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "fal fa-comment-alt-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "fas fa-comment-alt-dots",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "more", "note", "notification", "reply", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-alt-dots",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "more", "note", "notification", "reply", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt-dots",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "more", "note", "notification", "reply", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-alt-edit",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "edit", "feedback", "message", "note", "notification", "pen", "pencil", "sms", "speech", "texting", "update", "write" ]
        }, {
            title: "far fa-comment-alt-edit",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "edit", "feedback", "message", "note", "notification", "pen", "pencil", "sms", "speech", "texting", "update", "write" ]
        }, {
            title: "fal fa-comment-alt-edit",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "edit", "feedback", "message", "note", "notification", "pen", "pencil", "sms", "speech", "texting", "update", "write" ]
        }, {
            title: "fas fa-comment-alt-exclamation",
            searchTerms: [ "alert", "bubble", "chat", "commenting", "conversation", "exclaim", "feedback", "important", "message", "note", "notification", "sms", "speech", "surprise", "texting" ]
        }, {
            title: "far fa-comment-alt-exclamation",
            searchTerms: [ "alert", "bubble", "chat", "commenting", "conversation", "exclaim", "feedback", "important", "message", "note", "notification", "sms", "speech", "surprise", "texting" ]
        }, {
            title: "fal fa-comment-alt-exclamation",
            searchTerms: [ "alert", "bubble", "chat", "commenting", "conversation", "exclaim", "feedback", "important", "message", "note", "notification", "sms", "speech", "surprise", "texting" ]
        }, {
            title: "fas fa-comment-alt-lines",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-alt-lines",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt-lines",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-alt-medical",
            searchTerms: [ "advice", "bubble", "chat", "commenting", "conversation", "diagnose", "feedback", "message", "note", "notification", "prescription", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-alt-medical",
            searchTerms: [ "advice", "bubble", "chat", "commenting", "conversation", "diagnose", "feedback", "message", "note", "notification", "prescription", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt-medical",
            searchTerms: [ "advice", "bubble", "chat", "commenting", "conversation", "diagnose", "feedback", "message", "note", "notification", "prescription", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-alt-minus",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "negative", "note", "notification", "remove", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-alt-minus",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "negative", "note", "notification", "remove", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt-minus",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "negative", "note", "notification", "remove", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-alt-music",
            searchTerms: [ "chat", "commenting", "conversation", "create", "message", "music", "note", "notification", "sing", "sms", "song", "texting" ]
        }, {
            title: "far fa-comment-alt-music",
            searchTerms: [ "chat", "commenting", "conversation", "create", "message", "music", "note", "notification", "sing", "sms", "song", "texting" ]
        }, {
            title: "fal fa-comment-alt-music",
            searchTerms: [ "chat", "commenting", "conversation", "create", "message", "music", "note", "notification", "sing", "sms", "song", "texting" ]
        }, {
            title: "fas fa-comment-alt-plus",
            searchTerms: [ "add", "bubble", "chat", "commenting", "conversation", "create", "feedback", "message", "new", "note", "notification", "positive", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-alt-plus",
            searchTerms: [ "add", "bubble", "chat", "commenting", "conversation", "create", "feedback", "message", "new", "note", "notification", "positive", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt-plus",
            searchTerms: [ "add", "bubble", "chat", "commenting", "conversation", "create", "feedback", "message", "new", "note", "notification", "positive", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-alt-slash",
            searchTerms: [ "bubble", "cancel", "chat", "commenting", "conversation", "feedback", "message", "mute", "note", "notification", "quiet", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-alt-slash",
            searchTerms: [ "bubble", "cancel", "chat", "commenting", "conversation", "feedback", "message", "mute", "note", "notification", "quiet", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt-slash",
            searchTerms: [ "bubble", "cancel", "chat", "commenting", "conversation", "feedback", "message", "mute", "note", "notification", "quiet", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-alt-smile",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "emoji", "feedback", "happy", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-alt-smile",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "emoji", "feedback", "happy", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-alt-smile",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "emoji", "feedback", "happy", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-alt-times",
            searchTerms: [ "archive", "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "note", "notification", "remove", "sms", "speech", "texting", "x" ]
        }, {
            title: "far fa-comment-alt-times",
            searchTerms: [ "archive", "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "note", "notification", "remove", "sms", "speech", "texting", "x" ]
        }, {
            title: "fal fa-comment-alt-times",
            searchTerms: [ "archive", "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "note", "notification", "remove", "sms", "speech", "texting", "x" ]
        }, {
            title: "fas fa-comment-check",
            searchTerms: [ "accept", "agree", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "select", "sms", "speech", "success", "synced", "texting", "tick", "todo" ]
        }, {
            title: "far fa-comment-check",
            searchTerms: [ "accept", "agree", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "select", "sms", "speech", "success", "synced", "texting", "tick", "todo" ]
        }, {
            title: "fal fa-comment-check",
            searchTerms: [ "accept", "agree", "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "select", "sms", "speech", "success", "synced", "texting", "tick", "todo" ]
        }, {
            title: "fas fa-comment-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "far fa-comment-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "fal fa-comment-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "fas fa-comment-dots",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "more", "note", "notification", "reply", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-dots",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "more", "note", "notification", "reply", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-dots",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "more", "note", "notification", "reply", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-edit",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "edit", "feedback", "message", "note", "notification", "pen", "pencil", "sms", "speech", "texting", "update", "write" ]
        }, {
            title: "far fa-comment-edit",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "edit", "feedback", "message", "note", "notification", "pen", "pencil", "sms", "speech", "texting", "update", "write" ]
        }, {
            title: "fal fa-comment-edit",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "edit", "feedback", "message", "note", "notification", "pen", "pencil", "sms", "speech", "texting", "update", "write" ]
        }, {
            title: "fas fa-comment-exclamation",
            searchTerms: [ "alert", "bubble", "chat", "commenting", "conversation", "exclaim", "feedback", "important", "message", "note", "notification", "sms", "speech", "surprise", "texting" ]
        }, {
            title: "far fa-comment-exclamation",
            searchTerms: [ "alert", "bubble", "chat", "commenting", "conversation", "exclaim", "feedback", "important", "message", "note", "notification", "sms", "speech", "surprise", "texting" ]
        }, {
            title: "fal fa-comment-exclamation",
            searchTerms: [ "alert", "bubble", "chat", "commenting", "conversation", "exclaim", "feedback", "important", "message", "note", "notification", "sms", "speech", "surprise", "texting" ]
        }, {
            title: "fas fa-comment-lines",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-lines",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-lines",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-medical",
            searchTerms: [ "advice", "bubble", "chat", "commenting", "conversation", "diagnose", "feedback", "message", "note", "notification", "prescription", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-medical",
            searchTerms: [ "advice", "bubble", "chat", "commenting", "conversation", "diagnose", "feedback", "message", "note", "notification", "prescription", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-medical",
            searchTerms: [ "advice", "bubble", "chat", "commenting", "conversation", "diagnose", "feedback", "message", "note", "notification", "prescription", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-minus",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "negative", "note", "notification", "remove", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-minus",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "negative", "note", "notification", "remove", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-minus",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "negative", "note", "notification", "remove", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-music",
            searchTerms: [ "chat", "commenting", "conversation", "create", "message", "music", "note", "notification", "sing", "sms", "song", "texting" ]
        }, {
            title: "far fa-comment-music",
            searchTerms: [ "chat", "commenting", "conversation", "create", "message", "music", "note", "notification", "sing", "sms", "song", "texting" ]
        }, {
            title: "fal fa-comment-music",
            searchTerms: [ "chat", "commenting", "conversation", "create", "message", "music", "note", "notification", "sing", "sms", "song", "texting" ]
        }, {
            title: "fas fa-comment-plus",
            searchTerms: [ "add", "bubble", "chat", "commenting", "conversation", "create", "feedback", "message", "new", "note", "notification", "positive", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-plus",
            searchTerms: [ "add", "bubble", "chat", "commenting", "conversation", "create", "feedback", "message", "new", "note", "notification", "positive", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-plus",
            searchTerms: [ "add", "bubble", "chat", "commenting", "conversation", "create", "feedback", "message", "new", "note", "notification", "positive", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-slash",
            searchTerms: [ "bubble", "cancel", "chat", "commenting", "conversation", "feedback", "message", "mute", "note", "notification", "quiet", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-slash",
            searchTerms: [ "bubble", "cancel", "chat", "commenting", "conversation", "feedback", "message", "mute", "note", "notification", "quiet", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-slash",
            searchTerms: [ "bubble", "cancel", "chat", "commenting", "conversation", "feedback", "message", "mute", "note", "notification", "quiet", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-smile",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "emoji", "feedback", "happy", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comment-smile",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "emoji", "feedback", "happy", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comment-smile",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "emoji", "feedback", "happy", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comment-times",
            searchTerms: [ "archive", "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "note", "notification", "remove", "sms", "speech", "texting", "x" ]
        }, {
            title: "far fa-comment-times",
            searchTerms: [ "archive", "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "note", "notification", "remove", "sms", "speech", "texting", "x" ]
        }, {
            title: "fal fa-comment-times",
            searchTerms: [ "archive", "bubble", "chat", "commenting", "conversation", "delete", "feedback", "message", "note", "notification", "remove", "sms", "speech", "texting", "x" ]
        }, {
            title: "fas fa-comments",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comments",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comments",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comments-alt",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "far fa-comments-alt",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fal fa-comments-alt",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "note", "notification", "sms", "speech", "texting" ]
        }, {
            title: "fas fa-comments-alt-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "far fa-comments-alt-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "fal fa-comments-alt-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "fas fa-comments-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "far fa-comments-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "fal fa-comments-dollar",
            searchTerms: [ "bubble", "chat", "commenting", "conversation", "feedback", "message", "money", "note", "notification", "pay", "sms", "speech", "spend", "texting", "transfer" ]
        }, {
            title: "fas fa-compact-disc",
            searchTerms: [ "album", "bluray", "cd", "disc", "dvd", "media", "movie", "music", "record", "video", "vinyl" ]
        }, {
            title: "far fa-compact-disc",
            searchTerms: [ "album", "bluray", "cd", "disc", "dvd", "media", "movie", "music", "record", "video", "vinyl" ]
        }, {
            title: "fal fa-compact-disc",
            searchTerms: [ "album", "bluray", "cd", "disc", "dvd", "media", "movie", "music", "record", "video", "vinyl" ]
        }, {
            title: "fas fa-compass",
            searchTerms: [ "directions", "directory", "location", "menu", "navigation", "safari", "travel" ]
        }, {
            title: "far fa-compass",
            searchTerms: [ "directions", "directory", "location", "menu", "navigation", "safari", "travel" ]
        }, {
            title: "fal fa-compass",
            searchTerms: [ "directions", "directory", "location", "menu", "navigation", "safari", "travel" ]
        }, {
            title: "fas fa-compass-slash",
            searchTerms: [ "directions", "directory", "location", "lost", "menu", "navigation", "safari", "travel" ]
        }, {
            title: "far fa-compass-slash",
            searchTerms: [ "directions", "directory", "location", "lost", "menu", "navigation", "safari", "travel" ]
        }, {
            title: "fal fa-compass-slash",
            searchTerms: [ "directions", "directory", "location", "lost", "menu", "navigation", "safari", "travel" ]
        }, {
            title: "fas fa-compress",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "far fa-compress",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fal fa-compress",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fas fa-compress-alt",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "far fa-compress-alt",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fal fa-compress-alt",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fas fa-compress-arrows-alt",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "far fa-compress-arrows-alt",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fal fa-compress-arrows-alt",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fas fa-compress-wide",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "far fa-compress-wide",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fal fa-compress-wide",
            searchTerms: [ "collapse", "fullscreen", "minimize", "move", "resize", "shrink", "smaller" ]
        }, {
            title: "fas fa-computer-classic",
            searchTerms: [ "apple II", "hardware", "machine", "macintosh", "programming", "retro", "vintage" ]
        }, {
            title: "far fa-computer-classic",
            searchTerms: [ "apple II", "hardware", "machine", "macintosh", "programming", "retro", "vintage" ]
        }, {
            title: "fal fa-computer-classic",
            searchTerms: [ "apple II", "hardware", "machine", "macintosh", "programming", "retro", "vintage" ]
        }, {
            title: "fas fa-computer-speaker",
            searchTerms: [ "airplay", "bluetooth", "devices", "music", "output", "pair", "sound", "sync" ]
        }, {
            title: "far fa-computer-speaker",
            searchTerms: [ "airplay", "bluetooth", "devices", "music", "output", "pair", "sound", "sync" ]
        }, {
            title: "fal fa-computer-speaker",
            searchTerms: [ "airplay", "bluetooth", "devices", "music", "output", "pair", "sound", "sync" ]
        }, {
            title: "fas fa-concierge-bell",
            searchTerms: [ "attention", "hotel", "receptionist", "service", "support" ]
        }, {
            title: "far fa-concierge-bell",
            searchTerms: [ "attention", "hotel", "receptionist", "service", "support" ]
        }, {
            title: "fal fa-concierge-bell",
            searchTerms: [ "attention", "hotel", "receptionist", "service", "support" ]
        }, {
            title: "fab fa-confluence",
            searchTerms: [ "atlassian" ]
        }, {
            title: "fab fa-connectdevelop",
            searchTerms: []
        }, {
            title: "fas fa-construction",
            searchTerms: [ "building", "digging", "project", "structure" ]
        }, {
            title: "far fa-construction",
            searchTerms: [ "building", "digging", "project", "structure" ]
        }, {
            title: "fal fa-construction",
            searchTerms: [ "building", "digging", "project", "structure" ]
        }, {
            title: "fas fa-container-storage",
            searchTerms: [ "archive", "box", "inventory", "shipping", "warehouse" ]
        }, {
            title: "far fa-container-storage",
            searchTerms: [ "archive", "box", "inventory", "shipping", "warehouse" ]
        }, {
            title: "fal fa-container-storage",
            searchTerms: [ "archive", "box", "inventory", "shipping", "warehouse" ]
        }, {
            title: "fab fa-contao",
            searchTerms: []
        }, {
            title: "fas fa-conveyor-belt",
            searchTerms: [ "carousel", "inventory", "manufacture", "packaging", "shipping" ]
        }, {
            title: "far fa-conveyor-belt",
            searchTerms: [ "carousel", "inventory", "manufacture", "packaging", "shipping" ]
        }, {
            title: "fal fa-conveyor-belt",
            searchTerms: [ "carousel", "inventory", "manufacture", "packaging", "shipping" ]
        }, {
            title: "fas fa-conveyor-belt-alt",
            searchTerms: [ "carousel", "inventory", "manufacture", "packaging", "shipping" ]
        }, {
            title: "far fa-conveyor-belt-alt",
            searchTerms: [ "carousel", "inventory", "manufacture", "packaging", "shipping" ]
        }, {
            title: "fal fa-conveyor-belt-alt",
            searchTerms: [ "carousel", "inventory", "manufacture", "packaging", "shipping" ]
        }, {
            title: "fas fa-cookie",
            searchTerms: [ "baked good", "chips", "chocolate", "eat", "snack", "sweet", "treat" ]
        }, {
            title: "far fa-cookie",
            searchTerms: [ "baked good", "chips", "chocolate", "eat", "snack", "sweet", "treat" ]
        }, {
            title: "fal fa-cookie",
            searchTerms: [ "baked good", "chips", "chocolate", "eat", "snack", "sweet", "treat" ]
        }, {
            title: "fas fa-cookie-bite",
            searchTerms: [ "baked good", "bitten", "chips", "chocolate", "eat", "snack", "sweet", "treat" ]
        }, {
            title: "far fa-cookie-bite",
            searchTerms: [ "baked good", "bitten", "chips", "chocolate", "eat", "snack", "sweet", "treat" ]
        }, {
            title: "fal fa-cookie-bite",
            searchTerms: [ "baked good", "bitten", "chips", "chocolate", "eat", "snack", "sweet", "treat" ]
        }, {
            title: "fas fa-copy",
            searchTerms: [ "clone", "duplicate", "file", "files-o", "paper", "paste" ]
        }, {
            title: "far fa-copy",
            searchTerms: [ "clone", "duplicate", "file", "files-o", "paper", "paste" ]
        }, {
            title: "fal fa-copy",
            searchTerms: [ "clone", "duplicate", "file", "files-o", "paper", "paste" ]
        }, {
            title: "fas fa-copyright",
            searchTerms: [ "brand", "mark", "register", "trademark" ]
        }, {
            title: "far fa-copyright",
            searchTerms: [ "brand", "mark", "register", "trademark" ]
        }, {
            title: "fal fa-copyright",
            searchTerms: [ "brand", "mark", "register", "trademark" ]
        }, {
            title: "fas fa-corn",
            searchTerms: [ "cob", "ear", "fall", "grain", "kernel", "maize", "popcorn" ]
        }, {
            title: "far fa-corn",
            searchTerms: [ "cob", "ear", "fall", "grain", "kernel", "maize", "popcorn" ]
        }, {
            title: "fal fa-corn",
            searchTerms: [ "cob", "ear", "fall", "grain", "kernel", "maize", "popcorn" ]
        }, {
            title: "fab fa-cotton-bureau",
            searchTerms: [ "clothing", "t-shirts", "tshirts" ]
        }, {
            title: "fas fa-couch",
            searchTerms: [ "chair", "cushion", "furniture", "relax", "sofa" ]
        }, {
            title: "far fa-couch",
            searchTerms: [ "chair", "cushion", "furniture", "relax", "sofa" ]
        }, {
            title: "fal fa-couch",
            searchTerms: [ "chair", "cushion", "furniture", "relax", "sofa" ]
        }, {
            title: "fas fa-cow",
            searchTerms: [ "agriculture", "animal", "beef", "bovine", "farm", "fauna", "mammal", "milk", "moo" ]
        }, {
            title: "far fa-cow",
            searchTerms: [ "agriculture", "animal", "beef", "bovine", "farm", "fauna", "mammal", "milk", "moo" ]
        }, {
            title: "fal fa-cow",
            searchTerms: [ "agriculture", "animal", "beef", "bovine", "farm", "fauna", "mammal", "milk", "moo" ]
        }, {
            title: "fas fa-cowbell",
            searchTerms: [ "Blue Öyster Cult", "Christopher Walken", "SNL", "The Bruce Dickinson", "Will Ferrell", "music" ]
        }, {
            title: "far fa-cowbell",
            searchTerms: [ "Blue Öyster Cult", "Christopher Walken", "SNL", "The Bruce Dickinson", "Will Ferrell", "music" ]
        }, {
            title: "fal fa-cowbell",
            searchTerms: [ "Blue Öyster Cult", "Christopher Walken", "SNL", "The Bruce Dickinson", "Will Ferrell", "music" ]
        }, {
            title: "fas fa-cowbell-more",
            searchTerms: [ "Blue Öyster Cult", "Christopher Walken", "SNL", "The Bruce Dickinson", "Will Ferrell", "music" ]
        }, {
            title: "far fa-cowbell-more",
            searchTerms: [ "Blue Öyster Cult", "Christopher Walken", "SNL", "The Bruce Dickinson", "Will Ferrell", "music" ]
        }, {
            title: "fal fa-cowbell-more",
            searchTerms: [ "Blue Öyster Cult", "Christopher Walken", "SNL", "The Bruce Dickinson", "Will Ferrell", "music" ]
        }, {
            title: "fab fa-cpanel",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-by",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nc",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nc-eu",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nc-jp",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nd",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-pd",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-pd-alt",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-remix",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-sa",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-sampling",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-sampling-plus",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-share",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-zero",
            searchTerms: []
        }, {
            title: "fas fa-credit-card",
            searchTerms: [ "buy", "checkout", "credit-card-alt", "debit", "money", "payment", "purchase" ]
        }, {
            title: "far fa-credit-card",
            searchTerms: [ "buy", "checkout", "credit-card-alt", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fal fa-credit-card",
            searchTerms: [ "buy", "checkout", "credit-card-alt", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fas fa-credit-card-blank",
            searchTerms: [ "buy", "checkout", "debit", "money", "payment", "purchase" ]
        }, {
            title: "far fa-credit-card-blank",
            searchTerms: [ "buy", "checkout", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fal fa-credit-card-blank",
            searchTerms: [ "buy", "checkout", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fas fa-credit-card-front",
            searchTerms: [ "buy", "checkout", "chip", "debit", "money", "payment", "purchase" ]
        }, {
            title: "far fa-credit-card-front",
            searchTerms: [ "buy", "checkout", "chip", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fal fa-credit-card-front",
            searchTerms: [ "buy", "checkout", "chip", "debit", "money", "payment", "purchase" ]
        }, {
            title: "fas fa-cricket",
            searchTerms: [ "ball", "bat", "bowling", "wicket" ]
        }, {
            title: "far fa-cricket",
            searchTerms: [ "ball", "bat", "bowling", "wicket" ]
        }, {
            title: "fal fa-cricket",
            searchTerms: [ "ball", "bat", "bowling", "wicket" ]
        }, {
            title: "fab fa-critical-role",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop" ]
        }, {
            title: "fas fa-croissant",
            searchTerms: [ "bakery", "breakfast", "brioche", "butter", "crescent", "dough", "gluten", "pastry", "roll" ]
        }, {
            title: "far fa-croissant",
            searchTerms: [ "bakery", "breakfast", "brioche", "butter", "crescent", "dough", "gluten", "pastry", "roll" ]
        }, {
            title: "fal fa-croissant",
            searchTerms: [ "bakery", "breakfast", "brioche", "butter", "crescent", "dough", "gluten", "pastry", "roll" ]
        }, {
            title: "fas fa-crop",
            searchTerms: [ "design", "frame", "mask", "resize", "shrink" ]
        }, {
            title: "far fa-crop",
            searchTerms: [ "design", "frame", "mask", "resize", "shrink" ]
        }, {
            title: "fal fa-crop",
            searchTerms: [ "design", "frame", "mask", "resize", "shrink" ]
        }, {
            title: "fas fa-crop-alt",
            searchTerms: [ "design", "frame", "mask", "resize", "shrink" ]
        }, {
            title: "far fa-crop-alt",
            searchTerms: [ "design", "frame", "mask", "resize", "shrink" ]
        }, {
            title: "fal fa-crop-alt",
            searchTerms: [ "design", "frame", "mask", "resize", "shrink" ]
        }, {
            title: "fas fa-cross",
            searchTerms: [ "catholicism", "christianity", "church", "jesus" ]
        }, {
            title: "far fa-cross",
            searchTerms: [ "catholicism", "christianity", "church", "jesus" ]
        }, {
            title: "fal fa-cross",
            searchTerms: [ "catholicism", "christianity", "church", "jesus" ]
        }, {
            title: "fas fa-crosshairs",
            searchTerms: [ "aim", "bullseye", "gpd", "picker", "position" ]
        }, {
            title: "far fa-crosshairs",
            searchTerms: [ "aim", "bullseye", "gpd", "picker", "position" ]
        }, {
            title: "fal fa-crosshairs",
            searchTerms: [ "aim", "bullseye", "gpd", "picker", "position" ]
        }, {
            title: "fas fa-crow",
            searchTerms: [ "bird", "bullfrog", "fauna", "halloween", "holiday", "toad" ]
        }, {
            title: "far fa-crow",
            searchTerms: [ "bird", "bullfrog", "fauna", "halloween", "holiday", "toad" ]
        }, {
            title: "fal fa-crow",
            searchTerms: [ "bird", "bullfrog", "fauna", "halloween", "holiday", "toad" ]
        }, {
            title: "fas fa-crown",
            searchTerms: [ "award", "favorite", "king", "queen", "royal", "tiara" ]
        }, {
            title: "far fa-crown",
            searchTerms: [ "award", "favorite", "king", "queen", "royal", "tiara" ]
        }, {
            title: "fal fa-crown",
            searchTerms: [ "award", "favorite", "king", "queen", "royal", "tiara" ]
        }, {
            title: "fas fa-crutch",
            searchTerms: [ "cane", "injury", "mobility", "wheelchair" ]
        }, {
            title: "far fa-crutch",
            searchTerms: [ "cane", "injury", "mobility", "wheelchair" ]
        }, {
            title: "fal fa-crutch",
            searchTerms: [ "cane", "injury", "mobility", "wheelchair" ]
        }, {
            title: "fas fa-crutches",
            searchTerms: [ "cane", "injury", "mobility", "wheelchair" ]
        }, {
            title: "far fa-crutches",
            searchTerms: [ "cane", "injury", "mobility", "wheelchair" ]
        }, {
            title: "fal fa-crutches",
            searchTerms: [ "cane", "injury", "mobility", "wheelchair" ]
        }, {
            title: "fab fa-css3",
            searchTerms: [ "code" ]
        }, {
            title: "fab fa-css3-alt",
            searchTerms: []
        }, {
            title: "fas fa-cube",
            searchTerms: [ "3d", "block", "dice", "package", "square", "tesseract" ]
        }, {
            title: "far fa-cube",
            searchTerms: [ "3d", "block", "dice", "package", "square", "tesseract" ]
        }, {
            title: "fal fa-cube",
            searchTerms: [ "3d", "block", "dice", "package", "square", "tesseract" ]
        }, {
            title: "fas fa-cubes",
            searchTerms: [ "3d", "block", "dice", "package", "pyramid", "square", "stack", "tesseract" ]
        }, {
            title: "far fa-cubes",
            searchTerms: [ "3d", "block", "dice", "package", "pyramid", "square", "stack", "tesseract" ]
        }, {
            title: "fal fa-cubes",
            searchTerms: [ "3d", "block", "dice", "package", "pyramid", "square", "stack", "tesseract" ]
        }, {
            title: "fas fa-curling",
            searchTerms: [ "ice", "olympics", "sport", "stone" ]
        }, {
            title: "far fa-curling",
            searchTerms: [ "ice", "olympics", "sport", "stone" ]
        }, {
            title: "fal fa-curling",
            searchTerms: [ "ice", "olympics", "sport", "stone" ]
        }, {
            title: "fas fa-cut",
            searchTerms: [ "clip", "scissors", "snip" ]
        }, {
            title: "far fa-cut",
            searchTerms: [ "clip", "scissors", "snip" ]
        }, {
            title: "fal fa-cut",
            searchTerms: [ "clip", "scissors", "snip" ]
        }, {
            title: "fab fa-cuttlefish",
            searchTerms: []
        }, {
            title: "fab fa-d-and-d",
            searchTerms: []
        }, {
            title: "fab fa-d-and-d-beyond",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "gaming", "tabletop" ]
        }, {
            title: "fas fa-dagger",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "melee attack", "rogue", "sting", "weapon" ]
        }, {
            title: "far fa-dagger",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "melee attack", "rogue", "sting", "weapon" ]
        }, {
            title: "fal fa-dagger",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "melee attack", "rogue", "sting", "weapon" ]
        }, {
            title: "fab fa-dashcube",
            searchTerms: []
        }, {
            title: "fas fa-database",
            searchTerms: [ "computer", "development", "directory", "memory", "storage" ]
        }, {
            title: "far fa-database",
            searchTerms: [ "computer", "development", "directory", "memory", "storage" ]
        }, {
            title: "fal fa-database",
            searchTerms: [ "computer", "development", "directory", "memory", "storage" ]
        }, {
            title: "fas fa-deaf",
            searchTerms: [ "ear", "hearing", "sign language" ]
        }, {
            title: "far fa-deaf",
            searchTerms: [ "ear", "hearing", "sign language" ]
        }, {
            title: "fal fa-deaf",
            searchTerms: [ "ear", "hearing", "sign language" ]
        }, {
            title: "fas fa-debug",
            searchTerms: [ "error", "fix", "optimize", "warning" ]
        }, {
            title: "far fa-debug",
            searchTerms: [ "error", "fix", "optimize", "warning" ]
        }, {
            title: "fal fa-debug",
            searchTerms: [ "error", "fix", "optimize", "warning" ]
        }, {
            title: "fas fa-deer",
            searchTerms: [ "animal", "antlers", "blitzen", "comet", "cupid", "dancer", "dasher", "donner", "fauna", "mammal", "prancer", "reindeer", "vixen" ]
        }, {
            title: "far fa-deer",
            searchTerms: [ "animal", "antlers", "blitzen", "comet", "cupid", "dancer", "dasher", "donner", "fauna", "mammal", "prancer", "reindeer", "vixen" ]
        }, {
            title: "fal fa-deer",
            searchTerms: [ "animal", "antlers", "blitzen", "comet", "cupid", "dancer", "dasher", "donner", "fauna", "mammal", "prancer", "reindeer", "vixen" ]
        }, {
            title: "fas fa-deer-rudolph",
            searchTerms: [ "animal", "antlers", "fauna", "mammal", "reindeer" ]
        }, {
            title: "far fa-deer-rudolph",
            searchTerms: [ "animal", "antlers", "fauna", "mammal", "reindeer" ]
        }, {
            title: "fal fa-deer-rudolph",
            searchTerms: [ "animal", "antlers", "fauna", "mammal", "reindeer" ]
        }, {
            title: "fab fa-delicious",
            searchTerms: []
        }, {
            title: "fas fa-democrat",
            searchTerms: [ "american", "democratic party", "donkey", "election", "left", "left-wing", "liberal", "politics", "usa" ]
        }, {
            title: "far fa-democrat",
            searchTerms: [ "american", "democratic party", "donkey", "election", "left", "left-wing", "liberal", "politics", "usa" ]
        }, {
            title: "fal fa-democrat",
            searchTerms: [ "american", "democratic party", "donkey", "election", "left", "left-wing", "liberal", "politics", "usa" ]
        }, {
            title: "fab fa-deploydog",
            searchTerms: []
        }, {
            title: "fab fa-deskpro",
            searchTerms: []
        }, {
            title: "fas fa-desktop",
            searchTerms: [ "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "pc", "screen" ]
        }, {
            title: "far fa-desktop",
            searchTerms: [ "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "pc", "screen" ]
        }, {
            title: "fal fa-desktop",
            searchTerms: [ "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "pc", "screen" ]
        }, {
            title: "fas fa-desktop-alt",
            searchTerms: [ "apple", "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "screen" ]
        }, {
            title: "far fa-desktop-alt",
            searchTerms: [ "apple", "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "screen" ]
        }, {
            title: "fal fa-desktop-alt",
            searchTerms: [ "apple", "computer", "cpu", "demo", "desktop", "device", "imac", "machine", "monitor", "screen" ]
        }, {
            title: "fab fa-dev",
            searchTerms: []
        }, {
            title: "fab fa-deviantart",
            searchTerms: []
        }, {
            title: "fas fa-dewpoint",
            searchTerms: [ "air", "fog", "humidity", "temperature", "water" ]
        }, {
            title: "far fa-dewpoint",
            searchTerms: [ "air", "fog", "humidity", "temperature", "water" ]
        }, {
            title: "fal fa-dewpoint",
            searchTerms: [ "air", "fog", "humidity", "temperature", "water" ]
        }, {
            title: "fas fa-dharmachakra",
            searchTerms: [ "buddhism", "buddhist", "wheel of dharma" ]
        }, {
            title: "far fa-dharmachakra",
            searchTerms: [ "buddhism", "buddhist", "wheel of dharma" ]
        }, {
            title: "fal fa-dharmachakra",
            searchTerms: [ "buddhism", "buddhist", "wheel of dharma" ]
        }, {
            title: "fab fa-dhl",
            searchTerms: [ "Dalsey", "Hillblom and Lynn", "german", "package", "shipping" ]
        }, {
            title: "fas fa-diagnoses",
            searchTerms: [ "analyze", "detect", "diagnosis", "examine", "medicine" ]
        }, {
            title: "far fa-diagnoses",
            searchTerms: [ "analyze", "detect", "diagnosis", "examine", "medicine" ]
        }, {
            title: "fal fa-diagnoses",
            searchTerms: [ "analyze", "detect", "diagnosis", "examine", "medicine" ]
        }, {
            title: "fas fa-diamond",
            searchTerms: [ "cards", "gem", "gemstone", "poker", "suit" ]
        }, {
            title: "far fa-diamond",
            searchTerms: [ "cards", "gem", "gemstone", "poker", "suit" ]
        }, {
            title: "fal fa-diamond",
            searchTerms: [ "cards", "gem", "gemstone", "poker", "suit" ]
        }, {
            title: "fab fa-diaspora",
            searchTerms: []
        }, {
            title: "fas fa-dice",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-d10",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-d10",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d10",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-d12",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-d12",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d12",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-d20",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-d20",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d20",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-d4",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-d4",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d4",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-d6",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-d6",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d6",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-d8",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-d8",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-d8",
            searchTerms: [ "Dungeons & Dragons", "chance", "d&d", "dnd", "fantasy", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-five",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-five",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-five",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-four",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-four",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-four",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-one",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-one",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-one",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-six",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-six",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-six",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-three",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-three",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-three",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fas fa-dice-two",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "far fa-dice-two",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fal fa-dice-two",
            searchTerms: [ "chance", "gambling", "game", "roll" ]
        }, {
            title: "fab fa-digg",
            searchTerms: []
        }, {
            title: "fas fa-digging",
            searchTerms: [ "building", "construction", "labor", "shovel" ]
        }, {
            title: "far fa-digging",
            searchTerms: [ "building", "construction", "labor", "shovel" ]
        }, {
            title: "fal fa-digging",
            searchTerms: [ "building", "construction", "labor", "shovel" ]
        }, {
            title: "fab fa-digital-ocean",
            searchTerms: []
        }, {
            title: "fas fa-digital-tachograph",
            searchTerms: [ "data", "distance", "speed", "tachometer" ]
        }, {
            title: "far fa-digital-tachograph",
            searchTerms: [ "data", "distance", "speed", "tachometer" ]
        }, {
            title: "fal fa-digital-tachograph",
            searchTerms: [ "data", "distance", "speed", "tachometer" ]
        }, {
            title: "fas fa-diploma",
            searchTerms: [ "award", "certificate", "college", "education", "graduate", "graduation", "university" ]
        }, {
            title: "far fa-diploma",
            searchTerms: [ "award", "certificate", "college", "education", "graduate", "graduation", "university" ]
        }, {
            title: "fal fa-diploma",
            searchTerms: [ "award", "certificate", "college", "education", "graduate", "graduation", "university" ]
        }, {
            title: "fas fa-directions",
            searchTerms: [ "map", "navigation", "sign", "turn" ]
        }, {
            title: "far fa-directions",
            searchTerms: [ "map", "navigation", "sign", "turn" ]
        }, {
            title: "fal fa-directions",
            searchTerms: [ "map", "navigation", "sign", "turn" ]
        }, {
            title: "fas fa-disc-drive",
            searchTerms: [ "blu-ray", "cd", "cd-rom", "computer", "dvd", "load", "music", "optical drive", "peripheral", "tray", "video" ]
        }, {
            title: "far fa-disc-drive",
            searchTerms: [ "blu-ray", "cd", "cd-rom", "computer", "dvd", "load", "music", "optical drive", "peripheral", "tray", "video" ]
        }, {
            title: "fal fa-disc-drive",
            searchTerms: [ "blu-ray", "cd", "cd-rom", "computer", "dvd", "load", "music", "optical drive", "peripheral", "tray", "video" ]
        }, {
            title: "fab fa-discord",
            searchTerms: []
        }, {
            title: "fab fa-discourse",
            searchTerms: []
        }, {
            title: "fas fa-disease",
            searchTerms: [ "bacteria", "cancer", "illness", "infection", "sickness", "virus" ]
        }, {
            title: "far fa-disease",
            searchTerms: [ "bacteria", "cancer", "illness", "infection", "sickness", "virus" ]
        }, {
            title: "fal fa-disease",
            searchTerms: [ "bacteria", "cancer", "illness", "infection", "sickness", "virus" ]
        }, {
            title: "fas fa-divide",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "far fa-divide",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "fal fa-divide",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "fas fa-dizzy",
            searchTerms: [ "dazed", "dead", "disapprove", "emoticon", "face" ]
        }, {
            title: "far fa-dizzy",
            searchTerms: [ "dazed", "dead", "disapprove", "emoticon", "face" ]
        }, {
            title: "fal fa-dizzy",
            searchTerms: [ "dazed", "dead", "disapprove", "emoticon", "face" ]
        }, {
            title: "fas fa-dna",
            searchTerms: [ "double helix", "genetic", "helix", "molecule", "protein" ]
        }, {
            title: "far fa-dna",
            searchTerms: [ "double helix", "genetic", "helix", "molecule", "protein" ]
        }, {
            title: "fal fa-dna",
            searchTerms: [ "double helix", "genetic", "helix", "molecule", "protein" ]
        }, {
            title: "fas fa-do-not-enter",
            searchTerms: [ "closed", "traffic", "warning" ]
        }, {
            title: "far fa-do-not-enter",
            searchTerms: [ "closed", "traffic", "warning" ]
        }, {
            title: "fal fa-do-not-enter",
            searchTerms: [ "closed", "traffic", "warning" ]
        }, {
            title: "fab fa-dochub",
            searchTerms: []
        }, {
            title: "fab fa-docker",
            searchTerms: []
        }, {
            title: "fas fa-dog",
            searchTerms: [ "animal", "canine", "fauna", "mammal", "pet", "pooch", "puppy", "woof" ]
        }, {
            title: "far fa-dog",
            searchTerms: [ "animal", "canine", "fauna", "mammal", "pet", "pooch", "puppy", "woof" ]
        }, {
            title: "fal fa-dog",
            searchTerms: [ "animal", "canine", "fauna", "mammal", "pet", "pooch", "puppy", "woof" ]
        }, {
            title: "fas fa-dog-leashed",
            searchTerms: [ "animal", "canine", "fauna", "mammal", "pet", "pooch", "puppy", "walk", "woof" ]
        }, {
            title: "far fa-dog-leashed",
            searchTerms: [ "animal", "canine", "fauna", "mammal", "pet", "pooch", "puppy", "walk", "woof" ]
        }, {
            title: "fal fa-dog-leashed",
            searchTerms: [ "animal", "canine", "fauna", "mammal", "pet", "pooch", "puppy", "walk", "woof" ]
        }, {
            title: "fas fa-dollar-sign",
            searchTerms: [ "$", "cost", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "far fa-dollar-sign",
            searchTerms: [ "$", "cost", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fal fa-dollar-sign",
            searchTerms: [ "$", "cost", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fas fa-dolly",
            searchTerms: [ "carry", "shipping", "transport" ]
        }, {
            title: "far fa-dolly",
            searchTerms: [ "carry", "shipping", "transport" ]
        }, {
            title: "fal fa-dolly",
            searchTerms: [ "carry", "shipping", "transport" ]
        }, {
            title: "fas fa-dolly-empty",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "far fa-dolly-empty",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "fal fa-dolly-empty",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "fas fa-dolly-flatbed",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "far fa-dolly-flatbed",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "fal fa-dolly-flatbed",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "fas fa-dolly-flatbed-alt",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "far fa-dolly-flatbed-alt",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "fal fa-dolly-flatbed-alt",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "fas fa-dolly-flatbed-empty",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "far fa-dolly-flatbed-empty",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "fal fa-dolly-flatbed-empty",
            searchTerms: [ "carry", "inventory", "shipping", "transport" ]
        }, {
            title: "fas fa-donate",
            searchTerms: [ "contribute", "generosity", "gift", "give" ]
        }, {
            title: "far fa-donate",
            searchTerms: [ "contribute", "generosity", "gift", "give" ]
        }, {
            title: "fal fa-donate",
            searchTerms: [ "contribute", "generosity", "gift", "give" ]
        }, {
            title: "fas fa-door-closed",
            searchTerms: [ "enter", "exit", "locked" ]
        }, {
            title: "far fa-door-closed",
            searchTerms: [ "enter", "exit", "locked" ]
        }, {
            title: "fal fa-door-closed",
            searchTerms: [ "enter", "exit", "locked" ]
        }, {
            title: "fas fa-door-open",
            searchTerms: [ "enter", "exit", "welcome" ]
        }, {
            title: "far fa-door-open",
            searchTerms: [ "enter", "exit", "welcome" ]
        }, {
            title: "fal fa-door-open",
            searchTerms: [ "enter", "exit", "welcome" ]
        }, {
            title: "fas fa-dot-circle",
            searchTerms: [ "bullseye", "notification", "target" ]
        }, {
            title: "far fa-dot-circle",
            searchTerms: [ "bullseye", "notification", "target" ]
        }, {
            title: "fal fa-dot-circle",
            searchTerms: [ "bullseye", "notification", "target" ]
        }, {
            title: "fas fa-dove",
            searchTerms: [ "bird", "fauna", "flying", "peace", "war" ]
        }, {
            title: "far fa-dove",
            searchTerms: [ "bird", "fauna", "flying", "peace", "war" ]
        }, {
            title: "fal fa-dove",
            searchTerms: [ "bird", "fauna", "flying", "peace", "war" ]
        }, {
            title: "fas fa-download",
            searchTerms: [ "export", "hard drive", "save", "transfer" ]
        }, {
            title: "far fa-download",
            searchTerms: [ "export", "hard drive", "save", "transfer" ]
        }, {
            title: "fal fa-download",
            searchTerms: [ "export", "hard drive", "save", "transfer" ]
        }, {
            title: "fab fa-draft2digital",
            searchTerms: []
        }, {
            title: "fas fa-drafting-compass",
            searchTerms: [ "design", "map", "mechanical drawing", "plot", "plotting" ]
        }, {
            title: "far fa-drafting-compass",
            searchTerms: [ "design", "map", "mechanical drawing", "plot", "plotting" ]
        }, {
            title: "fal fa-drafting-compass",
            searchTerms: [ "design", "map", "mechanical drawing", "plot", "plotting" ]
        }, {
            title: "fas fa-dragon",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "fire", "lizard", "serpent" ]
        }, {
            title: "far fa-dragon",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "fire", "lizard", "serpent" ]
        }, {
            title: "fal fa-dragon",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "fire", "lizard", "serpent" ]
        }, {
            title: "fas fa-draw-circle",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "far fa-draw-circle",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "fal fa-draw-circle",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "fas fa-draw-polygon",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "far fa-draw-polygon",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "fal fa-draw-polygon",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "fas fa-draw-square",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "far fa-draw-square",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "fal fa-draw-square",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "fas fa-dreidel",
            searchTerms: [ "clay", "hanukkah", "holiday", "jewish", "judaism", "toy" ]
        }, {
            title: "far fa-dreidel",
            searchTerms: [ "clay", "hanukkah", "holiday", "jewish", "judaism", "toy" ]
        }, {
            title: "fal fa-dreidel",
            searchTerms: [ "clay", "hanukkah", "holiday", "jewish", "judaism", "toy" ]
        }, {
            title: "fab fa-dribbble",
            searchTerms: []
        }, {
            title: "fab fa-dribbble-square",
            searchTerms: []
        }, {
            title: "fas fa-drone",
            searchTerms: [ "aerial", "big brother", "surveillance", "uav", "unmanned", "vehicle" ]
        }, {
            title: "far fa-drone",
            searchTerms: [ "aerial", "big brother", "surveillance", "uav", "unmanned", "vehicle" ]
        }, {
            title: "fal fa-drone",
            searchTerms: [ "aerial", "big brother", "surveillance", "uav", "unmanned", "vehicle" ]
        }, {
            title: "fas fa-drone-alt",
            searchTerms: [ "aerial", "big brother", "surveillance", "uav", "unmanned", "vehicle" ]
        }, {
            title: "far fa-drone-alt",
            searchTerms: [ "aerial", "big brother", "surveillance", "uav", "unmanned", "vehicle" ]
        }, {
            title: "fal fa-drone-alt",
            searchTerms: [ "aerial", "big brother", "surveillance", "uav", "unmanned", "vehicle" ]
        }, {
            title: "fab fa-dropbox",
            searchTerms: []
        }, {
            title: "fas fa-drum",
            searchTerms: [ "instrument", "music", "percussion", "snare", "sound" ]
        }, {
            title: "far fa-drum",
            searchTerms: [ "instrument", "music", "percussion", "snare", "sound" ]
        }, {
            title: "fal fa-drum",
            searchTerms: [ "instrument", "music", "percussion", "snare", "sound" ]
        }, {
            title: "fas fa-drum-steelpan",
            searchTerms: [ "calypso", "instrument", "music", "percussion", "reggae", "snare", "sound", "steel", "tropical" ]
        }, {
            title: "far fa-drum-steelpan",
            searchTerms: [ "calypso", "instrument", "music", "percussion", "reggae", "snare", "sound", "steel", "tropical" ]
        }, {
            title: "fal fa-drum-steelpan",
            searchTerms: [ "calypso", "instrument", "music", "percussion", "reggae", "snare", "sound", "steel", "tropical" ]
        }, {
            title: "fas fa-drumstick",
            searchTerms: [ "bone", "chicken", "leg", "meat", "poultry", "turkey" ]
        }, {
            title: "far fa-drumstick",
            searchTerms: [ "bone", "chicken", "leg", "meat", "poultry", "turkey" ]
        }, {
            title: "fal fa-drumstick",
            searchTerms: [ "bone", "chicken", "leg", "meat", "poultry", "turkey" ]
        }, {
            title: "fas fa-drumstick-bite",
            searchTerms: [ "bone", "chicken", "leg", "meat", "poultry", "turkey" ]
        }, {
            title: "far fa-drumstick-bite",
            searchTerms: [ "bone", "chicken", "leg", "meat", "poultry", "turkey" ]
        }, {
            title: "fal fa-drumstick-bite",
            searchTerms: [ "bone", "chicken", "leg", "meat", "poultry", "turkey" ]
        }, {
            title: "fab fa-drupal",
            searchTerms: []
        }, {
            title: "fas fa-dryer",
            searchTerms: [ "clean", "clothes", "laundromat", "laundry", "washing machine" ]
        }, {
            title: "far fa-dryer",
            searchTerms: [ "clean", "clothes", "laundromat", "laundry", "washing machine" ]
        }, {
            title: "fal fa-dryer",
            searchTerms: [ "clean", "clothes", "laundromat", "laundry", "washing machine" ]
        }, {
            title: "fas fa-dryer-alt",
            searchTerms: [ "clean", "clothes", "laundromat", "laundry", "washing machine" ]
        }, {
            title: "far fa-dryer-alt",
            searchTerms: [ "clean", "clothes", "laundromat", "laundry", "washing machine" ]
        }, {
            title: "fal fa-dryer-alt",
            searchTerms: [ "clean", "clothes", "laundromat", "laundry", "washing machine" ]
        }, {
            title: "fas fa-duck",
            searchTerms: [ "bath", "bird", "fauna", "quack", "rubber" ]
        }, {
            title: "far fa-duck",
            searchTerms: [ "bath", "bird", "fauna", "quack", "rubber" ]
        }, {
            title: "fal fa-duck",
            searchTerms: [ "bath", "bird", "fauna", "quack", "rubber" ]
        }, {
            title: "fas fa-dumbbell",
            searchTerms: [ "exercise", "gym", "strength", "weight", "weight-lifting" ]
        }, {
            title: "far fa-dumbbell",
            searchTerms: [ "exercise", "gym", "strength", "weight", "weight-lifting" ]
        }, {
            title: "fal fa-dumbbell",
            searchTerms: [ "exercise", "gym", "strength", "weight", "weight-lifting" ]
        }, {
            title: "fas fa-dumpster",
            searchTerms: [ "alley", "bin", "commercial", "trash", "waste" ]
        }, {
            title: "far fa-dumpster",
            searchTerms: [ "alley", "bin", "commercial", "trash", "waste" ]
        }, {
            title: "fal fa-dumpster",
            searchTerms: [ "alley", "bin", "commercial", "trash", "waste" ]
        }, {
            title: "fas fa-dumpster-fire",
            searchTerms: [ "alley", "bin", "commercial", "danger", "dangerous", "euphemism", "flame", "heat", "hot", "trash", "waste" ]
        }, {
            title: "far fa-dumpster-fire",
            searchTerms: [ "alley", "bin", "commercial", "danger", "dangerous", "euphemism", "flame", "heat", "hot", "trash", "waste" ]
        }, {
            title: "fal fa-dumpster-fire",
            searchTerms: [ "alley", "bin", "commercial", "danger", "dangerous", "euphemism", "flame", "heat", "hot", "trash", "waste" ]
        }, {
            title: "fas fa-dungeon",
            searchTerms: [ "Dungeons & Dragons", "building", "d&d", "dnd", "door", "entrance", "fantasy", "gate" ]
        }, {
            title: "far fa-dungeon",
            searchTerms: [ "Dungeons & Dragons", "building", "d&d", "dnd", "door", "entrance", "fantasy", "gate" ]
        }, {
            title: "fal fa-dungeon",
            searchTerms: [ "Dungeons & Dragons", "building", "d&d", "dnd", "door", "entrance", "fantasy", "gate" ]
        }, {
            title: "fab fa-dyalog",
            searchTerms: []
        }, {
            title: "fas fa-ear",
            searchTerms: [ "head", "hearing", "listen", "lobe" ]
        }, {
            title: "far fa-ear",
            searchTerms: [ "head", "hearing", "listen", "lobe" ]
        }, {
            title: "fal fa-ear",
            searchTerms: [ "head", "hearing", "listen", "lobe" ]
        }, {
            title: "fas fa-ear-muffs",
            searchTerms: [ "accessory", "clothing", "cold", "head", "puffy", "soft", "winter" ]
        }, {
            title: "far fa-ear-muffs",
            searchTerms: [ "accessory", "clothing", "cold", "head", "puffy", "soft", "winter" ]
        }, {
            title: "fal fa-ear-muffs",
            searchTerms: [ "accessory", "clothing", "cold", "head", "puffy", "soft", "winter" ]
        }, {
            title: "fab fa-earlybirds",
            searchTerms: []
        }, {
            title: "fab fa-ebay",
            searchTerms: []
        }, {
            title: "fas fa-eclipse",
            searchTerms: [ "lunar", "moon", "shadow", "solar", "sun" ]
        }, {
            title: "far fa-eclipse",
            searchTerms: [ "lunar", "moon", "shadow", "solar", "sun" ]
        }, {
            title: "fal fa-eclipse",
            searchTerms: [ "lunar", "moon", "shadow", "solar", "sun" ]
        }, {
            title: "fas fa-eclipse-alt",
            searchTerms: [ "lunar", "moon", "shadow", "solar", "sun" ]
        }, {
            title: "far fa-eclipse-alt",
            searchTerms: [ "lunar", "moon", "shadow", "solar", "sun" ]
        }, {
            title: "fal fa-eclipse-alt",
            searchTerms: [ "lunar", "moon", "shadow", "solar", "sun" ]
        }, {
            title: "fab fa-edge",
            searchTerms: [ "browser", "ie" ]
        }, {
            title: "fas fa-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "far fa-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fal fa-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fas fa-egg",
            searchTerms: [ "breakfast", "chicken", "easter", "shell", "yolk" ]
        }, {
            title: "far fa-egg",
            searchTerms: [ "breakfast", "chicken", "easter", "shell", "yolk" ]
        }, {
            title: "fal fa-egg",
            searchTerms: [ "breakfast", "chicken", "easter", "shell", "yolk" ]
        }, {
            title: "fas fa-egg-fried",
            searchTerms: [ "breakfast", "chicken", "yolk" ]
        }, {
            title: "far fa-egg-fried",
            searchTerms: [ "breakfast", "chicken", "yolk" ]
        }, {
            title: "fal fa-egg-fried",
            searchTerms: [ "breakfast", "chicken", "yolk" ]
        }, {
            title: "fas fa-eject",
            searchTerms: [ "abort", "cancel", "cd", "discharge" ]
        }, {
            title: "far fa-eject",
            searchTerms: [ "abort", "cancel", "cd", "discharge" ]
        }, {
            title: "fal fa-eject",
            searchTerms: [ "abort", "cancel", "cd", "discharge" ]
        }, {
            title: "fab fa-elementor",
            searchTerms: []
        }, {
            title: "fas fa-elephant",
            searchTerms: [ "animal", "dumbo", "fauna", "mammal", "pachyderm", "trunk" ]
        }, {
            title: "far fa-elephant",
            searchTerms: [ "animal", "dumbo", "fauna", "mammal", "pachyderm", "trunk" ]
        }, {
            title: "fal fa-elephant",
            searchTerms: [ "animal", "dumbo", "fauna", "mammal", "pachyderm", "trunk" ]
        }, {
            title: "fas fa-ellipsis-h",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "far fa-ellipsis-h",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-h",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fas fa-ellipsis-h-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "far fa-ellipsis-h-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-h-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fas fa-ellipsis-v",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "far fa-ellipsis-v",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-v",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fas fa-ellipsis-v-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "far fa-ellipsis-v-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fal fa-ellipsis-v-alt",
            searchTerms: [ "dots", "drag", "kebab", "list", "menu", "nav", "navigation", "ol", "reorder", "settings", "ul" ]
        }, {
            title: "fab fa-ello",
            searchTerms: []
        }, {
            title: "fab fa-ember",
            searchTerms: []
        }, {
            title: "fab fa-empire",
            searchTerms: []
        }, {
            title: "fas fa-empty-set",
            searchTerms: [ "math", "theory" ]
        }, {
            title: "far fa-empty-set",
            searchTerms: [ "math", "theory" ]
        }, {
            title: "fal fa-empty-set",
            searchTerms: [ "math", "theory" ]
        }, {
            title: "fas fa-engine-warning",
            searchTerms: [ "alert", "automobile", "car", "mechanic", "warning" ]
        }, {
            title: "far fa-engine-warning",
            searchTerms: [ "alert", "automobile", "car", "mechanic", "warning" ]
        }, {
            title: "fal fa-engine-warning",
            searchTerms: [ "alert", "automobile", "car", "mechanic", "warning" ]
        }, {
            title: "fas fa-envelope",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "far fa-envelope",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fal fa-envelope",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fas fa-envelope-open",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "far fa-envelope-open",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fal fa-envelope-open",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fas fa-envelope-open-dollar",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "money", "notification", "pay", "transfer" ]
        }, {
            title: "far fa-envelope-open-dollar",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "money", "notification", "pay", "transfer" ]
        }, {
            title: "fal fa-envelope-open-dollar",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "money", "notification", "pay", "transfer" ]
        }, {
            title: "fas fa-envelope-open-text",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "far fa-envelope-open-text",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fal fa-envelope-open-text",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fas fa-envelope-square",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "far fa-envelope-square",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fal fa-envelope-square",
            searchTerms: [ "e-mail", "email", "letter", "mail", "message", "notification", "support" ]
        }, {
            title: "fab fa-envira",
            searchTerms: [ "leaf" ]
        }, {
            title: "fas fa-equals",
            searchTerms: [ "arithmetic", "even", "match", "math" ]
        }, {
            title: "far fa-equals",
            searchTerms: [ "arithmetic", "even", "match", "math" ]
        }, {
            title: "fal fa-equals",
            searchTerms: [ "arithmetic", "even", "match", "math" ]
        }, {
            title: "fas fa-eraser",
            searchTerms: [ "art", "delete", "remove", "rubber" ]
        }, {
            title: "far fa-eraser",
            searchTerms: [ "art", "delete", "remove", "rubber" ]
        }, {
            title: "fal fa-eraser",
            searchTerms: [ "art", "delete", "remove", "rubber" ]
        }, {
            title: "fab fa-erlang",
            searchTerms: []
        }, {
            title: "fab fa-ethereum",
            searchTerms: []
        }, {
            title: "fas fa-ethernet",
            searchTerms: [ "cable", "cat 5", "cat 6", "connection", "hardware", "internet", "network", "wired" ]
        }, {
            title: "far fa-ethernet",
            searchTerms: [ "cable", "cat 5", "cat 6", "connection", "hardware", "internet", "network", "wired" ]
        }, {
            title: "fal fa-ethernet",
            searchTerms: [ "cable", "cat 5", "cat 6", "connection", "hardware", "internet", "network", "wired" ]
        }, {
            title: "fab fa-etsy",
            searchTerms: []
        }, {
            title: "fas fa-euro-sign",
            searchTerms: [ "currency", "dollar", "exchange", "money" ]
        }, {
            title: "far fa-euro-sign",
            searchTerms: [ "currency", "dollar", "exchange", "money" ]
        }, {
            title: "fal fa-euro-sign",
            searchTerms: [ "currency", "dollar", "exchange", "money" ]
        }, {
            title: "fab fa-evernote",
            searchTerms: []
        }, {
            title: "fas fa-exchange",
            searchTerms: [ "arrow", "arrows", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "far fa-exchange",
            searchTerms: [ "arrow", "arrows", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fal fa-exchange",
            searchTerms: [ "arrow", "arrows", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fas fa-exchange-alt",
            searchTerms: [ "arrow", "arrows", "exchange", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "far fa-exchange-alt",
            searchTerms: [ "arrow", "arrows", "exchange", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fal fa-exchange-alt",
            searchTerms: [ "arrow", "arrows", "exchange", "reciprocate", "return", "swap", "transfer" ]
        }, {
            title: "fas fa-exclamation",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "far fa-exclamation",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fas fa-exclamation-circle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "far fa-exclamation-circle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation-circle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fas fa-exclamation-square",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "far fa-exclamation-square",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation-square",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fas fa-exclamation-triangle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "far fa-exclamation-triangle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fal fa-exclamation-triangle",
            searchTerms: [ "alert", "danger", "error", "important", "notice", "notification", "notify", "problem", "warning" ]
        }, {
            title: "fas fa-expand",
            searchTerms: [ "arrow", "bigger", "enlarge", "resize" ]
        }, {
            title: "far fa-expand",
            searchTerms: [ "arrow", "bigger", "enlarge", "resize" ]
        }, {
            title: "fal fa-expand",
            searchTerms: [ "arrow", "bigger", "enlarge", "resize" ]
        }, {
            title: "fas fa-expand-alt",
            searchTerms: [ "arrow", "bigger", "enlarge", "resize" ]
        }, {
            title: "far fa-expand-alt",
            searchTerms: [ "arrow", "bigger", "enlarge", "resize" ]
        }, {
            title: "fal fa-expand-alt",
            searchTerms: [ "arrow", "bigger", "enlarge", "resize" ]
        }, {
            title: "fas fa-expand-arrows",
            searchTerms: [ "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "far fa-expand-arrows",
            searchTerms: [ "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fal fa-expand-arrows",
            searchTerms: [ "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fas fa-expand-arrows-alt",
            searchTerms: [ "arrows-alt", "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "far fa-expand-arrows-alt",
            searchTerms: [ "arrows-alt", "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fal fa-expand-arrows-alt",
            searchTerms: [ "arrows-alt", "bigger", "enlarge", "move", "resize" ]
        }, {
            title: "fas fa-expand-wide",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "far fa-expand-wide",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fal fa-expand-wide",
            searchTerms: [ "bigger", "enlarge", "resize" ]
        }, {
            title: "fab fa-expeditedssl",
            searchTerms: []
        }, {
            title: "fas fa-external-link",
            searchTerms: [ "new", "open", "send", "share" ]
        }, {
            title: "far fa-external-link",
            searchTerms: [ "new", "open", "send", "share" ]
        }, {
            title: "fal fa-external-link",
            searchTerms: [ "new", "open", "send", "share" ]
        }, {
            title: "fas fa-external-link-alt",
            searchTerms: [ "external-link", "new", "open", "share" ]
        }, {
            title: "far fa-external-link-alt",
            searchTerms: [ "external-link", "new", "open", "share" ]
        }, {
            title: "fal fa-external-link-alt",
            searchTerms: [ "external-link", "new", "open", "share" ]
        }, {
            title: "fas fa-external-link-square",
            searchTerms: [ "new", "open", "send", "share" ]
        }, {
            title: "far fa-external-link-square",
            searchTerms: [ "new", "open", "send", "share" ]
        }, {
            title: "fal fa-external-link-square",
            searchTerms: [ "new", "open", "send", "share" ]
        }, {
            title: "fas fa-external-link-square-alt",
            searchTerms: [ "external-link-square", "new", "open", "share" ]
        }, {
            title: "far fa-external-link-square-alt",
            searchTerms: [ "external-link-square", "new", "open", "share" ]
        }, {
            title: "fal fa-external-link-square-alt",
            searchTerms: [ "external-link-square", "new", "open", "share" ]
        }, {
            title: "fas fa-eye",
            searchTerms: [ "look", "optic", "see", "seen", "show", "sight", "views", "visible" ]
        }, {
            title: "far fa-eye",
            searchTerms: [ "look", "optic", "see", "seen", "show", "sight", "views", "visible" ]
        }, {
            title: "fal fa-eye",
            searchTerms: [ "look", "optic", "see", "seen", "show", "sight", "views", "visible" ]
        }, {
            title: "fas fa-eye-dropper",
            searchTerms: [ "beaker", "clone", "color", "copy", "eyedropper", "pipette" ]
        }, {
            title: "far fa-eye-dropper",
            searchTerms: [ "beaker", "clone", "color", "copy", "eyedropper", "pipette" ]
        }, {
            title: "fal fa-eye-dropper",
            searchTerms: [ "beaker", "clone", "color", "copy", "eyedropper", "pipette" ]
        }, {
            title: "fas fa-eye-evil",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "sauron", "see", "seen", "show", "sight" ]
        }, {
            title: "far fa-eye-evil",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "sauron", "see", "seen", "show", "sight" ]
        }, {
            title: "fal fa-eye-evil",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "sauron", "see", "seen", "show", "sight" ]
        }, {
            title: "fas fa-eye-slash",
            searchTerms: [ "blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity" ]
        }, {
            title: "far fa-eye-slash",
            searchTerms: [ "blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity" ]
        }, {
            title: "fal fa-eye-slash",
            searchTerms: [ "blind", "hide", "show", "toggle", "unseen", "views", "visible", "visiblity" ]
        }, {
            title: "fab fa-facebook",
            searchTerms: [ "facebook-official", "social network" ]
        }, {
            title: "fab fa-facebook-f",
            searchTerms: [ "facebook" ]
        }, {
            title: "fab fa-facebook-messenger",
            searchTerms: []
        }, {
            title: "fab fa-facebook-square",
            searchTerms: [ "social network" ]
        }, {
            title: "fas fa-fan",
            searchTerms: [ "ac", "air conditioning", "blade", "blower", "cool", "hot" ]
        }, {
            title: "far fa-fan",
            searchTerms: [ "ac", "air conditioning", "blade", "blower", "cool", "hot" ]
        }, {
            title: "fal fa-fan",
            searchTerms: [ "ac", "air conditioning", "blade", "blower", "cool", "hot" ]
        }, {
            title: "fas fa-fan-table",
            searchTerms: [ "ac", "air conditioning", "blade", "blower", "cool", "hot", "oscillate" ]
        }, {
            title: "far fa-fan-table",
            searchTerms: [ "ac", "air conditioning", "blade", "blower", "cool", "hot", "oscillate" ]
        }, {
            title: "fal fa-fan-table",
            searchTerms: [ "ac", "air conditioning", "blade", "blower", "cool", "hot", "oscillate" ]
        }, {
            title: "fab fa-fantasy-flight-games",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop" ]
        }, {
            title: "fas fa-farm",
            searchTerms: [ "agriculture", "barn", "dairy", "farming", "ranch", "silo" ]
        }, {
            title: "far fa-farm",
            searchTerms: [ "agriculture", "barn", "dairy", "farming", "ranch", "silo" ]
        }, {
            title: "fal fa-farm",
            searchTerms: [ "agriculture", "barn", "dairy", "farming", "ranch", "silo" ]
        }, {
            title: "fas fa-fast-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "far fa-fast-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fal fa-fast-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fas fa-fast-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "far fa-fast-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fal fa-fast-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fas fa-faucet",
            searchTerms: [ "drip", "house", "kitchen", "sink", "water" ]
        }, {
            title: "far fa-faucet",
            searchTerms: [ "drip", "house", "kitchen", "sink", "water" ]
        }, {
            title: "fal fa-faucet",
            searchTerms: [ "drip", "house", "kitchen", "sink", "water" ]
        }, {
            title: "fas fa-faucet-drip",
            searchTerms: [ "drip", "house", "kitchen", "sink", "water" ]
        }, {
            title: "far fa-faucet-drip",
            searchTerms: [ "drip", "house", "kitchen", "sink", "water" ]
        }, {
            title: "fal fa-faucet-drip",
            searchTerms: [ "drip", "house", "kitchen", "sink", "water" ]
        }, {
            title: "fas fa-fax",
            searchTerms: [ "business", "communicate", "copy", "facsimile", "send" ]
        }, {
            title: "far fa-fax",
            searchTerms: [ "business", "communicate", "copy", "facsimile", "send" ]
        }, {
            title: "fal fa-fax",
            searchTerms: [ "business", "communicate", "copy", "facsimile", "send" ]
        }, {
            title: "fas fa-feather",
            searchTerms: [ "bird", "light", "plucked", "quill", "write" ]
        }, {
            title: "far fa-feather",
            searchTerms: [ "bird", "light", "plucked", "quill", "write" ]
        }, {
            title: "fal fa-feather",
            searchTerms: [ "bird", "light", "plucked", "quill", "write" ]
        }, {
            title: "fas fa-feather-alt",
            searchTerms: [ "bird", "light", "plucked", "quill", "write" ]
        }, {
            title: "far fa-feather-alt",
            searchTerms: [ "bird", "light", "plucked", "quill", "write" ]
        }, {
            title: "fal fa-feather-alt",
            searchTerms: [ "bird", "light", "plucked", "quill", "write" ]
        }, {
            title: "fab fa-fedex",
            searchTerms: [ "Federal Express", "package", "shipping" ]
        }, {
            title: "fab fa-fedora",
            searchTerms: [ "linux", "operating system", "os" ]
        }, {
            title: "fas fa-female",
            searchTerms: [ "human", "person", "profile", "user", "woman" ]
        }, {
            title: "far fa-female",
            searchTerms: [ "human", "person", "profile", "user", "woman" ]
        }, {
            title: "fal fa-female",
            searchTerms: [ "human", "person", "profile", "user", "woman" ]
        }, {
            title: "fas fa-field-hockey",
            searchTerms: [ "ball", "sport", "stick" ]
        }, {
            title: "far fa-field-hockey",
            searchTerms: [ "ball", "sport", "stick" ]
        }, {
            title: "fal fa-field-hockey",
            searchTerms: [ "ball", "sport", "stick" ]
        }, {
            title: "fas fa-fighter-jet",
            searchTerms: [ "airplane", "fast", "fly", "goose", "maverick", "plane", "quick", "top gun", "transportation", "travel" ]
        }, {
            title: "far fa-fighter-jet",
            searchTerms: [ "airplane", "fast", "fly", "goose", "maverick", "plane", "quick", "top gun", "transportation", "travel" ]
        }, {
            title: "fal fa-fighter-jet",
            searchTerms: [ "airplane", "fast", "fly", "goose", "maverick", "plane", "quick", "top gun", "transportation", "travel" ]
        }, {
            title: "fab fa-figma",
            searchTerms: [ "app", "design", "interface" ]
        }, {
            title: "fas fa-file",
            searchTerms: [ "document", "new", "page", "pdf", "resume" ]
        }, {
            title: "far fa-file",
            searchTerms: [ "document", "new", "page", "pdf", "resume" ]
        }, {
            title: "fal fa-file",
            searchTerms: [ "document", "new", "page", "pdf", "resume" ]
        }, {
            title: "fas fa-file-alt",
            searchTerms: [ "document", "file-text", "invoice", "new", "page", "pdf" ]
        }, {
            title: "far fa-file-alt",
            searchTerms: [ "document", "file-text", "invoice", "new", "page", "pdf" ]
        }, {
            title: "fal fa-file-alt",
            searchTerms: [ "document", "file-text", "invoice", "new", "page", "pdf" ]
        }, {
            title: "fas fa-file-archive",
            searchTerms: [ ".zip", "bundle", "compress", "compression", "download", "zip" ]
        }, {
            title: "far fa-file-archive",
            searchTerms: [ ".zip", "bundle", "compress", "compression", "download", "zip" ]
        }, {
            title: "fal fa-file-archive",
            searchTerms: [ ".zip", "bundle", "compress", "compression", "download", "zip" ]
        }, {
            title: "fas fa-file-audio",
            searchTerms: [ "document", "mp3", "music", "page", "play", "sound" ]
        }, {
            title: "far fa-file-audio",
            searchTerms: [ "document", "mp3", "music", "page", "play", "sound" ]
        }, {
            title: "fal fa-file-audio",
            searchTerms: [ "document", "mp3", "music", "page", "play", "sound" ]
        }, {
            title: "fas fa-file-certificate",
            searchTerms: [ "award", "diploma", "document", "license" ]
        }, {
            title: "far fa-file-certificate",
            searchTerms: [ "award", "diploma", "document", "license" ]
        }, {
            title: "fal fa-file-certificate",
            searchTerms: [ "award", "diploma", "document", "license" ]
        }, {
            title: "fas fa-file-chart-line",
            searchTerms: [ "analytics", "data", "document", "projection", "report" ]
        }, {
            title: "far fa-file-chart-line",
            searchTerms: [ "analytics", "data", "document", "projection", "report" ]
        }, {
            title: "fal fa-file-chart-line",
            searchTerms: [ "analytics", "data", "document", "projection", "report" ]
        }, {
            title: "fas fa-file-chart-pie",
            searchTerms: [ "analytics", "data", "document", "projection", "report" ]
        }, {
            title: "far fa-file-chart-pie",
            searchTerms: [ "analytics", "data", "document", "projection", "report" ]
        }, {
            title: "fal fa-file-chart-pie",
            searchTerms: [ "analytics", "data", "document", "projection", "report" ]
        }, {
            title: "fas fa-file-check",
            searchTerms: [ "accept", "agree", "confirm", "document", "done", "ok", "select", "success", "synced", "tick", "todo" ]
        }, {
            title: "far fa-file-check",
            searchTerms: [ "accept", "agree", "confirm", "document", "done", "ok", "select", "success", "synced", "tick", "todo" ]
        }, {
            title: "fal fa-file-check",
            searchTerms: [ "accept", "agree", "confirm", "document", "done", "ok", "select", "success", "synced", "tick", "todo" ]
        }, {
            title: "fas fa-file-code",
            searchTerms: [ "css", "development", "document", "html" ]
        }, {
            title: "far fa-file-code",
            searchTerms: [ "css", "development", "document", "html" ]
        }, {
            title: "fal fa-file-code",
            searchTerms: [ "css", "development", "document", "html" ]
        }, {
            title: "fas fa-file-contract",
            searchTerms: [ "agreement", "binding", "document", "legal", "signature" ]
        }, {
            title: "far fa-file-contract",
            searchTerms: [ "agreement", "binding", "document", "legal", "signature" ]
        }, {
            title: "fal fa-file-contract",
            searchTerms: [ "agreement", "binding", "document", "legal", "signature" ]
        }, {
            title: "fas fa-file-csv",
            searchTerms: [ "document", "excel", "numbers", "spreadsheets", "table" ]
        }, {
            title: "far fa-file-csv",
            searchTerms: [ "document", "excel", "numbers", "spreadsheets", "table" ]
        }, {
            title: "fal fa-file-csv",
            searchTerms: [ "document", "excel", "numbers", "spreadsheets", "table" ]
        }, {
            title: "fas fa-file-download",
            searchTerms: [ "document", "export", "save" ]
        }, {
            title: "far fa-file-download",
            searchTerms: [ "document", "export", "save" ]
        }, {
            title: "fal fa-file-download",
            searchTerms: [ "document", "export", "save" ]
        }, {
            title: "fas fa-file-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "far fa-file-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fal fa-file-edit",
            searchTerms: [ "edit", "pen", "pencil", "update", "write" ]
        }, {
            title: "fas fa-file-excel",
            searchTerms: [ "csv", "document", "numbers", "spreadsheets", "table" ]
        }, {
            title: "far fa-file-excel",
            searchTerms: [ "csv", "document", "numbers", "spreadsheets", "table" ]
        }, {
            title: "fal fa-file-excel",
            searchTerms: [ "csv", "document", "numbers", "spreadsheets", "table" ]
        }, {
            title: "fas fa-file-exclamation",
            searchTerms: [ "alert", "document", "important", "page" ]
        }, {
            title: "far fa-file-exclamation",
            searchTerms: [ "alert", "document", "important", "page" ]
        }, {
            title: "fal fa-file-exclamation",
            searchTerms: [ "alert", "document", "important", "page" ]
        }, {
            title: "fas fa-file-export",
            searchTerms: [ "download", "save" ]
        }, {
            title: "far fa-file-export",
            searchTerms: [ "download", "save" ]
        }, {
            title: "fal fa-file-export",
            searchTerms: [ "download", "save" ]
        }, {
            title: "fas fa-file-image",
            searchTerms: [ "document", "image", "jpg", "photo", "png" ]
        }, {
            title: "far fa-file-image",
            searchTerms: [ "document", "image", "jpg", "photo", "png" ]
        }, {
            title: "fal fa-file-image",
            searchTerms: [ "document", "image", "jpg", "photo", "png" ]
        }, {
            title: "fas fa-file-import",
            searchTerms: [ "copy", "document", "send", "upload" ]
        }, {
            title: "far fa-file-import",
            searchTerms: [ "copy", "document", "send", "upload" ]
        }, {
            title: "fal fa-file-import",
            searchTerms: [ "copy", "document", "send", "upload" ]
        }, {
            title: "fas fa-file-invoice",
            searchTerms: [ "account", "bill", "charge", "document", "payment", "receipt" ]
        }, {
            title: "far fa-file-invoice",
            searchTerms: [ "account", "bill", "charge", "document", "payment", "receipt" ]
        }, {
            title: "fal fa-file-invoice",
            searchTerms: [ "account", "bill", "charge", "document", "payment", "receipt" ]
        }, {
            title: "fas fa-file-invoice-dollar",
            searchTerms: [ "$", "account", "bill", "charge", "document", "dollar-sign", "money", "payment", "receipt", "usd" ]
        }, {
            title: "far fa-file-invoice-dollar",
            searchTerms: [ "$", "account", "bill", "charge", "document", "dollar-sign", "money", "payment", "receipt", "usd" ]
        }, {
            title: "fal fa-file-invoice-dollar",
            searchTerms: [ "$", "account", "bill", "charge", "document", "dollar-sign", "money", "payment", "receipt", "usd" ]
        }, {
            title: "fas fa-file-medical",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "far fa-file-medical",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "fal fa-file-medical",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "fas fa-file-medical-alt",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "far fa-file-medical-alt",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "fal fa-file-medical-alt",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "fas fa-file-minus",
            searchTerms: [ "delete", "document", "negative", "remove" ]
        }, {
            title: "far fa-file-minus",
            searchTerms: [ "delete", "document", "negative", "remove" ]
        }, {
            title: "fal fa-file-minus",
            searchTerms: [ "delete", "document", "negative", "remove" ]
        }, {
            title: "fas fa-file-music",
            searchTerms: [ "aac", "aif", "audio", "midi", "mp3", "ogg", "sheet music", "wav", "wma" ]
        }, {
            title: "far fa-file-music",
            searchTerms: [ "aac", "aif", "audio", "midi", "mp3", "ogg", "sheet music", "wav", "wma" ]
        }, {
            title: "fal fa-file-music",
            searchTerms: [ "aac", "aif", "audio", "midi", "mp3", "ogg", "sheet music", "wav", "wma" ]
        }, {
            title: "fas fa-file-pdf",
            searchTerms: [ "acrobat", "document", "preview", "save" ]
        }, {
            title: "far fa-file-pdf",
            searchTerms: [ "acrobat", "document", "preview", "save" ]
        }, {
            title: "fal fa-file-pdf",
            searchTerms: [ "acrobat", "document", "preview", "save" ]
        }, {
            title: "fas fa-file-plus",
            searchTerms: [ "add", "create", "document", "medical", "new", "positive" ]
        }, {
            title: "far fa-file-plus",
            searchTerms: [ "add", "create", "document", "medical", "new", "positive" ]
        }, {
            title: "fal fa-file-plus",
            searchTerms: [ "add", "create", "document", "medical", "new", "positive" ]
        }, {
            title: "fas fa-file-powerpoint",
            searchTerms: [ "display", "document", "keynote", "presentation" ]
        }, {
            title: "far fa-file-powerpoint",
            searchTerms: [ "display", "document", "keynote", "presentation" ]
        }, {
            title: "fal fa-file-powerpoint",
            searchTerms: [ "display", "document", "keynote", "presentation" ]
        }, {
            title: "fas fa-file-prescription",
            searchTerms: [ "document", "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "far fa-file-prescription",
            searchTerms: [ "document", "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fal fa-file-prescription",
            searchTerms: [ "document", "drugs", "medical", "medicine", "rx" ]
        }, {
            title: "fas fa-file-search",
            searchTerms: [ "document", "find", "look", "scan" ]
        }, {
            title: "far fa-file-search",
            searchTerms: [ "document", "find", "look", "scan" ]
        }, {
            title: "fal fa-file-search",
            searchTerms: [ "document", "find", "look", "scan" ]
        }, {
            title: "fas fa-file-signature",
            searchTerms: [ "John Hancock", "contract", "document", "name" ]
        }, {
            title: "far fa-file-signature",
            searchTerms: [ "John Hancock", "contract", "document", "name" ]
        }, {
            title: "fal fa-file-signature",
            searchTerms: [ "John Hancock", "contract", "document", "name" ]
        }, {
            title: "fas fa-file-spreadsheet",
            searchTerms: [ "csv", "document", "excel", "numbers", "sheets", "xls" ]
        }, {
            title: "far fa-file-spreadsheet",
            searchTerms: [ "csv", "document", "excel", "numbers", "sheets", "xls" ]
        }, {
            title: "fal fa-file-spreadsheet",
            searchTerms: [ "csv", "document", "excel", "numbers", "sheets", "xls" ]
        }, {
            title: "fas fa-file-times",
            searchTerms: [ "archive", "delete", "document", "remove", "x" ]
        }, {
            title: "far fa-file-times",
            searchTerms: [ "archive", "delete", "document", "remove", "x" ]
        }, {
            title: "fal fa-file-times",
            searchTerms: [ "archive", "delete", "document", "remove", "x" ]
        }, {
            title: "fas fa-file-upload",
            searchTerms: [ "document", "import", "page", "save" ]
        }, {
            title: "far fa-file-upload",
            searchTerms: [ "document", "import", "page", "save" ]
        }, {
            title: "fal fa-file-upload",
            searchTerms: [ "document", "import", "page", "save" ]
        }, {
            title: "fas fa-file-user",
            searchTerms: [ "account", "document", "page", "personnel", "profile", "resume" ]
        }, {
            title: "far fa-file-user",
            searchTerms: [ "account", "document", "page", "personnel", "profile", "resume" ]
        }, {
            title: "fal fa-file-user",
            searchTerms: [ "account", "document", "page", "personnel", "profile", "resume" ]
        }, {
            title: "fas fa-file-video",
            searchTerms: [ "document", "m4v", "movie", "mp4", "play" ]
        }, {
            title: "far fa-file-video",
            searchTerms: [ "document", "m4v", "movie", "mp4", "play" ]
        }, {
            title: "fal fa-file-video",
            searchTerms: [ "document", "m4v", "movie", "mp4", "play" ]
        }, {
            title: "fas fa-file-word",
            searchTerms: [ "document", "edit", "page", "text", "writing" ]
        }, {
            title: "far fa-file-word",
            searchTerms: [ "document", "edit", "page", "text", "writing" ]
        }, {
            title: "fal fa-file-word",
            searchTerms: [ "document", "edit", "page", "text", "writing" ]
        }, {
            title: "fas fa-files-medical",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "far fa-files-medical",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "fal fa-files-medical",
            searchTerms: [ "document", "health", "history", "prescription", "record" ]
        }, {
            title: "fas fa-fill",
            searchTerms: [ "bucket", "color", "paint", "paint bucket" ]
        }, {
            title: "far fa-fill",
            searchTerms: [ "bucket", "color", "paint", "paint bucket" ]
        }, {
            title: "fal fa-fill",
            searchTerms: [ "bucket", "color", "paint", "paint bucket" ]
        }, {
            title: "fas fa-fill-drip",
            searchTerms: [ "bucket", "color", "drop", "paint", "paint bucket", "spill" ]
        }, {
            title: "far fa-fill-drip",
            searchTerms: [ "bucket", "color", "drop", "paint", "paint bucket", "spill" ]
        }, {
            title: "fal fa-fill-drip",
            searchTerms: [ "bucket", "color", "drop", "paint", "paint bucket", "spill" ]
        }, {
            title: "fas fa-film",
            searchTerms: [ "cinema", "movie", "strip", "video" ]
        }, {
            title: "far fa-film",
            searchTerms: [ "cinema", "movie", "strip", "video" ]
        }, {
            title: "fal fa-film",
            searchTerms: [ "cinema", "movie", "strip", "video" ]
        }, {
            title: "fas fa-film-alt",
            searchTerms: [ "cinema", "movie", "strip", "video" ]
        }, {
            title: "far fa-film-alt",
            searchTerms: [ "cinema", "movie", "strip", "video" ]
        }, {
            title: "fal fa-film-alt",
            searchTerms: [ "cinema", "movie", "strip", "video" ]
        }, {
            title: "fas fa-film-canister",
            searchTerms: [ 110, "35mm", "darkroom", "develop", "image", "photo", "photography", "retro", "vintage" ]
        }, {
            title: "far fa-film-canister",
            searchTerms: [ 110, "35mm", "darkroom", "develop", "image", "photo", "photography", "retro", "vintage" ]
        }, {
            title: "fal fa-film-canister",
            searchTerms: [ 110, "35mm", "darkroom", "develop", "image", "photo", "photography", "retro", "vintage" ]
        }, {
            title: "fas fa-filter",
            searchTerms: [ "funnel", "options", "separate", "sort" ]
        }, {
            title: "far fa-filter",
            searchTerms: [ "funnel", "options", "separate", "sort" ]
        }, {
            title: "fal fa-filter",
            searchTerms: [ "funnel", "options", "separate", "sort" ]
        }, {
            title: "fas fa-fingerprint",
            searchTerms: [ "human", "id", "identification", "lock", "smudge", "touch", "unique", "unlock" ]
        }, {
            title: "far fa-fingerprint",
            searchTerms: [ "human", "id", "identification", "lock", "smudge", "touch", "unique", "unlock" ]
        }, {
            title: "fal fa-fingerprint",
            searchTerms: [ "human", "id", "identification", "lock", "smudge", "touch", "unique", "unlock" ]
        }, {
            title: "fas fa-fire",
            searchTerms: [ "burn", "caliente", "flame", "heat", "hot", "popular" ]
        }, {
            title: "far fa-fire",
            searchTerms: [ "burn", "caliente", "flame", "heat", "hot", "popular" ]
        }, {
            title: "fal fa-fire",
            searchTerms: [ "burn", "caliente", "flame", "heat", "hot", "popular" ]
        }, {
            title: "fas fa-fire-alt",
            searchTerms: [ "burn", "caliente", "flame", "heat", "hot", "popular" ]
        }, {
            title: "far fa-fire-alt",
            searchTerms: [ "burn", "caliente", "flame", "heat", "hot", "popular" ]
        }, {
            title: "fal fa-fire-alt",
            searchTerms: [ "burn", "caliente", "flame", "heat", "hot", "popular" ]
        }, {
            title: "fas fa-fire-extinguisher",
            searchTerms: [ "burn", "caliente", "fire fighter", "flame", "heat", "hot", "rescue" ]
        }, {
            title: "far fa-fire-extinguisher",
            searchTerms: [ "burn", "caliente", "fire fighter", "flame", "heat", "hot", "rescue" ]
        }, {
            title: "fal fa-fire-extinguisher",
            searchTerms: [ "burn", "caliente", "fire fighter", "flame", "heat", "hot", "rescue" ]
        }, {
            title: "fas fa-fire-smoke",
            searchTerms: [ "burn", "caliente", "flame", "fog", "heat", "hot" ]
        }, {
            title: "far fa-fire-smoke",
            searchTerms: [ "burn", "caliente", "flame", "fog", "heat", "hot" ]
        }, {
            title: "fal fa-fire-smoke",
            searchTerms: [ "burn", "caliente", "flame", "fog", "heat", "hot" ]
        }, {
            title: "fab fa-firefox",
            searchTerms: [ "browser" ]
        }, {
            title: "fab fa-firefox-browser",
            searchTerms: [ "browser" ]
        }, {
            title: "fas fa-fireplace",
            searchTerms: [ "caliente", "flame", "hearth", "heat", "holiday", "mantle", "toasty", "warmth" ]
        }, {
            title: "far fa-fireplace",
            searchTerms: [ "caliente", "flame", "hearth", "heat", "holiday", "mantle", "toasty", "warmth" ]
        }, {
            title: "fal fa-fireplace",
            searchTerms: [ "caliente", "flame", "hearth", "heat", "holiday", "mantle", "toasty", "warmth" ]
        }, {
            title: "fas fa-first-aid",
            searchTerms: [ "emergency", "emt", "health", "medical", "rescue" ]
        }, {
            title: "far fa-first-aid",
            searchTerms: [ "emergency", "emt", "health", "medical", "rescue" ]
        }, {
            title: "fal fa-first-aid",
            searchTerms: [ "emergency", "emt", "health", "medical", "rescue" ]
        }, {
            title: "fab fa-first-order",
            searchTerms: []
        }, {
            title: "fab fa-first-order-alt",
            searchTerms: []
        }, {
            title: "fab fa-firstdraft",
            searchTerms: []
        }, {
            title: "fas fa-fish",
            searchTerms: [ "fauna", "gold", "seafood", "swimming" ]
        }, {
            title: "far fa-fish",
            searchTerms: [ "fauna", "gold", "seafood", "swimming" ]
        }, {
            title: "fal fa-fish",
            searchTerms: [ "fauna", "gold", "seafood", "swimming" ]
        }, {
            title: "fas fa-fish-cooked",
            searchTerms: [ "grilled", "health", "salmon", "seafood", "tuna" ]
        }, {
            title: "far fa-fish-cooked",
            searchTerms: [ "grilled", "health", "salmon", "seafood", "tuna" ]
        }, {
            title: "fal fa-fish-cooked",
            searchTerms: [ "grilled", "health", "salmon", "seafood", "tuna" ]
        }, {
            title: "fas fa-fist-raised",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "hand", "ki", "monk", "resist", "strength", "unarmed combat" ]
        }, {
            title: "far fa-fist-raised",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "hand", "ki", "monk", "resist", "strength", "unarmed combat" ]
        }, {
            title: "fal fa-fist-raised",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "hand", "ki", "monk", "resist", "strength", "unarmed combat" ]
        }, {
            title: "fas fa-flag",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "far fa-flag",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "fal fa-flag",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "fas fa-flag-alt",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "far fa-flag-alt",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "fal fa-flag-alt",
            searchTerms: [ "country", "notice", "notification", "notify", "pole", "report", "symbol" ]
        }, {
            title: "fas fa-flag-checkered",
            searchTerms: [ "notice", "notification", "notify", "pole", "racing", "report", "symbol" ]
        }, {
            title: "far fa-flag-checkered",
            searchTerms: [ "notice", "notification", "notify", "pole", "racing", "report", "symbol" ]
        }, {
            title: "fal fa-flag-checkered",
            searchTerms: [ "notice", "notification", "notify", "pole", "racing", "report", "symbol" ]
        }, {
            title: "fas fa-flag-usa",
            searchTerms: [ "betsy ross", "country", "old glory", "stars", "stripes", "symbol" ]
        }, {
            title: "far fa-flag-usa",
            searchTerms: [ "betsy ross", "country", "old glory", "stars", "stripes", "symbol" ]
        }, {
            title: "fal fa-flag-usa",
            searchTerms: [ "betsy ross", "country", "old glory", "stars", "stripes", "symbol" ]
        }, {
            title: "fas fa-flame",
            searchTerms: [ "Dungeons & Dragons", "caliente", "d&d", "dnd", "fantasy", "heat", "hot" ]
        }, {
            title: "far fa-flame",
            searchTerms: [ "Dungeons & Dragons", "caliente", "d&d", "dnd", "fantasy", "heat", "hot" ]
        }, {
            title: "fal fa-flame",
            searchTerms: [ "Dungeons & Dragons", "caliente", "d&d", "dnd", "fantasy", "heat", "hot" ]
        }, {
            title: "fas fa-flashlight",
            searchTerms: [ "camping", "hide and seek", "lamp", "light", "torch" ]
        }, {
            title: "far fa-flashlight",
            searchTerms: [ "camping", "hide and seek", "lamp", "light", "torch" ]
        }, {
            title: "fal fa-flashlight",
            searchTerms: [ "camping", "hide and seek", "lamp", "light", "torch" ]
        }, {
            title: "fas fa-flask",
            searchTerms: [ "beaker", "experimental", "labs", "science" ]
        }, {
            title: "far fa-flask",
            searchTerms: [ "beaker", "experimental", "labs", "science" ]
        }, {
            title: "fal fa-flask",
            searchTerms: [ "beaker", "experimental", "labs", "science" ]
        }, {
            title: "fas fa-flask-poison",
            searchTerms: [ "beverage", "container", "drink", "halloween", "health", "holiday", "power" ]
        }, {
            title: "far fa-flask-poison",
            searchTerms: [ "beverage", "container", "drink", "halloween", "health", "holiday", "power" ]
        }, {
            title: "fal fa-flask-poison",
            searchTerms: [ "beverage", "container", "drink", "halloween", "health", "holiday", "power" ]
        }, {
            title: "fas fa-flask-potion",
            searchTerms: [ "Dungeons & Dragons", "alert", "beaker", "beverage", "container", "d&d", "danger", "dangerous", "deadly", "death", "dnd", "drink", "fantasy", "halloween", "heal", "health", "holiday", "magic", "mana", "science" ]
        }, {
            title: "far fa-flask-potion",
            searchTerms: [ "Dungeons & Dragons", "alert", "beaker", "beverage", "container", "d&d", "danger", "dangerous", "deadly", "death", "dnd", "drink", "fantasy", "halloween", "heal", "health", "holiday", "magic", "mana", "science" ]
        }, {
            title: "fal fa-flask-potion",
            searchTerms: [ "Dungeons & Dragons", "alert", "beaker", "beverage", "container", "d&d", "danger", "dangerous", "deadly", "death", "dnd", "drink", "fantasy", "halloween", "heal", "health", "holiday", "magic", "mana", "science" ]
        }, {
            title: "fab fa-flickr",
            searchTerms: []
        }, {
            title: "fab fa-flipboard",
            searchTerms: []
        }, {
            title: "fas fa-flower",
            searchTerms: [ "daffodil", "nature", "spring", "summer" ]
        }, {
            title: "far fa-flower",
            searchTerms: [ "daffodil", "nature", "spring", "summer" ]
        }, {
            title: "fal fa-flower",
            searchTerms: [ "daffodil", "nature", "spring", "summer" ]
        }, {
            title: "fas fa-flower-daffodil",
            searchTerms: [ "nature", "spring", "summer" ]
        }, {
            title: "far fa-flower-daffodil",
            searchTerms: [ "nature", "spring", "summer" ]
        }, {
            title: "fal fa-flower-daffodil",
            searchTerms: [ "nature", "spring", "summer" ]
        }, {
            title: "fas fa-flower-tulip",
            searchTerms: [ "nature", "spring", "summer" ]
        }, {
            title: "far fa-flower-tulip",
            searchTerms: [ "nature", "spring", "summer" ]
        }, {
            title: "fal fa-flower-tulip",
            searchTerms: [ "nature", "spring", "summer" ]
        }, {
            title: "fas fa-flushed",
            searchTerms: [ "embarrassed", "emoticon", "face" ]
        }, {
            title: "far fa-flushed",
            searchTerms: [ "embarrassed", "emoticon", "face" ]
        }, {
            title: "fal fa-flushed",
            searchTerms: [ "embarrassed", "emoticon", "face" ]
        }, {
            title: "fas fa-flute",
            searchTerms: [ "aerophone", "instrument", "music", "pied piper", "woodwind" ]
        }, {
            title: "far fa-flute",
            searchTerms: [ "aerophone", "instrument", "music", "pied piper", "woodwind" ]
        }, {
            title: "fal fa-flute",
            searchTerms: [ "aerophone", "instrument", "music", "pied piper", "woodwind" ]
        }, {
            title: "fas fa-flux-capacitor",
            searchTerms: [ "1.21 gigawatts", "88 mph", "Emmett Brown", "Marty McFly", "Y", "back to the future", "delorean", "dmc", "time travel" ]
        }, {
            title: "far fa-flux-capacitor",
            searchTerms: [ "1.21 gigawatts", "88 mph", "Emmett Brown", "Marty McFly", "Y", "back to the future", "delorean", "dmc", "time travel" ]
        }, {
            title: "fal fa-flux-capacitor",
            searchTerms: [ "1.21 gigawatts", "88 mph", "Emmett Brown", "Marty McFly", "Y", "back to the future", "delorean", "dmc", "time travel" ]
        }, {
            title: "fab fa-fly",
            searchTerms: []
        }, {
            title: "fas fa-fog",
            searchTerms: [ "haze", "karl", "mist", "opaque", "san francisco", "visibility", "weather" ]
        }, {
            title: "far fa-fog",
            searchTerms: [ "haze", "karl", "mist", "opaque", "san francisco", "visibility", "weather" ]
        }, {
            title: "fal fa-fog",
            searchTerms: [ "haze", "karl", "mist", "opaque", "san francisco", "visibility", "weather" ]
        }, {
            title: "fas fa-folder",
            searchTerms: [ "archive", "directory", "document", "file" ]
        }, {
            title: "far fa-folder",
            searchTerms: [ "archive", "directory", "document", "file" ]
        }, {
            title: "fal fa-folder",
            searchTerms: [ "archive", "directory", "document", "file" ]
        }, {
            title: "fas fa-folder-minus",
            searchTerms: [ "archive", "delete", "directory", "document", "file", "negative", "remove" ]
        }, {
            title: "far fa-folder-minus",
            searchTerms: [ "archive", "delete", "directory", "document", "file", "negative", "remove" ]
        }, {
            title: "fal fa-folder-minus",
            searchTerms: [ "archive", "delete", "directory", "document", "file", "negative", "remove" ]
        }, {
            title: "fas fa-folder-open",
            searchTerms: [ "archive", "directory", "document", "empty", "file", "new" ]
        }, {
            title: "far fa-folder-open",
            searchTerms: [ "archive", "directory", "document", "empty", "file", "new" ]
        }, {
            title: "fal fa-folder-open",
            searchTerms: [ "archive", "directory", "document", "empty", "file", "new" ]
        }, {
            title: "fas fa-folder-plus",
            searchTerms: [ "add", "archive", "create", "directory", "document", "file", "new", "positive" ]
        }, {
            title: "far fa-folder-plus",
            searchTerms: [ "add", "archive", "create", "directory", "document", "file", "new", "positive" ]
        }, {
            title: "fal fa-folder-plus",
            searchTerms: [ "add", "archive", "create", "directory", "document", "file", "new", "positive" ]
        }, {
            title: "fas fa-folder-times",
            searchTerms: [ "archive", "delete", "directory", "document", "file", "remove", "x" ]
        }, {
            title: "far fa-folder-times",
            searchTerms: [ "archive", "delete", "directory", "document", "file", "remove", "x" ]
        }, {
            title: "fal fa-folder-times",
            searchTerms: [ "archive", "delete", "directory", "document", "file", "remove", "x" ]
        }, {
            title: "fas fa-folder-tree",
            searchTerms: [ "archive", "directory", "document", "file", "search", "structure" ]
        }, {
            title: "far fa-folder-tree",
            searchTerms: [ "archive", "directory", "document", "file", "search", "structure" ]
        }, {
            title: "fal fa-folder-tree",
            searchTerms: [ "archive", "directory", "document", "file", "search", "structure" ]
        }, {
            title: "fas fa-folders",
            searchTerms: [ "archive", "copy", "directory", "document", "duplicate", "file" ]
        }, {
            title: "far fa-folders",
            searchTerms: [ "archive", "copy", "directory", "document", "duplicate", "file" ]
        }, {
            title: "fal fa-folders",
            searchTerms: [ "archive", "copy", "directory", "document", "duplicate", "file" ]
        }, {
            title: "fas fa-font",
            searchTerms: [ "alphabet", "glyph", "text", "type", "typeface" ]
        }, {
            title: "far fa-font",
            searchTerms: [ "alphabet", "glyph", "text", "type", "typeface" ]
        }, {
            title: "fal fa-font",
            searchTerms: [ "alphabet", "glyph", "text", "type", "typeface" ]
        }, {
            title: "fab fa-font-awesome",
            searchTerms: [ "meanpath" ]
        }, {
            title: "fab fa-font-awesome-alt",
            searchTerms: []
        }, {
            title: "fab fa-font-awesome-flag",
            searchTerms: []
        }, {
            title: "fas fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "far fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "fal fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "fab fa-font-awesome-logo-full",
            searchTerms: []
        }, {
            title: "fas fa-font-case",
            searchTerms: [ "alphabet", "glyph", "lowercase", "text", "type", "typeface", "uppercase" ]
        }, {
            title: "far fa-font-case",
            searchTerms: [ "alphabet", "glyph", "lowercase", "text", "type", "typeface", "uppercase" ]
        }, {
            title: "fal fa-font-case",
            searchTerms: [ "alphabet", "glyph", "lowercase", "text", "type", "typeface", "uppercase" ]
        }, {
            title: "fab fa-fonticons",
            searchTerms: []
        }, {
            title: "fab fa-fonticons-fi",
            searchTerms: []
        }, {
            title: "fas fa-football-ball",
            searchTerms: [ "ball", "fall", "nfl", "pigskin", "seasonal" ]
        }, {
            title: "far fa-football-ball",
            searchTerms: [ "ball", "fall", "nfl", "pigskin", "seasonal" ]
        }, {
            title: "fal fa-football-ball",
            searchTerms: [ "ball", "fall", "nfl", "pigskin", "seasonal" ]
        }, {
            title: "fas fa-football-helmet",
            searchTerms: [ "ball", "concussion", "fall", "nfl", "pigskin", "protection", "seasonal" ]
        }, {
            title: "far fa-football-helmet",
            searchTerms: [ "ball", "concussion", "fall", "nfl", "pigskin", "protection", "seasonal" ]
        }, {
            title: "fal fa-football-helmet",
            searchTerms: [ "ball", "concussion", "fall", "nfl", "pigskin", "protection", "seasonal" ]
        }, {
            title: "fas fa-forklift",
            searchTerms: [ "archive", "inventory", "lorry", "pallet", "shipping", "tractor", "warehouse" ]
        }, {
            title: "far fa-forklift",
            searchTerms: [ "archive", "inventory", "lorry", "pallet", "shipping", "tractor", "warehouse" ]
        }, {
            title: "fal fa-forklift",
            searchTerms: [ "archive", "inventory", "lorry", "pallet", "shipping", "tractor", "warehouse" ]
        }, {
            title: "fab fa-fort-awesome",
            searchTerms: [ "castle" ]
        }, {
            title: "fab fa-fort-awesome-alt",
            searchTerms: [ "castle" ]
        }, {
            title: "fab fa-forumbee",
            searchTerms: []
        }, {
            title: "fas fa-forward",
            searchTerms: [ "forward", "next", "skip" ]
        }, {
            title: "far fa-forward",
            searchTerms: [ "forward", "next", "skip" ]
        }, {
            title: "fal fa-forward",
            searchTerms: [ "forward", "next", "skip" ]
        }, {
            title: "fab fa-foursquare",
            searchTerms: []
        }, {
            title: "fas fa-fragile",
            searchTerms: [ "break", "broken", "delicate", "glass" ]
        }, {
            title: "far fa-fragile",
            searchTerms: [ "break", "broken", "delicate", "glass" ]
        }, {
            title: "fal fa-fragile",
            searchTerms: [ "break", "broken", "delicate", "glass" ]
        }, {
            title: "fab fa-free-code-camp",
            searchTerms: []
        }, {
            title: "fab fa-freebsd",
            searchTerms: []
        }, {
            title: "fas fa-french-fries",
            searchTerms: [ "chips", "fast food", "fried", "ketchup", "potato", "poutine" ]
        }, {
            title: "far fa-french-fries",
            searchTerms: [ "chips", "fast food", "fried", "ketchup", "potato", "poutine" ]
        }, {
            title: "fal fa-french-fries",
            searchTerms: [ "chips", "fast food", "fried", "ketchup", "potato", "poutine" ]
        }, {
            title: "fas fa-frog",
            searchTerms: [ "amphibian", "bullfrog", "fauna", "hop", "kermit", "kiss", "prince", "ribbit", "toad", "wart" ]
        }, {
            title: "far fa-frog",
            searchTerms: [ "amphibian", "bullfrog", "fauna", "hop", "kermit", "kiss", "prince", "ribbit", "toad", "wart" ]
        }, {
            title: "fal fa-frog",
            searchTerms: [ "amphibian", "bullfrog", "fauna", "hop", "kermit", "kiss", "prince", "ribbit", "toad", "wart" ]
        }, {
            title: "fas fa-frosty-head",
            searchTerms: [ "carrot", "hat", "snowman", "winter" ]
        }, {
            title: "far fa-frosty-head",
            searchTerms: [ "carrot", "hat", "snowman", "winter" ]
        }, {
            title: "fal fa-frosty-head",
            searchTerms: [ "carrot", "hat", "snowman", "winter" ]
        }, {
            title: "fas fa-frown",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "far fa-frown",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fal fa-frown",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fas fa-frown-open",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "far fa-frown-open",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fal fa-frown-open",
            searchTerms: [ "disapprove", "emoticon", "face", "rating", "sad" ]
        }, {
            title: "fab fa-fulcrum",
            searchTerms: []
        }, {
            title: "fas fa-function",
            searchTerms: [ "math", "mathematics" ]
        }, {
            title: "far fa-function",
            searchTerms: [ "math", "mathematics" ]
        }, {
            title: "fal fa-function",
            searchTerms: [ "math", "mathematics" ]
        }, {
            title: "fas fa-funnel-dollar",
            searchTerms: [ "filter", "money", "options", "separate", "sort" ]
        }, {
            title: "far fa-funnel-dollar",
            searchTerms: [ "filter", "money", "options", "separate", "sort" ]
        }, {
            title: "fal fa-funnel-dollar",
            searchTerms: [ "filter", "money", "options", "separate", "sort" ]
        }, {
            title: "fas fa-futbol",
            searchTerms: [ "ball", "football", "mls", "soccer" ]
        }, {
            title: "far fa-futbol",
            searchTerms: [ "ball", "football", "mls", "soccer" ]
        }, {
            title: "fal fa-futbol",
            searchTerms: [ "ball", "football", "mls", "soccer" ]
        }, {
            title: "fab fa-galactic-republic",
            searchTerms: [ "politics", "star wars" ]
        }, {
            title: "fab fa-galactic-senate",
            searchTerms: [ "star wars" ]
        }, {
            title: "fas fa-galaxy",
            searchTerms: [ "black hole", "cosmic", "nebula", "solar system", "space", "spiral", "universe" ]
        }, {
            title: "far fa-galaxy",
            searchTerms: [ "black hole", "cosmic", "nebula", "solar system", "space", "spiral", "universe" ]
        }, {
            title: "fal fa-galaxy",
            searchTerms: [ "black hole", "cosmic", "nebula", "solar system", "space", "spiral", "universe" ]
        }, {
            title: "fas fa-game-board",
            searchTerms: [ "checkers", "chess", "gaming", "grid", "tabletop" ]
        }, {
            title: "far fa-game-board",
            searchTerms: [ "checkers", "chess", "gaming", "grid", "tabletop" ]
        }, {
            title: "fal fa-game-board",
            searchTerms: [ "checkers", "chess", "gaming", "grid", "tabletop" ]
        }, {
            title: "fas fa-game-board-alt",
            searchTerms: [ "checkers", "chess", "gaming", "grid", "tabletop" ]
        }, {
            title: "far fa-game-board-alt",
            searchTerms: [ "checkers", "chess", "gaming", "grid", "tabletop" ]
        }, {
            title: "fal fa-game-board-alt",
            searchTerms: [ "checkers", "chess", "gaming", "grid", "tabletop" ]
        }, {
            title: "fas fa-game-console-handheld",
            searchTerms: [ "cartridge", "gameboy", "nintendo", "retro", "video games", "vintage" ]
        }, {
            title: "far fa-game-console-handheld",
            searchTerms: [ "cartridge", "gameboy", "nintendo", "retro", "video games", "vintage" ]
        }, {
            title: "fal fa-game-console-handheld",
            searchTerms: [ "cartridge", "gameboy", "nintendo", "retro", "video games", "vintage" ]
        }, {
            title: "fas fa-gamepad",
            searchTerms: [ "arcade", "controller", "d-pad", "joystick", "video", "video game" ]
        }, {
            title: "far fa-gamepad",
            searchTerms: [ "arcade", "controller", "d-pad", "joystick", "video", "video game" ]
        }, {
            title: "fal fa-gamepad",
            searchTerms: [ "arcade", "controller", "d-pad", "joystick", "video", "video game" ]
        }, {
            title: "fas fa-gamepad-alt",
            searchTerms: [ "arcade", "controller", "d-pad", "joystick", "video", "video game" ]
        }, {
            title: "far fa-gamepad-alt",
            searchTerms: [ "arcade", "controller", "d-pad", "joystick", "video", "video game" ]
        }, {
            title: "fal fa-gamepad-alt",
            searchTerms: [ "arcade", "controller", "d-pad", "joystick", "video", "video game" ]
        }, {
            title: "fas fa-garage",
            searchTerms: [ "auto", "car", "door", "storage", "structure", "warehouse" ]
        }, {
            title: "far fa-garage",
            searchTerms: [ "auto", "car", "door", "storage", "structure", "warehouse" ]
        }, {
            title: "fal fa-garage",
            searchTerms: [ "auto", "car", "door", "storage", "structure", "warehouse" ]
        }, {
            title: "fas fa-garage-car",
            searchTerms: [ "auto", "car", "door", "storage", "structure", "warehouse" ]
        }, {
            title: "far fa-garage-car",
            searchTerms: [ "auto", "car", "door", "storage", "structure", "warehouse" ]
        }, {
            title: "fal fa-garage-car",
            searchTerms: [ "auto", "car", "door", "storage", "structure", "warehouse" ]
        }, {
            title: "fas fa-garage-open",
            searchTerms: [ "auto", "car", "door", "storage", "structure", "warehouse" ]
        }, {
            title: "far fa-garage-open",
            searchTerms: [ "auto", "car", "door", "storage", "structure", "warehouse" ]
        }, {
            title: "fal fa-garage-open",
            searchTerms: [ "auto", "car", "door", "storage", "structure", "warehouse" ]
        }, {
            title: "fas fa-gas-pump",
            searchTerms: [ "car", "fuel", "gasoline", "petrol" ]
        }, {
            title: "far fa-gas-pump",
            searchTerms: [ "car", "fuel", "gasoline", "petrol" ]
        }, {
            title: "fal fa-gas-pump",
            searchTerms: [ "car", "fuel", "gasoline", "petrol" ]
        }, {
            title: "fas fa-gas-pump-slash",
            searchTerms: [ "car", "empty", "fuel", "gasoline", "petrol" ]
        }, {
            title: "far fa-gas-pump-slash",
            searchTerms: [ "car", "empty", "fuel", "gasoline", "petrol" ]
        }, {
            title: "fal fa-gas-pump-slash",
            searchTerms: [ "car", "empty", "fuel", "gasoline", "petrol" ]
        }, {
            title: "fas fa-gavel",
            searchTerms: [ "hammer", "judge", "law", "lawyer", "opinion" ]
        }, {
            title: "far fa-gavel",
            searchTerms: [ "hammer", "judge", "law", "lawyer", "opinion" ]
        }, {
            title: "fal fa-gavel",
            searchTerms: [ "hammer", "judge", "law", "lawyer", "opinion" ]
        }, {
            title: "fas fa-gem",
            searchTerms: [ "diamond", "jewelry", "sapphire", "stone", "treasure" ]
        }, {
            title: "far fa-gem",
            searchTerms: [ "diamond", "jewelry", "sapphire", "stone", "treasure" ]
        }, {
            title: "fal fa-gem",
            searchTerms: [ "diamond", "jewelry", "sapphire", "stone", "treasure" ]
        }, {
            title: "fas fa-genderless",
            searchTerms: [ "androgynous", "asexual", "sexless" ]
        }, {
            title: "far fa-genderless",
            searchTerms: [ "androgynous", "asexual", "sexless" ]
        }, {
            title: "fal fa-genderless",
            searchTerms: [ "androgynous", "asexual", "sexless" ]
        }, {
            title: "fab fa-get-pocket",
            searchTerms: []
        }, {
            title: "fab fa-gg",
            searchTerms: []
        }, {
            title: "fab fa-gg-circle",
            searchTerms: []
        }, {
            title: "fas fa-ghost",
            searchTerms: [ "apparition", "blinky", "clyde", "floating", "halloween", "holiday", "inky", "pinky", "spirit" ]
        }, {
            title: "far fa-ghost",
            searchTerms: [ "apparition", "blinky", "clyde", "floating", "halloween", "holiday", "inky", "pinky", "spirit" ]
        }, {
            title: "fal fa-ghost",
            searchTerms: [ "apparition", "blinky", "clyde", "floating", "halloween", "holiday", "inky", "pinky", "spirit" ]
        }, {
            title: "fas fa-gift",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "far fa-gift",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "fal fa-gift",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "fas fa-gift-card",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "money", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "far fa-gift-card",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "money", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "fal fa-gift-card",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "money", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "fas fa-gifts",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "far fa-gifts",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "fal fa-gifts",
            searchTerms: [ "christmas", "generosity", "giving", "holiday", "party", "present", "wrapped", "xmas" ]
        }, {
            title: "fas fa-gingerbread-man",
            searchTerms: [ "cookie", "decoration", "frosting", "holiday" ]
        }, {
            title: "far fa-gingerbread-man",
            searchTerms: [ "cookie", "decoration", "frosting", "holiday" ]
        }, {
            title: "fal fa-gingerbread-man",
            searchTerms: [ "cookie", "decoration", "frosting", "holiday" ]
        }, {
            title: "fab fa-git",
            searchTerms: []
        }, {
            title: "fab fa-git-alt",
            searchTerms: []
        }, {
            title: "fab fa-git-square",
            searchTerms: []
        }, {
            title: "fab fa-github",
            searchTerms: [ "octocat" ]
        }, {
            title: "fab fa-github-alt",
            searchTerms: [ "octocat" ]
        }, {
            title: "fab fa-github-square",
            searchTerms: [ "octocat" ]
        }, {
            title: "fab fa-gitkraken",
            searchTerms: []
        }, {
            title: "fab fa-gitlab",
            searchTerms: [ "Axosoft" ]
        }, {
            title: "fab fa-gitter",
            searchTerms: []
        }, {
            title: "fas fa-glass",
            searchTerms: [ "alcohol", "beverage", "drink", "glass", "water" ]
        }, {
            title: "far fa-glass",
            searchTerms: [ "alcohol", "beverage", "drink", "glass", "water" ]
        }, {
            title: "fal fa-glass",
            searchTerms: [ "alcohol", "beverage", "drink", "glass", "water" ]
        }, {
            title: "fas fa-glass-champagne",
            searchTerms: [ "alcohol", "bar", "beverage", "celebration", "champagne", "drink", "holiday", "party" ]
        }, {
            title: "far fa-glass-champagne",
            searchTerms: [ "alcohol", "bar", "beverage", "celebration", "champagne", "drink", "holiday", "party" ]
        }, {
            title: "fal fa-glass-champagne",
            searchTerms: [ "alcohol", "bar", "beverage", "celebration", "champagne", "drink", "holiday", "party" ]
        }, {
            title: "fas fa-glass-cheers",
            searchTerms: [ "alcohol", "bar", "beverage", "celebration", "champagne", "clink", "drink", "holiday", "new year's eve", "party", "toast" ]
        }, {
            title: "far fa-glass-cheers",
            searchTerms: [ "alcohol", "bar", "beverage", "celebration", "champagne", "clink", "drink", "holiday", "new year's eve", "party", "toast" ]
        }, {
            title: "fal fa-glass-cheers",
            searchTerms: [ "alcohol", "bar", "beverage", "celebration", "champagne", "clink", "drink", "holiday", "new year's eve", "party", "toast" ]
        }, {
            title: "fas fa-glass-citrus",
            searchTerms: [ "cocktail", "drink", "lemonade", "refreshing", "water" ]
        }, {
            title: "far fa-glass-citrus",
            searchTerms: [ "cocktail", "drink", "lemonade", "refreshing", "water" ]
        }, {
            title: "fal fa-glass-citrus",
            searchTerms: [ "cocktail", "drink", "lemonade", "refreshing", "water" ]
        }, {
            title: "fas fa-glass-martini",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor" ]
        }, {
            title: "far fa-glass-martini",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor" ]
        }, {
            title: "fal fa-glass-martini",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor" ]
        }, {
            title: "fas fa-glass-martini-alt",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor" ]
        }, {
            title: "far fa-glass-martini-alt",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor" ]
        }, {
            title: "fal fa-glass-martini-alt",
            searchTerms: [ "alcohol", "bar", "beverage", "drink", "liquor" ]
        }, {
            title: "fas fa-glass-whiskey",
            searchTerms: [ "alcohol", "bar", "beverage", "bourbon", "drink", "liquor", "neat", "rye", "scotch", "whisky" ]
        }, {
            title: "far fa-glass-whiskey",
            searchTerms: [ "alcohol", "bar", "beverage", "bourbon", "drink", "liquor", "neat", "rye", "scotch", "whisky" ]
        }, {
            title: "fal fa-glass-whiskey",
            searchTerms: [ "alcohol", "bar", "beverage", "bourbon", "drink", "liquor", "neat", "rye", "scotch", "whisky" ]
        }, {
            title: "fas fa-glass-whiskey-rocks",
            searchTerms: [ "alcohol", "bar", "beverage", "bourbon", "drink", "ice", "liquor", "rye", "scotch", "whisky" ]
        }, {
            title: "far fa-glass-whiskey-rocks",
            searchTerms: [ "alcohol", "bar", "beverage", "bourbon", "drink", "ice", "liquor", "rye", "scotch", "whisky" ]
        }, {
            title: "fal fa-glass-whiskey-rocks",
            searchTerms: [ "alcohol", "bar", "beverage", "bourbon", "drink", "ice", "liquor", "rye", "scotch", "whisky" ]
        }, {
            title: "fas fa-glasses",
            searchTerms: [ "hipster", "nerd", "reading", "sight", "spectacles", "vision" ]
        }, {
            title: "far fa-glasses",
            searchTerms: [ "hipster", "nerd", "reading", "sight", "spectacles", "vision" ]
        }, {
            title: "fal fa-glasses",
            searchTerms: [ "hipster", "nerd", "reading", "sight", "spectacles", "vision" ]
        }, {
            title: "fas fa-glasses-alt",
            searchTerms: [ "hipster", "nerd", "reading", "sight", "spectacles", "vision" ]
        }, {
            title: "far fa-glasses-alt",
            searchTerms: [ "hipster", "nerd", "reading", "sight", "spectacles", "vision" ]
        }, {
            title: "fal fa-glasses-alt",
            searchTerms: [ "hipster", "nerd", "reading", "sight", "spectacles", "vision" ]
        }, {
            title: "fab fa-glide",
            searchTerms: []
        }, {
            title: "fab fa-glide-g",
            searchTerms: []
        }, {
            title: "fas fa-globe",
            searchTerms: [ "all", "coordinates", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "far fa-globe",
            searchTerms: [ "all", "coordinates", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe",
            searchTerms: [ "all", "coordinates", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fas fa-globe-africa",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "far fa-globe-africa",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-africa",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fas fa-globe-americas",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "far fa-globe-americas",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-americas",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fas fa-globe-asia",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "far fa-globe-asia",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-asia",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fas fa-globe-europe",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "far fa-globe-europe",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fal fa-globe-europe",
            searchTerms: [ "all", "country", "earth", "global", "gps", "language", "localize", "location", "map", "online", "place", "planet", "translate", "travel", "world" ]
        }, {
            title: "fas fa-globe-snow",
            searchTerms: [ "diorama", "scene", "seasonal", "shake", "souvenir", "winter" ]
        }, {
            title: "far fa-globe-snow",
            searchTerms: [ "diorama", "scene", "seasonal", "shake", "souvenir", "winter" ]
        }, {
            title: "fal fa-globe-snow",
            searchTerms: [ "diorama", "scene", "seasonal", "shake", "souvenir", "winter" ]
        }, {
            title: "fas fa-globe-stand",
            searchTerms: [ "earth", "geography", "global", "localize", "location", "map", "travel", "world" ]
        }, {
            title: "far fa-globe-stand",
            searchTerms: [ "earth", "geography", "global", "localize", "location", "map", "travel", "world" ]
        }, {
            title: "fal fa-globe-stand",
            searchTerms: [ "earth", "geography", "global", "localize", "location", "map", "travel", "world" ]
        }, {
            title: "fab fa-gofore",
            searchTerms: []
        }, {
            title: "fas fa-golf-ball",
            searchTerms: [ "caddy", "eagle", "putt", "tee" ]
        }, {
            title: "far fa-golf-ball",
            searchTerms: [ "caddy", "eagle", "putt", "tee" ]
        }, {
            title: "fal fa-golf-ball",
            searchTerms: [ "caddy", "eagle", "putt", "tee" ]
        }, {
            title: "fas fa-golf-club",
            searchTerms: [ "caddy", "eagle", "putt", "tee" ]
        }, {
            title: "far fa-golf-club",
            searchTerms: [ "caddy", "eagle", "putt", "tee" ]
        }, {
            title: "fal fa-golf-club",
            searchTerms: [ "caddy", "eagle", "putt", "tee" ]
        }, {
            title: "fab fa-goodreads",
            searchTerms: []
        }, {
            title: "fab fa-goodreads-g",
            searchTerms: []
        }, {
            title: "fab fa-google",
            searchTerms: []
        }, {
            title: "fab fa-google-drive",
            searchTerms: []
        }, {
            title: "fab fa-google-play",
            searchTerms: []
        }, {
            title: "fab fa-google-plus",
            searchTerms: [ "google-plus-circle", "google-plus-official" ]
        }, {
            title: "fab fa-google-plus-g",
            searchTerms: [ "google-plus", "social network" ]
        }, {
            title: "fab fa-google-plus-square",
            searchTerms: [ "social network" ]
        }, {
            title: "fab fa-google-wallet",
            searchTerms: []
        }, {
            title: "fas fa-gopuram",
            searchTerms: [ "building", "entrance", "hinduism", "temple", "tower" ]
        }, {
            title: "far fa-gopuram",
            searchTerms: [ "building", "entrance", "hinduism", "temple", "tower" ]
        }, {
            title: "fal fa-gopuram",
            searchTerms: [ "building", "entrance", "hinduism", "temple", "tower" ]
        }, {
            title: "fas fa-graduation-cap",
            searchTerms: [ "ceremony", "college", "graduate", "learning", "school", "student" ]
        }, {
            title: "far fa-graduation-cap",
            searchTerms: [ "ceremony", "college", "graduate", "learning", "school", "student" ]
        }, {
            title: "fal fa-graduation-cap",
            searchTerms: [ "ceremony", "college", "graduate", "learning", "school", "student" ]
        }, {
            title: "fas fa-gramophone",
            searchTerms: [ "award", "grammy", "music", "phonograph", "record", "turntable", "victrola" ]
        }, {
            title: "far fa-gramophone",
            searchTerms: [ "award", "grammy", "music", "phonograph", "record", "turntable", "victrola" ]
        }, {
            title: "fal fa-gramophone",
            searchTerms: [ "award", "grammy", "music", "phonograph", "record", "turntable", "victrola" ]
        }, {
            title: "fab fa-gratipay",
            searchTerms: [ "favorite", "heart", "like", "love" ]
        }, {
            title: "fab fa-grav",
            searchTerms: []
        }, {
            title: "fas fa-greater-than",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "far fa-greater-than",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fal fa-greater-than",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fas fa-greater-than-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "far fa-greater-than-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fal fa-greater-than-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fas fa-grimace",
            searchTerms: [ "cringe", "emoticon", "face", "teeth" ]
        }, {
            title: "far fa-grimace",
            searchTerms: [ "cringe", "emoticon", "face", "teeth" ]
        }, {
            title: "fal fa-grimace",
            searchTerms: [ "cringe", "emoticon", "face", "teeth" ]
        }, {
            title: "fas fa-grin",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "far fa-grin",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fas fa-grin-alt",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "far fa-grin-alt",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-alt",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fas fa-grin-beam",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "far fa-grin-beam",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-beam",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fas fa-grin-beam-sweat",
            searchTerms: [ "embarass", "emoticon", "face", "smile" ]
        }, {
            title: "far fa-grin-beam-sweat",
            searchTerms: [ "embarass", "emoticon", "face", "smile" ]
        }, {
            title: "fal fa-grin-beam-sweat",
            searchTerms: [ "embarass", "emoticon", "face", "smile" ]
        }, {
            title: "fas fa-grin-hearts",
            searchTerms: [ "emoticon", "face", "love", "smile" ]
        }, {
            title: "far fa-grin-hearts",
            searchTerms: [ "emoticon", "face", "love", "smile" ]
        }, {
            title: "fal fa-grin-hearts",
            searchTerms: [ "emoticon", "face", "love", "smile" ]
        }, {
            title: "fas fa-grin-squint",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "far fa-grin-squint",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-squint",
            searchTerms: [ "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fas fa-grin-squint-tears",
            searchTerms: [ "emoticon", "face", "happy", "smile" ]
        }, {
            title: "far fa-grin-squint-tears",
            searchTerms: [ "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fal fa-grin-squint-tears",
            searchTerms: [ "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fas fa-grin-stars",
            searchTerms: [ "emoticon", "face", "star-struck" ]
        }, {
            title: "far fa-grin-stars",
            searchTerms: [ "emoticon", "face", "star-struck" ]
        }, {
            title: "fal fa-grin-stars",
            searchTerms: [ "emoticon", "face", "star-struck" ]
        }, {
            title: "fas fa-grin-tears",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-grin-tears",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tears",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-grin-tongue",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-grin-tongue",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tongue",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-grin-tongue-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-grin-tongue-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tongue-squint",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-grin-tongue-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "far fa-grin-tongue-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fal fa-grin-tongue-wink",
            searchTerms: [ "LOL", "emoticon", "face" ]
        }, {
            title: "fas fa-grin-wink",
            searchTerms: [ "emoticon", "face", "flirt", "laugh", "smile" ]
        }, {
            title: "far fa-grin-wink",
            searchTerms: [ "emoticon", "face", "flirt", "laugh", "smile" ]
        }, {
            title: "fal fa-grin-wink",
            searchTerms: [ "emoticon", "face", "flirt", "laugh", "smile" ]
        }, {
            title: "fas fa-grip-horizontal",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "far fa-grip-horizontal",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fal fa-grip-horizontal",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fas fa-grip-lines",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "far fa-grip-lines",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fal fa-grip-lines",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fas fa-grip-lines-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "far fa-grip-lines-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fal fa-grip-lines-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fas fa-grip-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "far fa-grip-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fal fa-grip-vertical",
            searchTerms: [ "affordance", "drag", "drop", "grab", "handle" ]
        }, {
            title: "fab fa-gripfire",
            searchTerms: []
        }, {
            title: "fab fa-grunt",
            searchTerms: []
        }, {
            title: "fas fa-guitar",
            searchTerms: [ "acoustic", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "far fa-guitar",
            searchTerms: [ "acoustic", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "fal fa-guitar",
            searchTerms: [ "acoustic", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "fas fa-guitar-electric",
            searchTerms: [ "axe", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "far fa-guitar-electric",
            searchTerms: [ "axe", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "fal fa-guitar-electric",
            searchTerms: [ "axe", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "fas fa-guitars",
            searchTerms: [ "acoustic", "axes", "electric", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "far fa-guitars",
            searchTerms: [ "acoustic", "axes", "electric", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "fal fa-guitars",
            searchTerms: [ "acoustic", "axes", "electric", "instrument", "music", "rock", "rock and roll", "song", "strings" ]
        }, {
            title: "fab fa-gulp",
            searchTerms: []
        }, {
            title: "fas fa-h-square",
            searchTerms: [ "directions", "emergency", "hospital", "hotel", "map" ]
        }, {
            title: "far fa-h-square",
            searchTerms: [ "directions", "emergency", "hospital", "hotel", "map" ]
        }, {
            title: "fal fa-h-square",
            searchTerms: [ "directions", "emergency", "hospital", "hotel", "map" ]
        }, {
            title: "fas fa-h1",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "far fa-h1",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fal fa-h1",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fas fa-h2",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "far fa-h2",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fal fa-h2",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fas fa-h3",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "far fa-h3",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fal fa-h3",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fas fa-h4",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "far fa-h4",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fal fa-h4",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fab fa-hacker-news",
            searchTerms: []
        }, {
            title: "fab fa-hacker-news-square",
            searchTerms: []
        }, {
            title: "fab fa-hackerrank",
            searchTerms: []
        }, {
            title: "fas fa-hamburger",
            searchTerms: [ "bacon", "beef", "burger", "burger king", "cheeseburger", "fast food", "grill", "ground beef", "mcdonalds", "sandwich" ]
        }, {
            title: "far fa-hamburger",
            searchTerms: [ "bacon", "beef", "burger", "burger king", "cheeseburger", "fast food", "grill", "ground beef", "mcdonalds", "sandwich" ]
        }, {
            title: "fal fa-hamburger",
            searchTerms: [ "bacon", "beef", "burger", "burger king", "cheeseburger", "fast food", "grill", "ground beef", "mcdonalds", "sandwich" ]
        }, {
            title: "fas fa-hammer",
            searchTerms: [ "admin", "fix", "repair", "settings", "tool" ]
        }, {
            title: "far fa-hammer",
            searchTerms: [ "admin", "fix", "repair", "settings", "tool" ]
        }, {
            title: "fal fa-hammer",
            searchTerms: [ "admin", "fix", "repair", "settings", "tool" ]
        }, {
            title: "fas fa-hammer-war",
            searchTerms: [ "Dungeons & Dragons", "cleric", "d&d", "dnd", "dwarf", "fantasy", "melee attack", "weapon" ]
        }, {
            title: "far fa-hammer-war",
            searchTerms: [ "Dungeons & Dragons", "cleric", "d&d", "dnd", "dwarf", "fantasy", "melee attack", "weapon" ]
        }, {
            title: "fal fa-hammer-war",
            searchTerms: [ "Dungeons & Dragons", "cleric", "d&d", "dnd", "dwarf", "fantasy", "melee attack", "weapon" ]
        }, {
            title: "fas fa-hamsa",
            searchTerms: [ "amulet", "christianity", "islam", "jewish", "judaism", "muslim", "protection" ]
        }, {
            title: "far fa-hamsa",
            searchTerms: [ "amulet", "christianity", "islam", "jewish", "judaism", "muslim", "protection" ]
        }, {
            title: "fal fa-hamsa",
            searchTerms: [ "amulet", "christianity", "islam", "jewish", "judaism", "muslim", "protection" ]
        }, {
            title: "fas fa-hand-heart",
            searchTerms: [ "care", "charity", "donate", "help" ]
        }, {
            title: "far fa-hand-heart",
            searchTerms: [ "care", "charity", "donate", "help" ]
        }, {
            title: "fal fa-hand-heart",
            searchTerms: [ "care", "charity", "donate", "help" ]
        }, {
            title: "fas fa-hand-holding",
            searchTerms: [ "carry", "lift" ]
        }, {
            title: "far fa-hand-holding",
            searchTerms: [ "carry", "lift" ]
        }, {
            title: "fal fa-hand-holding",
            searchTerms: [ "carry", "lift" ]
        }, {
            title: "fas fa-hand-holding-box",
            searchTerms: [ "carry", "gift", "handling", "lift", "package" ]
        }, {
            title: "far fa-hand-holding-box",
            searchTerms: [ "carry", "gift", "handling", "lift", "package" ]
        }, {
            title: "fal fa-hand-holding-box",
            searchTerms: [ "carry", "gift", "handling", "lift", "package" ]
        }, {
            title: "fas fa-hand-holding-heart",
            searchTerms: [ "carry", "charity", "gift", "lift", "package" ]
        }, {
            title: "far fa-hand-holding-heart",
            searchTerms: [ "carry", "charity", "gift", "lift", "package" ]
        }, {
            title: "fal fa-hand-holding-heart",
            searchTerms: [ "carry", "charity", "gift", "lift", "package" ]
        }, {
            title: "fas fa-hand-holding-magic",
            searchTerms: [ "Dungeons & Dragons", "carry", "cast", "d&d", "dnd", "fantasy", "lift", "mage", "spell", "witch", "wizard" ]
        }, {
            title: "far fa-hand-holding-magic",
            searchTerms: [ "Dungeons & Dragons", "carry", "cast", "d&d", "dnd", "fantasy", "lift", "mage", "spell", "witch", "wizard" ]
        }, {
            title: "fal fa-hand-holding-magic",
            searchTerms: [ "Dungeons & Dragons", "carry", "cast", "d&d", "dnd", "fantasy", "lift", "mage", "spell", "witch", "wizard" ]
        }, {
            title: "fas fa-hand-holding-seedling",
            searchTerms: [ "carry", "grow", "lift", "plant" ]
        }, {
            title: "far fa-hand-holding-seedling",
            searchTerms: [ "carry", "grow", "lift", "plant" ]
        }, {
            title: "fal fa-hand-holding-seedling",
            searchTerms: [ "carry", "grow", "lift", "plant" ]
        }, {
            title: "fas fa-hand-holding-usd",
            searchTerms: [ "$", "carry", "dollar sign", "donation", "giving", "lift", "money", "price" ]
        }, {
            title: "far fa-hand-holding-usd",
            searchTerms: [ "$", "carry", "dollar sign", "donation", "giving", "lift", "money", "price" ]
        }, {
            title: "fal fa-hand-holding-usd",
            searchTerms: [ "$", "carry", "dollar sign", "donation", "giving", "lift", "money", "price" ]
        }, {
            title: "fas fa-hand-holding-water",
            searchTerms: [ "carry", "drought", "grow", "lift" ]
        }, {
            title: "far fa-hand-holding-water",
            searchTerms: [ "carry", "drought", "grow", "lift" ]
        }, {
            title: "fal fa-hand-holding-water",
            searchTerms: [ "carry", "drought", "grow", "lift" ]
        }, {
            title: "fas fa-hand-lizard",
            searchTerms: [ "game", "roshambo" ]
        }, {
            title: "far fa-hand-lizard",
            searchTerms: [ "game", "roshambo" ]
        }, {
            title: "fal fa-hand-lizard",
            searchTerms: [ "game", "roshambo" ]
        }, {
            title: "fas fa-hand-middle-finger",
            searchTerms: [ "flip the bird", "gesture", "hate", "rude" ]
        }, {
            title: "far fa-hand-middle-finger",
            searchTerms: [ "flip the bird", "gesture", "hate", "rude" ]
        }, {
            title: "fal fa-hand-middle-finger",
            searchTerms: [ "flip the bird", "gesture", "hate", "rude" ]
        }, {
            title: "fas fa-hand-paper",
            searchTerms: [ "game", "halt", "roshambo", "stop" ]
        }, {
            title: "far fa-hand-paper",
            searchTerms: [ "game", "halt", "roshambo", "stop" ]
        }, {
            title: "fal fa-hand-paper",
            searchTerms: [ "game", "halt", "roshambo", "stop" ]
        }, {
            title: "fas fa-hand-peace",
            searchTerms: [ "rest", "truce" ]
        }, {
            title: "far fa-hand-peace",
            searchTerms: [ "rest", "truce" ]
        }, {
            title: "fal fa-hand-peace",
            searchTerms: [ "rest", "truce" ]
        }, {
            title: "fas fa-hand-point-down",
            searchTerms: [ "finger", "hand-o-down", "point" ]
        }, {
            title: "far fa-hand-point-down",
            searchTerms: [ "finger", "hand-o-down", "point" ]
        }, {
            title: "fal fa-hand-point-down",
            searchTerms: [ "finger", "hand-o-down", "point" ]
        }, {
            title: "fas fa-hand-point-left",
            searchTerms: [ "back", "finger", "hand-o-left", "left", "point", "previous" ]
        }, {
            title: "far fa-hand-point-left",
            searchTerms: [ "back", "finger", "hand-o-left", "left", "point", "previous" ]
        }, {
            title: "fal fa-hand-point-left",
            searchTerms: [ "back", "finger", "hand-o-left", "left", "point", "previous" ]
        }, {
            title: "fas fa-hand-point-right",
            searchTerms: [ "finger", "forward", "hand-o-right", "next", "point", "right" ]
        }, {
            title: "far fa-hand-point-right",
            searchTerms: [ "finger", "forward", "hand-o-right", "next", "point", "right" ]
        }, {
            title: "fal fa-hand-point-right",
            searchTerms: [ "finger", "forward", "hand-o-right", "next", "point", "right" ]
        }, {
            title: "fas fa-hand-point-up",
            searchTerms: [ "finger", "hand-o-up", "point" ]
        }, {
            title: "far fa-hand-point-up",
            searchTerms: [ "finger", "hand-o-up", "point" ]
        }, {
            title: "fal fa-hand-point-up",
            searchTerms: [ "finger", "hand-o-up", "point" ]
        }, {
            title: "fas fa-hand-pointer",
            searchTerms: [ "arrow", "cursor", "select" ]
        }, {
            title: "far fa-hand-pointer",
            searchTerms: [ "arrow", "cursor", "select" ]
        }, {
            title: "fal fa-hand-pointer",
            searchTerms: [ "arrow", "cursor", "select" ]
        }, {
            title: "fas fa-hand-receiving",
            searchTerms: [ "carry", "gift", "handling", "package", "shipping" ]
        }, {
            title: "far fa-hand-receiving",
            searchTerms: [ "carry", "gift", "handling", "package", "shipping" ]
        }, {
            title: "fal fa-hand-receiving",
            searchTerms: [ "carry", "gift", "handling", "package", "shipping" ]
        }, {
            title: "fas fa-hand-rock",
            searchTerms: [ "fist", "game", "roshambo" ]
        }, {
            title: "far fa-hand-rock",
            searchTerms: [ "fist", "game", "roshambo" ]
        }, {
            title: "fal fa-hand-rock",
            searchTerms: [ "fist", "game", "roshambo" ]
        }, {
            title: "fas fa-hand-scissors",
            searchTerms: [ "cut", "game", "roshambo" ]
        }, {
            title: "far fa-hand-scissors",
            searchTerms: [ "cut", "game", "roshambo" ]
        }, {
            title: "fal fa-hand-scissors",
            searchTerms: [ "cut", "game", "roshambo" ]
        }, {
            title: "fas fa-hand-spock",
            searchTerms: [ "live long", "prosper", "salute", "star trek", "vulcan" ]
        }, {
            title: "far fa-hand-spock",
            searchTerms: [ "live long", "prosper", "salute", "star trek", "vulcan" ]
        }, {
            title: "fal fa-hand-spock",
            searchTerms: [ "live long", "prosper", "salute", "star trek", "vulcan" ]
        }, {
            title: "fas fa-hands",
            searchTerms: [ "carry", "hold", "lift" ]
        }, {
            title: "far fa-hands",
            searchTerms: [ "carry", "hold", "lift" ]
        }, {
            title: "fal fa-hands",
            searchTerms: [ "carry", "hold", "lift" ]
        }, {
            title: "fas fa-hands-heart",
            searchTerms: [ "carry", "gift", "help", "hold", "lift" ]
        }, {
            title: "far fa-hands-heart",
            searchTerms: [ "carry", "gift", "help", "hold", "lift" ]
        }, {
            title: "fal fa-hands-heart",
            searchTerms: [ "carry", "gift", "help", "hold", "lift" ]
        }, {
            title: "fas fa-hands-helping",
            searchTerms: [ "aid", "assistance", "handshake", "partnership", "volunteering" ]
        }, {
            title: "far fa-hands-helping",
            searchTerms: [ "aid", "assistance", "handshake", "partnership", "volunteering" ]
        }, {
            title: "fal fa-hands-helping",
            searchTerms: [ "aid", "assistance", "handshake", "partnership", "volunteering" ]
        }, {
            title: "fas fa-hands-usd",
            searchTerms: [ "$", "carry", "dollar sign", "donation", "giving", "hold", "money", "price", "usd" ]
        }, {
            title: "far fa-hands-usd",
            searchTerms: [ "$", "carry", "dollar sign", "donation", "giving", "hold", "money", "price", "usd" ]
        }, {
            title: "fal fa-hands-usd",
            searchTerms: [ "$", "carry", "dollar sign", "donation", "giving", "hold", "money", "price", "usd" ]
        }, {
            title: "fas fa-handshake",
            searchTerms: [ "agreement", "greeting", "meeting", "partnership" ]
        }, {
            title: "far fa-handshake",
            searchTerms: [ "agreement", "greeting", "meeting", "partnership" ]
        }, {
            title: "fal fa-handshake",
            searchTerms: [ "agreement", "greeting", "meeting", "partnership" ]
        }, {
            title: "fas fa-handshake-alt",
            searchTerms: [ "agreement", "greeting", "partnership. meeting" ]
        }, {
            title: "far fa-handshake-alt",
            searchTerms: [ "agreement", "greeting", "partnership. meeting" ]
        }, {
            title: "fal fa-handshake-alt",
            searchTerms: [ "agreement", "greeting", "partnership. meeting" ]
        }, {
            title: "fas fa-hanukiah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "far fa-hanukiah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "fal fa-hanukiah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "fas fa-hard-hat",
            searchTerms: [ "construction", "hardhat", "helmet", "safety" ]
        }, {
            title: "far fa-hard-hat",
            searchTerms: [ "construction", "hardhat", "helmet", "safety" ]
        }, {
            title: "fal fa-hard-hat",
            searchTerms: [ "construction", "hardhat", "helmet", "safety" ]
        }, {
            title: "fas fa-hashtag",
            searchTerms: [ "Twitter", "instagram", "pound", "social media", "tag" ]
        }, {
            title: "far fa-hashtag",
            searchTerms: [ "Twitter", "instagram", "pound", "social media", "tag" ]
        }, {
            title: "fal fa-hashtag",
            searchTerms: [ "Twitter", "instagram", "pound", "social media", "tag" ]
        }, {
            title: "fas fa-hat-chef",
            searchTerms: [ "cook", "cuisine", "culinary", "dining", "kitchen" ]
        }, {
            title: "far fa-hat-chef",
            searchTerms: [ "cook", "cuisine", "culinary", "dining", "kitchen" ]
        }, {
            title: "fal fa-hat-chef",
            searchTerms: [ "cook", "cuisine", "culinary", "dining", "kitchen" ]
        }, {
            title: "fal fa-hat-cowboy",
            searchTerms: [ "buckaroo", "horse", "jackeroo", "john b.", "old west", "pardner", "ranch", "rancher", "rodeo", "western", "wrangler" ]
        }, {
            title: "far fa-hat-cowboy",
            searchTerms: [ "buckaroo", "horse", "jackeroo", "john b.", "old west", "pardner", "ranch", "rancher", "rodeo", "western", "wrangler" ]
        }, {
            title: "fas fa-hat-cowboy",
            searchTerms: [ "buckaroo", "horse", "jackeroo", "john b.", "old west", "pardner", "ranch", "rancher", "rodeo", "western", "wrangler" ]
        }, {
            title: "fal fa-hat-cowboy-side",
            searchTerms: [ "buckaroo", "horse", "jackeroo", "john b.", "old west", "pardner", "ranch", "rancher", "rodeo", "western", "wrangler" ]
        }, {
            title: "far fa-hat-cowboy-side",
            searchTerms: [ "buckaroo", "horse", "jackeroo", "john b.", "old west", "pardner", "ranch", "rancher", "rodeo", "western", "wrangler" ]
        }, {
            title: "fas fa-hat-cowboy-side",
            searchTerms: [ "buckaroo", "horse", "jackeroo", "john b.", "old west", "pardner", "ranch", "rancher", "rodeo", "western", "wrangler" ]
        }, {
            title: "fas fa-hat-santa",
            searchTerms: [ "accessory", "christmas", "claus", "clothing", "head", "holiday", "santa", "xmas" ]
        }, {
            title: "far fa-hat-santa",
            searchTerms: [ "accessory", "christmas", "claus", "clothing", "head", "holiday", "santa", "xmas" ]
        }, {
            title: "fal fa-hat-santa",
            searchTerms: [ "accessory", "christmas", "claus", "clothing", "head", "holiday", "santa", "xmas" ]
        }, {
            title: "fas fa-hat-winter",
            searchTerms: [ "accessory", "clothing", "cold", "head", "knitted", "seasonal" ]
        }, {
            title: "far fa-hat-winter",
            searchTerms: [ "accessory", "clothing", "cold", "head", "knitted", "seasonal" ]
        }, {
            title: "fal fa-hat-winter",
            searchTerms: [ "accessory", "clothing", "cold", "head", "knitted", "seasonal" ]
        }, {
            title: "fas fa-hat-witch",
            searchTerms: [ "accessory", "clothing", "halloween", "head", "holiday", "mage", "magic", "sorceror" ]
        }, {
            title: "far fa-hat-witch",
            searchTerms: [ "accessory", "clothing", "halloween", "head", "holiday", "mage", "magic", "sorceror" ]
        }, {
            title: "fal fa-hat-witch",
            searchTerms: [ "accessory", "clothing", "halloween", "head", "holiday", "mage", "magic", "sorceror" ]
        }, {
            title: "fas fa-hat-wizard",
            searchTerms: [ "Dungeons & Dragons", "accessory", "buckle", "clothing", "d&d", "dnd", "fantasy", "halloween", "head", "holiday", "mage", "magic", "pointy", "witch" ]
        }, {
            title: "far fa-hat-wizard",
            searchTerms: [ "Dungeons & Dragons", "accessory", "buckle", "clothing", "d&d", "dnd", "fantasy", "halloween", "head", "holiday", "mage", "magic", "pointy", "witch" ]
        }, {
            title: "fal fa-hat-wizard",
            searchTerms: [ "Dungeons & Dragons", "accessory", "buckle", "clothing", "d&d", "dnd", "fantasy", "halloween", "head", "holiday", "mage", "magic", "pointy", "witch" ]
        }, {
            title: "fas fa-hdd",
            searchTerms: [ "cpu", "hard drive", "harddrive", "machine", "save", "storage" ]
        }, {
            title: "far fa-hdd",
            searchTerms: [ "cpu", "hard drive", "harddrive", "machine", "save", "storage" ]
        }, {
            title: "fal fa-hdd",
            searchTerms: [ "cpu", "hard drive", "harddrive", "machine", "save", "storage" ]
        }, {
            title: "fas fa-head-side",
            searchTerms: [ "bald", "face", "profile", "user" ]
        }, {
            title: "far fa-head-side",
            searchTerms: [ "bald", "face", "profile", "user" ]
        }, {
            title: "fal fa-head-side",
            searchTerms: [ "bald", "face", "profile", "user" ]
        }, {
            title: "fas fa-head-side-brain",
            searchTerms: [ "diagnosis", "face", "mental health", "profile", "psychiatric", "psychiatry" ]
        }, {
            title: "far fa-head-side-brain",
            searchTerms: [ "diagnosis", "face", "mental health", "profile", "psychiatric", "psychiatry" ]
        }, {
            title: "fal fa-head-side-brain",
            searchTerms: [ "diagnosis", "face", "mental health", "profile", "psychiatric", "psychiatry" ]
        }, {
            title: "fas fa-head-side-headphones",
            searchTerms: [ "amplifier", "bluetooth", "earphone", "headset", "listen", "microphone", "music" ]
        }, {
            title: "far fa-head-side-headphones",
            searchTerms: [ "amplifier", "bluetooth", "earphone", "headset", "listen", "microphone", "music" ]
        }, {
            title: "fal fa-head-side-headphones",
            searchTerms: [ "amplifier", "bluetooth", "earphone", "headset", "listen", "microphone", "music" ]
        }, {
            title: "fas fa-head-side-medical",
            searchTerms: [ "diagnosis", "face", "mental health", "profile", "psychiatric", "psychiatry" ]
        }, {
            title: "far fa-head-side-medical",
            searchTerms: [ "diagnosis", "face", "mental health", "profile", "psychiatric", "psychiatry" ]
        }, {
            title: "fal fa-head-side-medical",
            searchTerms: [ "diagnosis", "face", "mental health", "profile", "psychiatric", "psychiatry" ]
        }, {
            title: "fas fa-head-vr",
            searchTerms: [ "3d", "augmented", "face", "occulus", "profile", "reality", "virtual" ]
        }, {
            title: "far fa-head-vr",
            searchTerms: [ "3d", "augmented", "face", "occulus", "profile", "reality", "virtual" ]
        }, {
            title: "fal fa-head-vr",
            searchTerms: [ "3d", "augmented", "face", "occulus", "profile", "reality", "virtual" ]
        }, {
            title: "fas fa-heading",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "far fa-heading",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fal fa-heading",
            searchTerms: [ "format", "header", "text", "title" ]
        }, {
            title: "fas fa-headphones",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "far fa-headphones",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-headphones",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fas fa-headphones-alt",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "far fa-headphones-alt",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-headphones-alt",
            searchTerms: [ "audio", "listen", "music", "sound", "speaker" ]
        }, {
            title: "fas fa-headset",
            searchTerms: [ "audio", "gamer", "gaming", "listen", "live chat", "microphone", "shot caller", "sound", "support", "telemarketer" ]
        }, {
            title: "far fa-headset",
            searchTerms: [ "audio", "gamer", "gaming", "listen", "live chat", "microphone", "shot caller", "sound", "support", "telemarketer" ]
        }, {
            title: "fal fa-headset",
            searchTerms: [ "audio", "gamer", "gaming", "listen", "live chat", "microphone", "shot caller", "sound", "support", "telemarketer" ]
        }, {
            title: "fas fa-heart",
            searchTerms: [ "favorite", "like", "love", "relationship", "valentine" ]
        }, {
            title: "far fa-heart",
            searchTerms: [ "favorite", "like", "love", "relationship", "valentine" ]
        }, {
            title: "fal fa-heart",
            searchTerms: [ "favorite", "like", "love", "relationship", "valentine" ]
        }, {
            title: "fas fa-heart-broken",
            searchTerms: [ "breakup", "crushed", "dislike", "dumped", "grief", "love", "lovesick", "relationship", "sad" ]
        }, {
            title: "far fa-heart-broken",
            searchTerms: [ "breakup", "crushed", "dislike", "dumped", "grief", "love", "lovesick", "relationship", "sad" ]
        }, {
            title: "fal fa-heart-broken",
            searchTerms: [ "breakup", "crushed", "dislike", "dumped", "grief", "love", "lovesick", "relationship", "sad" ]
        }, {
            title: "fas fa-heart-circle",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "far fa-heart-circle",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fal fa-heart-circle",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fas fa-heart-rate",
            searchTerms: [ "EKG", "electrocardiogram", "health", "life", "vital" ]
        }, {
            title: "far fa-heart-rate",
            searchTerms: [ "EKG", "electrocardiogram", "health", "life", "vital" ]
        }, {
            title: "fal fa-heart-rate",
            searchTerms: [ "EKG", "electrocardiogram", "health", "life", "vital" ]
        }, {
            title: "fas fa-heart-square",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "far fa-heart-square",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fal fa-heart-square",
            searchTerms: [ "favorite", "like", "love" ]
        }, {
            title: "fas fa-heartbeat",
            searchTerms: [ "ekg", "electrocardiogram", "health", "lifeline", "vital signs" ]
        }, {
            title: "far fa-heartbeat",
            searchTerms: [ "ekg", "electrocardiogram", "health", "lifeline", "vital signs" ]
        }, {
            title: "fal fa-heartbeat",
            searchTerms: [ "ekg", "electrocardiogram", "health", "lifeline", "vital signs" ]
        }, {
            title: "fas fa-heat",
            searchTerms: [ "ac", "air conditioner", "boiler", "heating", "hot", "sauna", "spa", "summer", "temperature" ]
        }, {
            title: "far fa-heat",
            searchTerms: [ "ac", "air conditioner", "boiler", "heating", "hot", "sauna", "spa", "summer", "temperature" ]
        }, {
            title: "fal fa-heat",
            searchTerms: [ "ac", "air conditioner", "boiler", "heating", "hot", "sauna", "spa", "summer", "temperature" ]
        }, {
            title: "fas fa-helicopter",
            searchTerms: [ "airwolf", "apache", "chopper", "flight", "fly", "travel" ]
        }, {
            title: "far fa-helicopter",
            searchTerms: [ "airwolf", "apache", "chopper", "flight", "fly", "travel" ]
        }, {
            title: "fal fa-helicopter",
            searchTerms: [ "airwolf", "apache", "chopper", "flight", "fly", "travel" ]
        }, {
            title: "fas fa-helmet-battle",
            searchTerms: [ "Dungeons & Dragons", "armor", "clothing", "d&d", "dnd", "fantasy", "hat", "knight", "paladin" ]
        }, {
            title: "far fa-helmet-battle",
            searchTerms: [ "Dungeons & Dragons", "armor", "clothing", "d&d", "dnd", "fantasy", "hat", "knight", "paladin" ]
        }, {
            title: "fal fa-helmet-battle",
            searchTerms: [ "Dungeons & Dragons", "armor", "clothing", "d&d", "dnd", "fantasy", "hat", "knight", "paladin" ]
        }, {
            title: "fas fa-hexagon",
            searchTerms: [ "geometry", "honeycomb", "polygon", "shape" ]
        }, {
            title: "far fa-hexagon",
            searchTerms: [ "geometry", "honeycomb", "polygon", "shape" ]
        }, {
            title: "fal fa-hexagon",
            searchTerms: [ "geometry", "honeycomb", "polygon", "shape" ]
        }, {
            title: "fas fa-highlighter",
            searchTerms: [ "edit", "marker", "sharpie", "update", "write" ]
        }, {
            title: "far fa-highlighter",
            searchTerms: [ "edit", "marker", "sharpie", "update", "write" ]
        }, {
            title: "fal fa-highlighter",
            searchTerms: [ "edit", "marker", "sharpie", "update", "write" ]
        }, {
            title: "fas fa-hiking",
            searchTerms: [ "activity", "backpack", "fall", "fitness", "outdoors", "person", "seasonal", "walking" ]
        }, {
            title: "far fa-hiking",
            searchTerms: [ "activity", "backpack", "fall", "fitness", "outdoors", "person", "seasonal", "walking" ]
        }, {
            title: "fal fa-hiking",
            searchTerms: [ "activity", "backpack", "fall", "fitness", "outdoors", "person", "seasonal", "walking" ]
        }, {
            title: "fas fa-hippo",
            searchTerms: [ "animal", "fauna", "hippopotamus", "hungry", "mammal" ]
        }, {
            title: "far fa-hippo",
            searchTerms: [ "animal", "fauna", "hippopotamus", "hungry", "mammal" ]
        }, {
            title: "fal fa-hippo",
            searchTerms: [ "animal", "fauna", "hippopotamus", "hungry", "mammal" ]
        }, {
            title: "fab fa-hips",
            searchTerms: []
        }, {
            title: "fab fa-hire-a-helper",
            searchTerms: []
        }, {
            title: "fas fa-history",
            searchTerms: [ "Rewind", "clock", "reverse", "time", "time machine" ]
        }, {
            title: "far fa-history",
            searchTerms: [ "Rewind", "clock", "reverse", "time", "time machine" ]
        }, {
            title: "fal fa-history",
            searchTerms: [ "Rewind", "clock", "reverse", "time", "time machine" ]
        }, {
            title: "fas fa-hockey-mask",
            searchTerms: [ "clothing", "friday", "halloween", "ice", "jason", "nhl", "protection", "sport", "thirteenth" ]
        }, {
            title: "far fa-hockey-mask",
            searchTerms: [ "clothing", "friday", "halloween", "ice", "jason", "nhl", "protection", "sport", "thirteenth" ]
        }, {
            title: "fal fa-hockey-mask",
            searchTerms: [ "clothing", "friday", "halloween", "ice", "jason", "nhl", "protection", "sport", "thirteenth" ]
        }, {
            title: "fas fa-hockey-puck",
            searchTerms: [ "ice", "nhl", "sport" ]
        }, {
            title: "far fa-hockey-puck",
            searchTerms: [ "ice", "nhl", "sport" ]
        }, {
            title: "fal fa-hockey-puck",
            searchTerms: [ "ice", "nhl", "sport" ]
        }, {
            title: "fas fa-hockey-sticks",
            searchTerms: [ "ice", "nhl", "sport" ]
        }, {
            title: "far fa-hockey-sticks",
            searchTerms: [ "ice", "nhl", "sport" ]
        }, {
            title: "fal fa-hockey-sticks",
            searchTerms: [ "ice", "nhl", "sport" ]
        }, {
            title: "fas fa-holly-berry",
            searchTerms: [ "catwoman", "christmas", "decoration", "flora", "halle", "holiday", "ororo munroe", "plant", "storm", "xmas" ]
        }, {
            title: "far fa-holly-berry",
            searchTerms: [ "catwoman", "christmas", "decoration", "flora", "halle", "holiday", "ororo munroe", "plant", "storm", "xmas" ]
        }, {
            title: "fal fa-holly-berry",
            searchTerms: [ "catwoman", "christmas", "decoration", "flora", "halle", "holiday", "ororo munroe", "plant", "storm", "xmas" ]
        }, {
            title: "fas fa-home",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "far fa-home",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "fal fa-home",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "fas fa-home-alt",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "far fa-home-alt",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "fal fa-home-alt",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "fas fa-home-heart",
            searchTerms: [ "abode", "building", "charity", "house", "main" ]
        }, {
            title: "far fa-home-heart",
            searchTerms: [ "abode", "building", "charity", "house", "main" ]
        }, {
            title: "fal fa-home-heart",
            searchTerms: [ "abode", "building", "charity", "house", "main" ]
        }, {
            title: "fas fa-home-lg",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "far fa-home-lg",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "fal fa-home-lg",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "fas fa-home-lg-alt",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "far fa-home-lg-alt",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "fal fa-home-lg-alt",
            searchTerms: [ "abode", "building", "house", "main" ]
        }, {
            title: "fas fa-hood-cloak",
            searchTerms: [ "Dungeons & Dragons", "clothing", "d&d", "dnd", "fantasy", "hat", "rogue", "stealth" ]
        }, {
            title: "far fa-hood-cloak",
            searchTerms: [ "Dungeons & Dragons", "clothing", "d&d", "dnd", "fantasy", "hat", "rogue", "stealth" ]
        }, {
            title: "fal fa-hood-cloak",
            searchTerms: [ "Dungeons & Dragons", "clothing", "d&d", "dnd", "fantasy", "hat", "rogue", "stealth" ]
        }, {
            title: "fab fa-hooli",
            searchTerms: []
        }, {
            title: "fas fa-horizontal-rule",
            searchTerms: [ "divider", "hr", "line", "page break" ]
        }, {
            title: "far fa-horizontal-rule",
            searchTerms: [ "divider", "hr", "line", "page break" ]
        }, {
            title: "fal fa-horizontal-rule",
            searchTerms: [ "divider", "hr", "line", "page break" ]
        }, {
            title: "fab fa-hornbill",
            searchTerms: []
        }, {
            title: "fas fa-horse",
            searchTerms: [ "equus", "fauna", "mammmal", "mare", "neigh", "pony" ]
        }, {
            title: "far fa-horse",
            searchTerms: [ "equus", "fauna", "mammmal", "mare", "neigh", "pony" ]
        }, {
            title: "fal fa-horse",
            searchTerms: [ "equus", "fauna", "mammmal", "mare", "neigh", "pony" ]
        }, {
            title: "fas fa-horse-head",
            searchTerms: [ "equus", "fauna", "mammmal", "mare", "neigh", "pony" ]
        }, {
            title: "far fa-horse-head",
            searchTerms: [ "equus", "fauna", "mammmal", "mare", "neigh", "pony" ]
        }, {
            title: "fal fa-horse-head",
            searchTerms: [ "equus", "fauna", "mammmal", "mare", "neigh", "pony" ]
        }, {
            title: "fal fa-horse-saddle",
            searchTerms: [ "cowboy", "equus", "fauna", "mammmal", "mare", "neigh", "pony", "rodeo", "western" ]
        }, {
            title: "far fa-horse-saddle",
            searchTerms: [ "cowboy", "equus", "fauna", "mammmal", "mare", "neigh", "pony", "rodeo", "western" ]
        }, {
            title: "fas fa-horse-saddle",
            searchTerms: [ "cowboy", "equus", "fauna", "mammmal", "mare", "neigh", "pony", "rodeo", "western" ]
        }, {
            title: "fas fa-hospital",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "far fa-hospital",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fal fa-hospital",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fas fa-hospital-alt",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "far fa-hospital-alt",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fal fa-hospital-alt",
            searchTerms: [ "building", "emergency room", "medical center" ]
        }, {
            title: "fas fa-hospital-symbol",
            searchTerms: [ "clinic", "emergency", "map" ]
        }, {
            title: "far fa-hospital-symbol",
            searchTerms: [ "clinic", "emergency", "map" ]
        }, {
            title: "fal fa-hospital-symbol",
            searchTerms: [ "clinic", "emergency", "map" ]
        }, {
            title: "fas fa-hospital-user",
            searchTerms: [ "doctor", "network", "patient", "primary care" ]
        }, {
            title: "far fa-hospital-user",
            searchTerms: [ "doctor", "network", "patient", "primary care" ]
        }, {
            title: "fal fa-hospital-user",
            searchTerms: [ "doctor", "network", "patient", "primary care" ]
        }, {
            title: "fas fa-hospitals",
            searchTerms: [ "emergency", "insurance", "network" ]
        }, {
            title: "far fa-hospitals",
            searchTerms: [ "emergency", "insurance", "network" ]
        }, {
            title: "fal fa-hospitals",
            searchTerms: [ "emergency", "insurance", "network" ]
        }, {
            title: "fas fa-hot-tub",
            searchTerms: [ "bath", "jacuzzi", "massage", "sauna", "spa" ]
        }, {
            title: "far fa-hot-tub",
            searchTerms: [ "bath", "jacuzzi", "massage", "sauna", "spa" ]
        }, {
            title: "fal fa-hot-tub",
            searchTerms: [ "bath", "jacuzzi", "massage", "sauna", "spa" ]
        }, {
            title: "fas fa-hotdog",
            searchTerms: [ "bun", "chili", "frankfurt", "frankfurter", "kosher", "polish", "sandwich", "sausage", "vienna", "weiner" ]
        }, {
            title: "far fa-hotdog",
            searchTerms: [ "bun", "chili", "frankfurt", "frankfurter", "kosher", "polish", "sandwich", "sausage", "vienna", "weiner" ]
        }, {
            title: "fal fa-hotdog",
            searchTerms: [ "bun", "chili", "frankfurt", "frankfurter", "kosher", "polish", "sandwich", "sausage", "vienna", "weiner" ]
        }, {
            title: "fas fa-hotel",
            searchTerms: [ "building", "inn", "lodging", "motel", "resort", "travel" ]
        }, {
            title: "far fa-hotel",
            searchTerms: [ "building", "inn", "lodging", "motel", "resort", "travel" ]
        }, {
            title: "fal fa-hotel",
            searchTerms: [ "building", "inn", "lodging", "motel", "resort", "travel" ]
        }, {
            title: "fab fa-hotjar",
            searchTerms: []
        }, {
            title: "fas fa-hourglass",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "far fa-hourglass",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fal fa-hourglass",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fas fa-hourglass-end",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "far fa-hourglass-end",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fal fa-hourglass-end",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fas fa-hourglass-half",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "far fa-hourglass-half",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fal fa-hourglass-half",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fas fa-hourglass-start",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "far fa-hourglass-start",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fal fa-hourglass-start",
            searchTerms: [ "hour", "minute", "sand", "stopwatch", "time" ]
        }, {
            title: "fas fa-house",
            searchTerms: [ "abode", "building", "family", "home", "residence" ]
        }, {
            title: "far fa-house",
            searchTerms: [ "abode", "building", "family", "home", "residence" ]
        }, {
            title: "fal fa-house",
            searchTerms: [ "abode", "building", "family", "home", "residence" ]
        }, {
            title: "fas fa-house-damage",
            searchTerms: [ "building", "devastation", "disaster", "home", "insurance" ]
        }, {
            title: "far fa-house-damage",
            searchTerms: [ "building", "devastation", "disaster", "home", "insurance" ]
        }, {
            title: "fal fa-house-damage",
            searchTerms: [ "building", "devastation", "disaster", "home", "insurance" ]
        }, {
            title: "fas fa-house-day",
            searchTerms: [ "abode", "building", "family", "home", "residence", "solar", "sun" ]
        }, {
            title: "far fa-house-day",
            searchTerms: [ "abode", "building", "family", "home", "residence", "solar", "sun" ]
        }, {
            title: "fal fa-house-day",
            searchTerms: [ "abode", "building", "family", "home", "residence", "solar", "sun" ]
        }, {
            title: "fas fa-house-flood",
            searchTerms: [ "building", "devastation", "disaster", "home", "insurance", "water" ]
        }, {
            title: "far fa-house-flood",
            searchTerms: [ "building", "devastation", "disaster", "home", "insurance", "water" ]
        }, {
            title: "fal fa-house-flood",
            searchTerms: [ "building", "devastation", "disaster", "home", "insurance", "water" ]
        }, {
            title: "fas fa-house-leave",
            searchTerms: [ "abode", "building", "depart", "family", "home", "residence", "work" ]
        }, {
            title: "far fa-house-leave",
            searchTerms: [ "abode", "building", "depart", "family", "home", "residence", "work" ]
        }, {
            title: "fal fa-house-leave",
            searchTerms: [ "abode", "building", "depart", "family", "home", "residence", "work" ]
        }, {
            title: "fas fa-house-night",
            searchTerms: [ "abode", "building", "family", "home", "moon", "residence", "stars" ]
        }, {
            title: "far fa-house-night",
            searchTerms: [ "abode", "building", "family", "home", "moon", "residence", "stars" ]
        }, {
            title: "fal fa-house-night",
            searchTerms: [ "abode", "building", "family", "home", "moon", "residence", "stars" ]
        }, {
            title: "fas fa-house-return",
            searchTerms: [ "abode", "arrival", "building", "family", "home", "residence" ]
        }, {
            title: "far fa-house-return",
            searchTerms: [ "abode", "arrival", "building", "family", "home", "residence" ]
        }, {
            title: "fal fa-house-return",
            searchTerms: [ "abode", "arrival", "building", "family", "home", "residence" ]
        }, {
            title: "fas fa-house-signal",
            searchTerms: [ "abode", "building", "connect", "family", "home", "residence", "smart home", "wifi" ]
        }, {
            title: "far fa-house-signal",
            searchTerms: [ "abode", "building", "connect", "family", "home", "residence", "smart home", "wifi" ]
        }, {
            title: "fal fa-house-signal",
            searchTerms: [ "abode", "building", "connect", "family", "home", "residence", "smart home", "wifi" ]
        }, {
            title: "fab fa-houzz",
            searchTerms: []
        }, {
            title: "fas fa-hryvnia",
            searchTerms: [ "currency", "money", "ukraine", "ukrainian" ]
        }, {
            title: "far fa-hryvnia",
            searchTerms: [ "currency", "money", "ukraine", "ukrainian" ]
        }, {
            title: "fal fa-hryvnia",
            searchTerms: [ "currency", "money", "ukraine", "ukrainian" ]
        }, {
            title: "fab fa-html5",
            searchTerms: []
        }, {
            title: "fab fa-hubspot",
            searchTerms: []
        }, {
            title: "fas fa-humidity",
            searchTerms: [ "evaporation", "fog", "precipitation", "rain" ]
        }, {
            title: "far fa-humidity",
            searchTerms: [ "evaporation", "fog", "precipitation", "rain" ]
        }, {
            title: "fal fa-humidity",
            searchTerms: [ "evaporation", "fog", "precipitation", "rain" ]
        }, {
            title: "fas fa-hurricane",
            searchTerms: [ "coriolis effect", "eye", "storm", "tropical cyclone", "typhoon" ]
        }, {
            title: "far fa-hurricane",
            searchTerms: [ "coriolis effect", "eye", "storm", "tropical cyclone", "typhoon" ]
        }, {
            title: "fal fa-hurricane",
            searchTerms: [ "coriolis effect", "eye", "storm", "tropical cyclone", "typhoon" ]
        }, {
            title: "fas fa-i-cursor",
            searchTerms: [ "editing", "i-beam", "type", "writing" ]
        }, {
            title: "far fa-i-cursor",
            searchTerms: [ "editing", "i-beam", "type", "writing" ]
        }, {
            title: "fal fa-i-cursor",
            searchTerms: [ "editing", "i-beam", "type", "writing" ]
        }, {
            title: "fas fa-ice-cream",
            searchTerms: [ "chocolate", "cone", "dessert", "frozen", "scoop", "sorbet", "vanilla", "yogurt" ]
        }, {
            title: "far fa-ice-cream",
            searchTerms: [ "chocolate", "cone", "dessert", "frozen", "scoop", "sorbet", "vanilla", "yogurt" ]
        }, {
            title: "fal fa-ice-cream",
            searchTerms: [ "chocolate", "cone", "dessert", "frozen", "scoop", "sorbet", "vanilla", "yogurt" ]
        }, {
            title: "fas fa-ice-skate",
            searchTerms: [ "blade", "clothing", "figure skating", "hockey", "seasonal", "shoe" ]
        }, {
            title: "far fa-ice-skate",
            searchTerms: [ "blade", "clothing", "figure skating", "hockey", "seasonal", "shoe" ]
        }, {
            title: "fal fa-ice-skate",
            searchTerms: [ "blade", "clothing", "figure skating", "hockey", "seasonal", "shoe" ]
        }, {
            title: "fas fa-icicles",
            searchTerms: [ "cold", "frozen", "hanging", "ice", "seasonal", "sharp" ]
        }, {
            title: "far fa-icicles",
            searchTerms: [ "cold", "frozen", "hanging", "ice", "seasonal", "sharp" ]
        }, {
            title: "fal fa-icicles",
            searchTerms: [ "cold", "frozen", "hanging", "ice", "seasonal", "sharp" ]
        }, {
            title: "fas fa-icons",
            searchTerms: [ "bolt", "emoji", "heart", "image", "music", "photo", "symbols" ]
        }, {
            title: "far fa-icons",
            searchTerms: [ "bolt", "emoji", "heart", "image", "music", "photo", "symbols" ]
        }, {
            title: "fal fa-icons",
            searchTerms: [ "bolt", "emoji", "heart", "image", "music", "photo", "symbols" ]
        }, {
            title: "fas fa-icons-alt",
            searchTerms: [ "bolt", "emoji", "heart", "image", "music", "photo", "symbols" ]
        }, {
            title: "far fa-icons-alt",
            searchTerms: [ "bolt", "emoji", "heart", "image", "music", "photo", "symbols" ]
        }, {
            title: "fal fa-icons-alt",
            searchTerms: [ "bolt", "emoji", "heart", "image", "music", "photo", "symbols" ]
        }, {
            title: "fas fa-id-badge",
            searchTerms: [ "address", "contact", "identification", "license", "profile" ]
        }, {
            title: "far fa-id-badge",
            searchTerms: [ "address", "contact", "identification", "license", "profile" ]
        }, {
            title: "fal fa-id-badge",
            searchTerms: [ "address", "contact", "identification", "license", "profile" ]
        }, {
            title: "fas fa-id-card",
            searchTerms: [ "contact", "demographics", "document", "identification", "issued", "profile" ]
        }, {
            title: "far fa-id-card",
            searchTerms: [ "contact", "demographics", "document", "identification", "issued", "profile" ]
        }, {
            title: "fal fa-id-card",
            searchTerms: [ "contact", "demographics", "document", "identification", "issued", "profile" ]
        }, {
            title: "fas fa-id-card-alt",
            searchTerms: [ "contact", "demographics", "document", "identification", "issued", "profile" ]
        }, {
            title: "far fa-id-card-alt",
            searchTerms: [ "contact", "demographics", "document", "identification", "issued", "profile" ]
        }, {
            title: "fal fa-id-card-alt",
            searchTerms: [ "contact", "demographics", "document", "identification", "issued", "profile" ]
        }, {
            title: "fab fa-ideal",
            searchTerms: []
        }, {
            title: "fas fa-igloo",
            searchTerms: [ "dome", "dwelling", "eskimo", "home", "house", "ice", "snow" ]
        }, {
            title: "far fa-igloo",
            searchTerms: [ "dome", "dwelling", "eskimo", "home", "house", "ice", "snow" ]
        }, {
            title: "fal fa-igloo",
            searchTerms: [ "dome", "dwelling", "eskimo", "home", "house", "ice", "snow" ]
        }, {
            title: "fas fa-image",
            searchTerms: [ "album", "landscape", "photo", "picture" ]
        }, {
            title: "far fa-image",
            searchTerms: [ "album", "landscape", "photo", "picture" ]
        }, {
            title: "fal fa-image",
            searchTerms: [ "album", "landscape", "photo", "picture" ]
        }, {
            title: "fas fa-image-polaroid",
            searchTerms: [ "capture", "film", "instant camera", "lens", "photo", "photography", "retro", "snapshot", "vintage" ]
        }, {
            title: "far fa-image-polaroid",
            searchTerms: [ "capture", "film", "instant camera", "lens", "photo", "photography", "retro", "snapshot", "vintage" ]
        }, {
            title: "fal fa-image-polaroid",
            searchTerms: [ "capture", "film", "instant camera", "lens", "photo", "photography", "retro", "snapshot", "vintage" ]
        }, {
            title: "fas fa-images",
            searchTerms: [ "album", "landscape", "photo", "picture" ]
        }, {
            title: "far fa-images",
            searchTerms: [ "album", "landscape", "photo", "picture" ]
        }, {
            title: "fal fa-images",
            searchTerms: [ "album", "landscape", "photo", "picture" ]
        }, {
            title: "fab fa-imdb",
            searchTerms: []
        }, {
            title: "fas fa-inbox",
            searchTerms: [ "archive", "desk", "email", "mail", "message" ]
        }, {
            title: "far fa-inbox",
            searchTerms: [ "archive", "desk", "email", "mail", "message" ]
        }, {
            title: "fal fa-inbox",
            searchTerms: [ "archive", "desk", "email", "mail", "message" ]
        }, {
            title: "fas fa-inbox-in",
            searchTerms: [ "archive", "desk", "email", "mail", "message" ]
        }, {
            title: "far fa-inbox-in",
            searchTerms: [ "archive", "desk", "email", "mail", "message" ]
        }, {
            title: "fal fa-inbox-in",
            searchTerms: [ "archive", "desk", "email", "mail", "message" ]
        }, {
            title: "fas fa-inbox-out",
            searchTerms: [ "archive", "desk", "email", "mail", "message" ]
        }, {
            title: "far fa-inbox-out",
            searchTerms: [ "archive", "desk", "email", "mail", "message" ]
        }, {
            title: "fal fa-inbox-out",
            searchTerms: [ "archive", "desk", "email", "mail", "message" ]
        }, {
            title: "fas fa-indent",
            searchTerms: [ "align", "justify", "paragraph", "tab" ]
        }, {
            title: "far fa-indent",
            searchTerms: [ "align", "justify", "paragraph", "tab" ]
        }, {
            title: "fal fa-indent",
            searchTerms: [ "align", "justify", "paragraph", "tab" ]
        }, {
            title: "fas fa-industry",
            searchTerms: [ "building", "factory", "industrial", "manufacturing", "mill", "warehouse" ]
        }, {
            title: "far fa-industry",
            searchTerms: [ "building", "factory", "industrial", "manufacturing", "mill", "warehouse" ]
        }, {
            title: "fal fa-industry",
            searchTerms: [ "building", "factory", "industrial", "manufacturing", "mill", "warehouse" ]
        }, {
            title: "fas fa-industry-alt",
            searchTerms: [ "building", "factory", "industrial", "manufacturing", "mill", "warehouse" ]
        }, {
            title: "far fa-industry-alt",
            searchTerms: [ "building", "factory", "industrial", "manufacturing", "mill", "warehouse" ]
        }, {
            title: "fal fa-industry-alt",
            searchTerms: [ "building", "factory", "industrial", "manufacturing", "mill", "warehouse" ]
        }, {
            title: "fas fa-infinity",
            searchTerms: [ "eternity", "forever", "math" ]
        }, {
            title: "far fa-infinity",
            searchTerms: [ "eternity", "forever", "math" ]
        }, {
            title: "fal fa-infinity",
            searchTerms: [ "eternity", "forever", "math" ]
        }, {
            title: "fas fa-info",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "far fa-info",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "fal fa-info",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "fas fa-info-circle",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "far fa-info-circle",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "fal fa-info-circle",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "fas fa-info-square",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "far fa-info-square",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "fal fa-info-square",
            searchTerms: [ "details", "help", "information", "more", "support" ]
        }, {
            title: "fas fa-inhaler",
            searchTerms: [ "asthma", "cough", "lungs", "nebulizer", "vaporizer" ]
        }, {
            title: "far fa-inhaler",
            searchTerms: [ "asthma", "cough", "lungs", "nebulizer", "vaporizer" ]
        }, {
            title: "fal fa-inhaler",
            searchTerms: [ "asthma", "cough", "lungs", "nebulizer", "vaporizer" ]
        }, {
            title: "fab fa-instagram",
            searchTerms: []
        }, {
            title: "fas fa-integral",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "far fa-integral",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "fal fa-integral",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "fab fa-intercom",
            searchTerms: [ "app", "customer", "messenger" ]
        }, {
            title: "fab fa-internet-explorer",
            searchTerms: [ "browser", "ie" ]
        }, {
            title: "fas fa-intersection",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "far fa-intersection",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "fal fa-intersection",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "fas fa-inventory",
            searchTerms: [ "archive", "box", "shipping", "warehouse" ]
        }, {
            title: "far fa-inventory",
            searchTerms: [ "archive", "box", "shipping", "warehouse" ]
        }, {
            title: "fal fa-inventory",
            searchTerms: [ "archive", "box", "shipping", "warehouse" ]
        }, {
            title: "fab fa-invision",
            searchTerms: [ "app", "design", "interface" ]
        }, {
            title: "fab fa-ioxhost",
            searchTerms: []
        }, {
            title: "fas fa-island-tropical",
            searchTerms: [ "castaway", "desert", "palm tree", "sand", "stranded", "summer", "vacation" ]
        }, {
            title: "far fa-island-tropical",
            searchTerms: [ "castaway", "desert", "palm tree", "sand", "stranded", "summer", "vacation" ]
        }, {
            title: "fal fa-island-tropical",
            searchTerms: [ "castaway", "desert", "palm tree", "sand", "stranded", "summer", "vacation" ]
        }, {
            title: "fas fa-italic",
            searchTerms: [ "edit", "emphasis", "font", "format", "text", "type" ]
        }, {
            title: "far fa-italic",
            searchTerms: [ "edit", "emphasis", "font", "format", "text", "type" ]
        }, {
            title: "fal fa-italic",
            searchTerms: [ "edit", "emphasis", "font", "format", "text", "type" ]
        }, {
            title: "fab fa-itch-io",
            searchTerms: []
        }, {
            title: "fab fa-itunes",
            searchTerms: []
        }, {
            title: "fab fa-itunes-note",
            searchTerms: []
        }, {
            title: "fas fa-jack-o-lantern",
            searchTerms: [ "carve", "face", "halloween", "lantern", "pumpkin", "smile" ]
        }, {
            title: "far fa-jack-o-lantern",
            searchTerms: [ "carve", "face", "halloween", "lantern", "pumpkin", "smile" ]
        }, {
            title: "fal fa-jack-o-lantern",
            searchTerms: [ "carve", "face", "halloween", "lantern", "pumpkin", "smile" ]
        }, {
            title: "fab fa-java",
            searchTerms: []
        }, {
            title: "fas fa-jedi",
            searchTerms: [ "crest", "force", "sith", "skywalker", "star wars", "yoda" ]
        }, {
            title: "far fa-jedi",
            searchTerms: [ "crest", "force", "sith", "skywalker", "star wars", "yoda" ]
        }, {
            title: "fal fa-jedi",
            searchTerms: [ "crest", "force", "sith", "skywalker", "star wars", "yoda" ]
        }, {
            title: "fab fa-jedi-order",
            searchTerms: [ "star wars" ]
        }, {
            title: "fab fa-jenkins",
            searchTerms: []
        }, {
            title: "fab fa-jira",
            searchTerms: [ "atlassian" ]
        }, {
            title: "fab fa-joget",
            searchTerms: []
        }, {
            title: "fas fa-joint",
            searchTerms: [ "blunt", "cannabis", "doobie", "drugs", "marijuana", "roach", "smoke", "smoking", "spliff" ]
        }, {
            title: "far fa-joint",
            searchTerms: [ "blunt", "cannabis", "doobie", "drugs", "marijuana", "roach", "smoke", "smoking", "spliff" ]
        }, {
            title: "fal fa-joint",
            searchTerms: [ "blunt", "cannabis", "doobie", "drugs", "marijuana", "roach", "smoke", "smoking", "spliff" ]
        }, {
            title: "fab fa-joomla",
            searchTerms: []
        }, {
            title: "fas fa-journal-whills",
            searchTerms: [ "book", "force", "jedi", "sith", "star wars", "yoda" ]
        }, {
            title: "far fa-journal-whills",
            searchTerms: [ "book", "force", "jedi", "sith", "star wars", "yoda" ]
        }, {
            title: "fal fa-journal-whills",
            searchTerms: [ "book", "force", "jedi", "sith", "star wars", "yoda" ]
        }, {
            title: "fas fa-joystick",
            searchTerms: [ "arcade", "atari", "controller", "retro", "video game", "vintage" ]
        }, {
            title: "far fa-joystick",
            searchTerms: [ "arcade", "atari", "controller", "retro", "video game", "vintage" ]
        }, {
            title: "fal fa-joystick",
            searchTerms: [ "arcade", "atari", "controller", "retro", "video game", "vintage" ]
        }, {
            title: "fab fa-js",
            searchTerms: []
        }, {
            title: "fab fa-js-square",
            searchTerms: []
        }, {
            title: "fab fa-jsfiddle",
            searchTerms: []
        }, {
            title: "fal fa-jug",
            searchTerms: [ "beverage", "bottle", "drink", "moonshine", "pitcher", "western" ]
        }, {
            title: "far fa-jug",
            searchTerms: [ "beverage", "bottle", "drink", "moonshine", "pitcher", "western" ]
        }, {
            title: "fas fa-jug",
            searchTerms: [ "beverage", "bottle", "drink", "moonshine", "pitcher", "western" ]
        }, {
            title: "fas fa-kaaba",
            searchTerms: [ "building", "cube", "islam", "muslim" ]
        }, {
            title: "far fa-kaaba",
            searchTerms: [ "building", "cube", "islam", "muslim" ]
        }, {
            title: "fal fa-kaaba",
            searchTerms: [ "building", "cube", "islam", "muslim" ]
        }, {
            title: "fab fa-kaggle",
            searchTerms: []
        }, {
            title: "fas fa-kazoo",
            searchTerms: [ "buzz", "instrument", "membranophone", "mirliton", "music" ]
        }, {
            title: "far fa-kazoo",
            searchTerms: [ "buzz", "instrument", "membranophone", "mirliton", "music" ]
        }, {
            title: "fal fa-kazoo",
            searchTerms: [ "buzz", "instrument", "membranophone", "mirliton", "music" ]
        }, {
            title: "fas fa-kerning",
            searchTerms: [ "adjust", "font", "spacing", "text", "tracking", "type", "typography" ]
        }, {
            title: "far fa-kerning",
            searchTerms: [ "adjust", "font", "spacing", "text", "tracking", "type", "typography" ]
        }, {
            title: "fal fa-kerning",
            searchTerms: [ "adjust", "font", "spacing", "text", "tracking", "type", "typography" ]
        }, {
            title: "fas fa-key",
            searchTerms: [ "lock", "password", "private", "secret", "unlock" ]
        }, {
            title: "far fa-key",
            searchTerms: [ "lock", "password", "private", "secret", "unlock" ]
        }, {
            title: "fal fa-key",
            searchTerms: [ "lock", "password", "private", "secret", "unlock" ]
        }, {
            title: "fas fa-key-skeleton",
            searchTerms: [ "halloween", "lock", "password", "private", "secret", "unlock" ]
        }, {
            title: "far fa-key-skeleton",
            searchTerms: [ "halloween", "lock", "password", "private", "secret", "unlock" ]
        }, {
            title: "fal fa-key-skeleton",
            searchTerms: [ "halloween", "lock", "password", "private", "secret", "unlock" ]
        }, {
            title: "fab fa-keybase",
            searchTerms: []
        }, {
            title: "fas fa-keyboard",
            searchTerms: [ "accessory", "edit", "input", "text", "type", "write" ]
        }, {
            title: "far fa-keyboard",
            searchTerms: [ "accessory", "edit", "input", "text", "type", "write" ]
        }, {
            title: "fal fa-keyboard",
            searchTerms: [ "accessory", "edit", "input", "text", "type", "write" ]
        }, {
            title: "fab fa-keycdn",
            searchTerms: []
        }, {
            title: "fas fa-keynote",
            searchTerms: [ "lecture", "panel", "seminar", "speak", "speaker", "talk" ]
        }, {
            title: "far fa-keynote",
            searchTerms: [ "lecture", "panel", "seminar", "speak", "speaker", "talk" ]
        }, {
            title: "fal fa-keynote",
            searchTerms: [ "lecture", "panel", "seminar", "speak", "speaker", "talk" ]
        }, {
            title: "fas fa-khanda",
            searchTerms: [ "chakkar", "sikh", "sikhism", "sword" ]
        }, {
            title: "far fa-khanda",
            searchTerms: [ "chakkar", "sikh", "sikhism", "sword" ]
        }, {
            title: "fal fa-khanda",
            searchTerms: [ "chakkar", "sikh", "sikhism", "sword" ]
        }, {
            title: "fab fa-kickstarter",
            searchTerms: []
        }, {
            title: "fab fa-kickstarter-k",
            searchTerms: []
        }, {
            title: "fas fa-kidneys",
            searchTerms: [ "blood", "body", "organ", "surgery", "urine" ]
        }, {
            title: "far fa-kidneys",
            searchTerms: [ "blood", "body", "organ", "surgery", "urine" ]
        }, {
            title: "fal fa-kidneys",
            searchTerms: [ "blood", "body", "organ", "surgery", "urine" ]
        }, {
            title: "fas fa-kiss",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "far fa-kiss",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fal fa-kiss",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fas fa-kiss-beam",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "far fa-kiss-beam",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fal fa-kiss-beam",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fas fa-kiss-wink-heart",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "far fa-kiss-wink-heart",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fal fa-kiss-wink-heart",
            searchTerms: [ "beso", "emoticon", "face", "love", "smooch" ]
        }, {
            title: "fas fa-kite",
            searchTerms: [ "air", "benjamin", "fall", "flying", "franklin", "outdoors", "seasonal", "sky", "wind" ]
        }, {
            title: "far fa-kite",
            searchTerms: [ "air", "benjamin", "fall", "flying", "franklin", "outdoors", "seasonal", "sky", "wind" ]
        }, {
            title: "fal fa-kite",
            searchTerms: [ "air", "benjamin", "fall", "flying", "franklin", "outdoors", "seasonal", "sky", "wind" ]
        }, {
            title: "fas fa-kiwi-bird",
            searchTerms: [ "bird", "fauna", "new zealand" ]
        }, {
            title: "far fa-kiwi-bird",
            searchTerms: [ "bird", "fauna", "new zealand" ]
        }, {
            title: "fal fa-kiwi-bird",
            searchTerms: [ "bird", "fauna", "new zealand" ]
        }, {
            title: "fas fa-knife-kitchen",
            searchTerms: [ "chef", "cut", "halloween", "sharp", "slice", "tool" ]
        }, {
            title: "far fa-knife-kitchen",
            searchTerms: [ "chef", "cut", "halloween", "sharp", "slice", "tool" ]
        }, {
            title: "fal fa-knife-kitchen",
            searchTerms: [ "chef", "cut", "halloween", "sharp", "slice", "tool" ]
        }, {
            title: "fab fa-korvue",
            searchTerms: []
        }, {
            title: "fas fa-lambda",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "far fa-lambda",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "fal fa-lambda",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "fas fa-lamp",
            searchTerms: [ "bright", "furniture", "light" ]
        }, {
            title: "far fa-lamp",
            searchTerms: [ "bright", "furniture", "light" ]
        }, {
            title: "fal fa-lamp",
            searchTerms: [ "bright", "furniture", "light" ]
        }, {
            title: "fas fa-lamp-desk",
            searchTerms: [ "bright", "furniture", "light" ]
        }, {
            title: "far fa-lamp-desk",
            searchTerms: [ "bright", "furniture", "light" ]
        }, {
            title: "fal fa-lamp-desk",
            searchTerms: [ "bright", "furniture", "light" ]
        }, {
            title: "fas fa-lamp-floor",
            searchTerms: [ "bright", "furniture", "light" ]
        }, {
            title: "far fa-lamp-floor",
            searchTerms: [ "bright", "furniture", "light" ]
        }, {
            title: "fal fa-lamp-floor",
            searchTerms: [ "bright", "furniture", "light" ]
        }, {
            title: "fas fa-landmark",
            searchTerms: [ "building", "historic", "memorable", "monument", "politics" ]
        }, {
            title: "far fa-landmark",
            searchTerms: [ "building", "historic", "memorable", "monument", "politics" ]
        }, {
            title: "fal fa-landmark",
            searchTerms: [ "building", "historic", "memorable", "monument", "politics" ]
        }, {
            title: "fas fa-landmark-alt",
            searchTerms: [ "building", "historic", "memorable", "monument", "politics" ]
        }, {
            title: "far fa-landmark-alt",
            searchTerms: [ "building", "historic", "memorable", "monument", "politics" ]
        }, {
            title: "fal fa-landmark-alt",
            searchTerms: [ "building", "historic", "memorable", "monument", "politics" ]
        }, {
            title: "fas fa-language",
            searchTerms: [ "dialect", "idiom", "localize", "speech", "translate", "vernacular" ]
        }, {
            title: "far fa-language",
            searchTerms: [ "dialect", "idiom", "localize", "speech", "translate", "vernacular" ]
        }, {
            title: "fal fa-language",
            searchTerms: [ "dialect", "idiom", "localize", "speech", "translate", "vernacular" ]
        }, {
            title: "fas fa-laptop",
            searchTerms: [ "computer", "cpu", "dell", "demo", "device", "mac", "macbook", "machine", "pc" ]
        }, {
            title: "far fa-laptop",
            searchTerms: [ "computer", "cpu", "dell", "demo", "device", "mac", "macbook", "machine", "pc" ]
        }, {
            title: "fal fa-laptop",
            searchTerms: [ "computer", "cpu", "dell", "demo", "device", "mac", "macbook", "machine", "pc" ]
        }, {
            title: "fas fa-laptop-code",
            searchTerms: [ "computer", "cpu", "dell", "demo", "develop", "device", "mac", "macbook", "machine", "pc" ]
        }, {
            title: "far fa-laptop-code",
            searchTerms: [ "computer", "cpu", "dell", "demo", "develop", "device", "mac", "macbook", "machine", "pc" ]
        }, {
            title: "fal fa-laptop-code",
            searchTerms: [ "computer", "cpu", "dell", "demo", "develop", "device", "mac", "macbook", "machine", "pc" ]
        }, {
            title: "fas fa-laptop-medical",
            searchTerms: [ "computer", "device", "ehr", "electronic health records", "history" ]
        }, {
            title: "far fa-laptop-medical",
            searchTerms: [ "computer", "device", "ehr", "electronic health records", "history" ]
        }, {
            title: "fal fa-laptop-medical",
            searchTerms: [ "computer", "device", "ehr", "electronic health records", "history" ]
        }, {
            title: "fab fa-laravel",
            searchTerms: []
        }, {
            title: "fal fa-lasso",
            searchTerms: [ "cowboy", "rodeo", "rope", "select", "selection", "western" ]
        }, {
            title: "far fa-lasso",
            searchTerms: [ "cowboy", "rodeo", "rope", "select", "selection", "western" ]
        }, {
            title: "fas fa-lasso",
            searchTerms: [ "cowboy", "rodeo", "rope", "select", "selection", "western" ]
        }, {
            title: "fab fa-lastfm",
            searchTerms: []
        }, {
            title: "fab fa-lastfm-square",
            searchTerms: []
        }, {
            title: "fas fa-laugh",
            searchTerms: [ "LOL", "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "far fa-laugh",
            searchTerms: [ "LOL", "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fal fa-laugh",
            searchTerms: [ "LOL", "emoticon", "face", "laugh", "smile" ]
        }, {
            title: "fas fa-laugh-beam",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "far fa-laugh-beam",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fal fa-laugh-beam",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fas fa-laugh-squint",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "far fa-laugh-squint",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fal fa-laugh-squint",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fas fa-laugh-wink",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "far fa-laugh-wink",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fal fa-laugh-wink",
            searchTerms: [ "LOL", "emoticon", "face", "happy", "smile" ]
        }, {
            title: "fas fa-layer-group",
            searchTerms: [ "arrange", "develop", "layers", "map", "stack" ]
        }, {
            title: "far fa-layer-group",
            searchTerms: [ "arrange", "develop", "layers", "map", "stack" ]
        }, {
            title: "fal fa-layer-group",
            searchTerms: [ "arrange", "develop", "layers", "map", "stack" ]
        }, {
            title: "fas fa-layer-minus",
            searchTerms: [ "arrange", "delete", "negative", "remove", "stack" ]
        }, {
            title: "far fa-layer-minus",
            searchTerms: [ "arrange", "delete", "negative", "remove", "stack" ]
        }, {
            title: "fal fa-layer-minus",
            searchTerms: [ "arrange", "delete", "negative", "remove", "stack" ]
        }, {
            title: "fas fa-layer-plus",
            searchTerms: [ "add", "arrange", "create", "new", "positive", "stack" ]
        }, {
            title: "far fa-layer-plus",
            searchTerms: [ "add", "arrange", "create", "new", "positive", "stack" ]
        }, {
            title: "fal fa-layer-plus",
            searchTerms: [ "add", "arrange", "create", "new", "positive", "stack" ]
        }, {
            title: "fas fa-leaf",
            searchTerms: [ "eco", "flora", "nature", "plant", "vegan" ]
        }, {
            title: "far fa-leaf",
            searchTerms: [ "eco", "flora", "nature", "plant", "vegan" ]
        }, {
            title: "fal fa-leaf",
            searchTerms: [ "eco", "flora", "nature", "plant", "vegan" ]
        }, {
            title: "fas fa-leaf-heart",
            searchTerms: [ "eco", "flora", "nature", "plant", "vegan" ]
        }, {
            title: "far fa-leaf-heart",
            searchTerms: [ "eco", "flora", "nature", "plant", "vegan" ]
        }, {
            title: "fal fa-leaf-heart",
            searchTerms: [ "eco", "flora", "nature", "plant", "vegan" ]
        }, {
            title: "fas fa-leaf-maple",
            searchTerms: [ "eco", "fall", "flora", "nature", "plant", "seasonal" ]
        }, {
            title: "far fa-leaf-maple",
            searchTerms: [ "eco", "fall", "flora", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-leaf-maple",
            searchTerms: [ "eco", "fall", "flora", "nature", "plant", "seasonal" ]
        }, {
            title: "fas fa-leaf-oak",
            searchTerms: [ "eco", "fall", "flora", "nature", "plant", "seasonal" ]
        }, {
            title: "far fa-leaf-oak",
            searchTerms: [ "eco", "fall", "flora", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-leaf-oak",
            searchTerms: [ "eco", "fall", "flora", "nature", "plant", "seasonal" ]
        }, {
            title: "fab fa-leanpub",
            searchTerms: []
        }, {
            title: "fas fa-lemon",
            searchTerms: [ "citrus", "lemonade", "lime", "tart" ]
        }, {
            title: "far fa-lemon",
            searchTerms: [ "citrus", "lemonade", "lime", "tart" ]
        }, {
            title: "fal fa-lemon",
            searchTerms: [ "citrus", "lemonade", "lime", "tart" ]
        }, {
            title: "fab fa-less",
            searchTerms: []
        }, {
            title: "fas fa-less-than",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "far fa-less-than",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fal fa-less-than",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fas fa-less-than-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "far fa-less-than-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fal fa-less-than-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fas fa-level-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "far fa-level-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-level-down",
            searchTerms: [ "arrow" ]
        }, {
            title: "fas fa-level-down-alt",
            searchTerms: [ "arrow", "level-down" ]
        }, {
            title: "far fa-level-down-alt",
            searchTerms: [ "arrow", "level-down" ]
        }, {
            title: "fal fa-level-down-alt",
            searchTerms: [ "arrow", "level-down" ]
        }, {
            title: "fas fa-level-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "far fa-level-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fal fa-level-up",
            searchTerms: [ "arrow" ]
        }, {
            title: "fas fa-level-up-alt",
            searchTerms: [ "arrow", "level-up" ]
        }, {
            title: "far fa-level-up-alt",
            searchTerms: [ "arrow", "level-up" ]
        }, {
            title: "fal fa-level-up-alt",
            searchTerms: [ "arrow", "level-up" ]
        }, {
            title: "fas fa-life-ring",
            searchTerms: [ "coast guard", "help", "overboard", "save", "support" ]
        }, {
            title: "far fa-life-ring",
            searchTerms: [ "coast guard", "help", "overboard", "save", "support" ]
        }, {
            title: "fal fa-life-ring",
            searchTerms: [ "coast guard", "help", "overboard", "save", "support" ]
        }, {
            title: "fas fa-light-ceiling",
            searchTerms: [ "bright", "furniture", "light", "overhead" ]
        }, {
            title: "far fa-light-ceiling",
            searchTerms: [ "bright", "furniture", "light", "overhead" ]
        }, {
            title: "fal fa-light-ceiling",
            searchTerms: [ "bright", "furniture", "light", "overhead" ]
        }, {
            title: "fas fa-light-switch",
            searchTerms: [ "light", "off", "on" ]
        }, {
            title: "far fa-light-switch",
            searchTerms: [ "light", "off", "on" ]
        }, {
            title: "fal fa-light-switch",
            searchTerms: [ "light", "off", "on" ]
        }, {
            title: "fas fa-light-switch-off",
            searchTerms: [ "light", "off", "on" ]
        }, {
            title: "far fa-light-switch-off",
            searchTerms: [ "light", "off", "on" ]
        }, {
            title: "fal fa-light-switch-off",
            searchTerms: [ "light", "off", "on" ]
        }, {
            title: "fas fa-light-switch-on",
            searchTerms: [ "light", "off", "on" ]
        }, {
            title: "far fa-light-switch-on",
            searchTerms: [ "light", "off", "on" ]
        }, {
            title: "fal fa-light-switch-on",
            searchTerms: [ "light", "off", "on" ]
        }, {
            title: "fas fa-lightbulb",
            searchTerms: [ "energy", "idea", "inspiration", "light" ]
        }, {
            title: "far fa-lightbulb",
            searchTerms: [ "energy", "idea", "inspiration", "light" ]
        }, {
            title: "fal fa-lightbulb",
            searchTerms: [ "energy", "idea", "inspiration", "light" ]
        }, {
            title: "fas fa-lightbulb-dollar",
            searchTerms: [ "energy", "idea", "inspiration", "light", "money" ]
        }, {
            title: "far fa-lightbulb-dollar",
            searchTerms: [ "energy", "idea", "inspiration", "light", "money" ]
        }, {
            title: "fal fa-lightbulb-dollar",
            searchTerms: [ "energy", "idea", "inspiration", "light", "money" ]
        }, {
            title: "fas fa-lightbulb-exclamation",
            searchTerms: [ "alert", "energy", "idea", "inspiration", "light" ]
        }, {
            title: "far fa-lightbulb-exclamation",
            searchTerms: [ "alert", "energy", "idea", "inspiration", "light" ]
        }, {
            title: "fal fa-lightbulb-exclamation",
            searchTerms: [ "alert", "energy", "idea", "inspiration", "light" ]
        }, {
            title: "fas fa-lightbulb-on",
            searchTerms: [ "energy", "idea", "inspiration", "light", "shine" ]
        }, {
            title: "far fa-lightbulb-on",
            searchTerms: [ "energy", "idea", "inspiration", "light", "shine" ]
        }, {
            title: "fal fa-lightbulb-on",
            searchTerms: [ "energy", "idea", "inspiration", "light", "shine" ]
        }, {
            title: "fas fa-lightbulb-slash",
            searchTerms: [ "dark", "light", "off" ]
        }, {
            title: "far fa-lightbulb-slash",
            searchTerms: [ "dark", "light", "off" ]
        }, {
            title: "fal fa-lightbulb-slash",
            searchTerms: [ "dark", "light", "off" ]
        }, {
            title: "fas fa-lights-holiday",
            searchTerms: [ "bulb", "christmas", "decoration", "holiday", "string", "xmas" ]
        }, {
            title: "far fa-lights-holiday",
            searchTerms: [ "bulb", "christmas", "decoration", "holiday", "string", "xmas" ]
        }, {
            title: "fal fa-lights-holiday",
            searchTerms: [ "bulb", "christmas", "decoration", "holiday", "string", "xmas" ]
        }, {
            title: "fab fa-line",
            searchTerms: []
        }, {
            title: "fas fa-line-columns",
            searchTerms: [ "divide", "organize", "panes", "split" ]
        }, {
            title: "far fa-line-columns",
            searchTerms: [ "divide", "organize", "panes", "split" ]
        }, {
            title: "fal fa-line-columns",
            searchTerms: [ "divide", "organize", "panes", "split" ]
        }, {
            title: "fas fa-line-height",
            searchTerms: [ "baseline", "letter", "spacing", "text" ]
        }, {
            title: "far fa-line-height",
            searchTerms: [ "baseline", "letter", "spacing", "text" ]
        }, {
            title: "fal fa-line-height",
            searchTerms: [ "baseline", "letter", "spacing", "text" ]
        }, {
            title: "fas fa-link",
            searchTerms: [ "attach", "attachment", "chain", "connect" ]
        }, {
            title: "far fa-link",
            searchTerms: [ "attach", "attachment", "chain", "connect" ]
        }, {
            title: "fal fa-link",
            searchTerms: [ "attach", "attachment", "chain", "connect" ]
        }, {
            title: "fab fa-linkedin",
            searchTerms: [ "linkedin-square" ]
        }, {
            title: "fab fa-linkedin-in",
            searchTerms: [ "linkedin" ]
        }, {
            title: "fab fa-linode",
            searchTerms: []
        }, {
            title: "fab fa-linux",
            searchTerms: [ "tux" ]
        }, {
            title: "fas fa-lips",
            searchTerms: [ "fashion", "kiss", "lipstick", "mouth", "smile" ]
        }, {
            title: "far fa-lips",
            searchTerms: [ "fashion", "kiss", "lipstick", "mouth", "smile" ]
        }, {
            title: "fal fa-lips",
            searchTerms: [ "fashion", "kiss", "lipstick", "mouth", "smile" ]
        }, {
            title: "fas fa-lira-sign",
            searchTerms: [ "currency", "money", "try", "turkish" ]
        }, {
            title: "far fa-lira-sign",
            searchTerms: [ "currency", "money", "try", "turkish" ]
        }, {
            title: "fal fa-lira-sign",
            searchTerms: [ "currency", "money", "try", "turkish" ]
        }, {
            title: "fas fa-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "far fa-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fas fa-list-alt",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "far fa-list-alt",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list-alt",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fas fa-list-music",
            searchTerms: [ "album", "itunes", "music", "playlist", "podcast", "soundtrack" ]
        }, {
            title: "far fa-list-music",
            searchTerms: [ "album", "itunes", "music", "playlist", "podcast", "soundtrack" ]
        }, {
            title: "fal fa-list-music",
            searchTerms: [ "album", "itunes", "music", "playlist", "podcast", "soundtrack" ]
        }, {
            title: "fas fa-list-ol",
            searchTerms: [ "checklist", "completed", "done", "finished", "numbers", "ol", "todo", "ul" ]
        }, {
            title: "far fa-list-ol",
            searchTerms: [ "checklist", "completed", "done", "finished", "numbers", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list-ol",
            searchTerms: [ "checklist", "completed", "done", "finished", "numbers", "ol", "todo", "ul" ]
        }, {
            title: "fas fa-list-ul",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "far fa-list-ul",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-list-ul",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fas fa-location",
            searchTerms: [ "address", "coordinate", "direction", "gps", "map", "navigation", "place", "where" ]
        }, {
            title: "far fa-location",
            searchTerms: [ "address", "coordinate", "direction", "gps", "map", "navigation", "place", "where" ]
        }, {
            title: "fal fa-location",
            searchTerms: [ "address", "coordinate", "direction", "gps", "map", "navigation", "place", "where" ]
        }, {
            title: "fas fa-location-arrow",
            searchTerms: [ "address", "compass", "coordinate", "direction", "gps", "map", "navigation", "place" ]
        }, {
            title: "far fa-location-arrow",
            searchTerms: [ "address", "compass", "coordinate", "direction", "gps", "map", "navigation", "place" ]
        }, {
            title: "fal fa-location-arrow",
            searchTerms: [ "address", "compass", "coordinate", "direction", "gps", "map", "navigation", "place" ]
        }, {
            title: "fas fa-location-circle",
            searchTerms: [ "address", "compass", "coordinate", "direction", "gps", "map", "navigation", "place" ]
        }, {
            title: "far fa-location-circle",
            searchTerms: [ "address", "compass", "coordinate", "direction", "gps", "map", "navigation", "place" ]
        }, {
            title: "fal fa-location-circle",
            searchTerms: [ "address", "compass", "coordinate", "direction", "gps", "map", "navigation", "place" ]
        }, {
            title: "fas fa-location-slash",
            searchTerms: [ "address", "coordinate", "direction", "gps", "map", "navigation", "place", "where" ]
        }, {
            title: "far fa-location-slash",
            searchTerms: [ "address", "coordinate", "direction", "gps", "map", "navigation", "place", "where" ]
        }, {
            title: "fal fa-location-slash",
            searchTerms: [ "address", "coordinate", "direction", "gps", "map", "navigation", "place", "where" ]
        }, {
            title: "fas fa-lock",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "far fa-lock",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "fal fa-lock",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "fas fa-lock-alt",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "far fa-lock-alt",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "fal fa-lock-alt",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "fas fa-lock-open",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "far fa-lock-open",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "fal fa-lock-open",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "fas fa-lock-open-alt",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "far fa-lock-open-alt",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "fal fa-lock-open-alt",
            searchTerms: [ "admin", "lock", "open", "password", "private", "protect", "security" ]
        }, {
            title: "fas fa-long-arrow-alt-down",
            searchTerms: [ "download", "long-arrow-down" ]
        }, {
            title: "far fa-long-arrow-alt-down",
            searchTerms: [ "download", "long-arrow-down" ]
        }, {
            title: "fal fa-long-arrow-alt-down",
            searchTerms: [ "download", "long-arrow-down" ]
        }, {
            title: "fas fa-long-arrow-alt-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "far fa-long-arrow-alt-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "fal fa-long-arrow-alt-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "fas fa-long-arrow-alt-right",
            searchTerms: [ "forward", "long-arrow-right", "next" ]
        }, {
            title: "far fa-long-arrow-alt-right",
            searchTerms: [ "forward", "long-arrow-right", "next" ]
        }, {
            title: "fal fa-long-arrow-alt-right",
            searchTerms: [ "forward", "long-arrow-right", "next" ]
        }, {
            title: "fas fa-long-arrow-alt-up",
            searchTerms: [ "long-arrow-up", "upload" ]
        }, {
            title: "far fa-long-arrow-alt-up",
            searchTerms: [ "long-arrow-up", "upload" ]
        }, {
            title: "fal fa-long-arrow-alt-up",
            searchTerms: [ "long-arrow-up", "upload" ]
        }, {
            title: "fas fa-long-arrow-down",
            searchTerms: [ "download", "long-arrow-down" ]
        }, {
            title: "far fa-long-arrow-down",
            searchTerms: [ "download", "long-arrow-down" ]
        }, {
            title: "fal fa-long-arrow-down",
            searchTerms: [ "download", "long-arrow-down" ]
        }, {
            title: "fas fa-long-arrow-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "far fa-long-arrow-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "fal fa-long-arrow-left",
            searchTerms: [ "back", "long-arrow-left", "previous" ]
        }, {
            title: "fas fa-long-arrow-right",
            searchTerms: [ "forward", "long-arrow-right", "next" ]
        }, {
            title: "far fa-long-arrow-right",
            searchTerms: [ "forward", "long-arrow-right", "next" ]
        }, {
            title: "fal fa-long-arrow-right",
            searchTerms: [ "forward", "long-arrow-right", "next" ]
        }, {
            title: "fas fa-long-arrow-up",
            searchTerms: [ "long-arrow-up", "upload" ]
        }, {
            title: "far fa-long-arrow-up",
            searchTerms: [ "long-arrow-up", "upload" ]
        }, {
            title: "fal fa-long-arrow-up",
            searchTerms: [ "long-arrow-up", "upload" ]
        }, {
            title: "fas fa-loveseat",
            searchTerms: [ "chair", "couch", "cushion", "furniture", "relax", "sofa" ]
        }, {
            title: "far fa-loveseat",
            searchTerms: [ "chair", "couch", "cushion", "furniture", "relax", "sofa" ]
        }, {
            title: "fal fa-loveseat",
            searchTerms: [ "chair", "couch", "cushion", "furniture", "relax", "sofa" ]
        }, {
            title: "fas fa-low-vision",
            searchTerms: [ "blind", "eye", "sight" ]
        }, {
            title: "far fa-low-vision",
            searchTerms: [ "blind", "eye", "sight" ]
        }, {
            title: "fal fa-low-vision",
            searchTerms: [ "blind", "eye", "sight" ]
        }, {
            title: "fas fa-luchador",
            searchTerms: [ "fight", "mexico", "nacho libre", "wrestle", "wrestling" ]
        }, {
            title: "far fa-luchador",
            searchTerms: [ "fight", "mexico", "nacho libre", "wrestle", "wrestling" ]
        }, {
            title: "fal fa-luchador",
            searchTerms: [ "fight", "mexico", "nacho libre", "wrestle", "wrestling" ]
        }, {
            title: "fas fa-luggage-cart",
            searchTerms: [ "bag", "baggage", "suitcase", "travel" ]
        }, {
            title: "far fa-luggage-cart",
            searchTerms: [ "bag", "baggage", "suitcase", "travel" ]
        }, {
            title: "fal fa-luggage-cart",
            searchTerms: [ "bag", "baggage", "suitcase", "travel" ]
        }, {
            title: "fas fa-lungs",
            searchTerms: [ "air", "breath", "organ", "respiratory" ]
        }, {
            title: "far fa-lungs",
            searchTerms: [ "air", "breath", "organ", "respiratory" ]
        }, {
            title: "fal fa-lungs",
            searchTerms: [ "air", "breath", "organ", "respiratory" ]
        }, {
            title: "fab fa-lyft",
            searchTerms: []
        }, {
            title: "fas fa-mace",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "melee attack", "weapon", "windu" ]
        }, {
            title: "far fa-mace",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "melee attack", "weapon", "windu" ]
        }, {
            title: "fal fa-mace",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "melee attack", "weapon", "windu" ]
        }, {
            title: "fab fa-magento",
            searchTerms: []
        }, {
            title: "fas fa-magic",
            searchTerms: [ "autocomplete", "automatic", "mage", "magic", "spell", "wand", "witch", "wizard" ]
        }, {
            title: "far fa-magic",
            searchTerms: [ "autocomplete", "automatic", "mage", "magic", "spell", "wand", "witch", "wizard" ]
        }, {
            title: "fal fa-magic",
            searchTerms: [ "autocomplete", "automatic", "mage", "magic", "spell", "wand", "witch", "wizard" ]
        }, {
            title: "fas fa-magnet",
            searchTerms: [ "Attract", "lodestone", "tool" ]
        }, {
            title: "far fa-magnet",
            searchTerms: [ "Attract", "lodestone", "tool" ]
        }, {
            title: "fal fa-magnet",
            searchTerms: [ "Attract", "lodestone", "tool" ]
        }, {
            title: "fas fa-mail-bulk",
            searchTerms: [ "archive", "envelope", "letter", "post office", "postal", "postcard", "send", "stamp", "usps" ]
        }, {
            title: "far fa-mail-bulk",
            searchTerms: [ "archive", "envelope", "letter", "post office", "postal", "postcard", "send", "stamp", "usps" ]
        }, {
            title: "fal fa-mail-bulk",
            searchTerms: [ "archive", "envelope", "letter", "post office", "postal", "postcard", "send", "stamp", "usps" ]
        }, {
            title: "fas fa-mailbox",
            searchTerms: [ "archive", "envelope", "letter", "post office", "postal", "postcard", "send", "stamp", "usps" ]
        }, {
            title: "far fa-mailbox",
            searchTerms: [ "archive", "envelope", "letter", "post office", "postal", "postcard", "send", "stamp", "usps" ]
        }, {
            title: "fal fa-mailbox",
            searchTerms: [ "archive", "envelope", "letter", "post office", "postal", "postcard", "send", "stamp", "usps" ]
        }, {
            title: "fab fa-mailchimp",
            searchTerms: []
        }, {
            title: "fas fa-male",
            searchTerms: [ "human", "man", "person", "profile", "user" ]
        }, {
            title: "far fa-male",
            searchTerms: [ "human", "man", "person", "profile", "user" ]
        }, {
            title: "fal fa-male",
            searchTerms: [ "human", "man", "person", "profile", "user" ]
        }, {
            title: "fab fa-mandalorian",
            searchTerms: []
        }, {
            title: "fas fa-mandolin",
            searchTerms: [ "Dungeons & Dragons", "bard", "d&d", "dnd", "fantasy", "guitar", "instrument", "lute", "music", "song", "strings" ]
        }, {
            title: "far fa-mandolin",
            searchTerms: [ "Dungeons & Dragons", "bard", "d&d", "dnd", "fantasy", "guitar", "instrument", "lute", "music", "song", "strings" ]
        }, {
            title: "fal fa-mandolin",
            searchTerms: [ "Dungeons & Dragons", "bard", "d&d", "dnd", "fantasy", "guitar", "instrument", "lute", "music", "song", "strings" ]
        }, {
            title: "fas fa-map",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "far fa-map",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fal fa-map",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fas fa-map-marked",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "far fa-map-marked",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fal fa-map-marked",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fas fa-map-marked-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "far fa-map-marked-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fal fa-map-marked-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fas fa-map-marker",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "far fa-map-marker",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fal fa-map-marker",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fas fa-map-marker-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "far fa-map-marker-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fal fa-map-marker-alt",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fas fa-map-marker-alt-slash",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "far fa-map-marker-alt-slash",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fal fa-map-marker-alt-slash",
            searchTerms: [ "address", "coordinates", "destination", "gps", "localize", "location", "map", "navigation", "paper", "pin", "place", "point of interest", "position", "route", "travel" ]
        }, {
            title: "fas fa-map-marker-check",
            searchTerms: [ "agree", "coordinates", "destination", "location", "map", "navigation", "pin", "place", "select", "success", "tick", "todo" ]
        }, {
            title: "far fa-map-marker-check",
            searchTerms: [ "agree", "coordinates", "destination", "location", "map", "navigation", "pin", "place", "select", "success", "tick", "todo" ]
        }, {
            title: "fal fa-map-marker-check",
            searchTerms: [ "agree", "coordinates", "destination", "location", "map", "navigation", "pin", "place", "select", "success", "tick", "todo" ]
        }, {
            title: "fas fa-map-marker-edit",
            searchTerms: [ "agree", "coordinates", "destination", "edit", "location", "map", "navigation", "pen", "pencil", "pin", "place", "update", "write" ]
        }, {
            title: "far fa-map-marker-edit",
            searchTerms: [ "agree", "coordinates", "destination", "edit", "location", "map", "navigation", "pen", "pencil", "pin", "place", "update", "write" ]
        }, {
            title: "fal fa-map-marker-edit",
            searchTerms: [ "agree", "coordinates", "destination", "edit", "location", "map", "navigation", "pen", "pencil", "pin", "place", "update", "write" ]
        }, {
            title: "fas fa-map-marker-exclamation",
            searchTerms: [ "agree", "alert", "coordinates", "destination", "important", "location", "map", "navigation", "pin", "place" ]
        }, {
            title: "far fa-map-marker-exclamation",
            searchTerms: [ "agree", "alert", "coordinates", "destination", "important", "location", "map", "navigation", "pin", "place" ]
        }, {
            title: "fal fa-map-marker-exclamation",
            searchTerms: [ "agree", "alert", "coordinates", "destination", "important", "location", "map", "navigation", "pin", "place" ]
        }, {
            title: "fas fa-map-marker-minus",
            searchTerms: [ "agree", "coordinates", "delete", "destination", "location", "map", "navigation", "negative", "pin", "place", "remove" ]
        }, {
            title: "far fa-map-marker-minus",
            searchTerms: [ "agree", "coordinates", "delete", "destination", "location", "map", "navigation", "negative", "pin", "place", "remove" ]
        }, {
            title: "fal fa-map-marker-minus",
            searchTerms: [ "agree", "coordinates", "delete", "destination", "location", "map", "navigation", "negative", "pin", "place", "remove" ]
        }, {
            title: "fas fa-map-marker-plus",
            searchTerms: [ "add", "agree", "coordinates", "create", "destination", "location", "map", "navigation", "new", "pin", "place", "positive" ]
        }, {
            title: "far fa-map-marker-plus",
            searchTerms: [ "add", "agree", "coordinates", "create", "destination", "location", "map", "navigation", "new", "pin", "place", "positive" ]
        }, {
            title: "fal fa-map-marker-plus",
            searchTerms: [ "add", "agree", "coordinates", "create", "destination", "location", "map", "navigation", "new", "pin", "place", "positive" ]
        }, {
            title: "fas fa-map-marker-question",
            searchTerms: [ "agree", "coordinates", "destination", "help", "info", "location", "map", "navigation", "pin", "place", "support" ]
        }, {
            title: "far fa-map-marker-question",
            searchTerms: [ "agree", "coordinates", "destination", "help", "info", "location", "map", "navigation", "pin", "place", "support" ]
        }, {
            title: "fal fa-map-marker-question",
            searchTerms: [ "agree", "coordinates", "destination", "help", "info", "location", "map", "navigation", "pin", "place", "support" ]
        }, {
            title: "fas fa-map-marker-slash",
            searchTerms: [ "agree", "cancel", "coordinates", "destination", "location", "map", "missing", "navigation", "pin", "place" ]
        }, {
            title: "far fa-map-marker-slash",
            searchTerms: [ "agree", "cancel", "coordinates", "destination", "location", "map", "missing", "navigation", "pin", "place" ]
        }, {
            title: "fal fa-map-marker-slash",
            searchTerms: [ "agree", "cancel", "coordinates", "destination", "location", "map", "missing", "navigation", "pin", "place" ]
        }, {
            title: "fas fa-map-marker-smile",
            searchTerms: [ "agree", "coordinates", "destination", "emoji", "happy", "location", "map", "navigation", "pin", "place", "success" ]
        }, {
            title: "far fa-map-marker-smile",
            searchTerms: [ "agree", "coordinates", "destination", "emoji", "happy", "location", "map", "navigation", "pin", "place", "success" ]
        }, {
            title: "fal fa-map-marker-smile",
            searchTerms: [ "agree", "coordinates", "destination", "emoji", "happy", "location", "map", "navigation", "pin", "place", "success" ]
        }, {
            title: "fas fa-map-marker-times",
            searchTerms: [ "agree", "archive", "coordinates", "delete", "destination", "location", "map", "navigation", "pin", "place", "remove", "x" ]
        }, {
            title: "far fa-map-marker-times",
            searchTerms: [ "agree", "archive", "coordinates", "delete", "destination", "location", "map", "navigation", "pin", "place", "remove", "x" ]
        }, {
            title: "fal fa-map-marker-times",
            searchTerms: [ "agree", "archive", "coordinates", "delete", "destination", "location", "map", "navigation", "pin", "place", "remove", "x" ]
        }, {
            title: "fas fa-map-pin",
            searchTerms: [ "address", "agree", "coordinates", "destination", "gps", "localize", "location", "map", "marker", "navigation", "pin", "place", "position", "travel" ]
        }, {
            title: "far fa-map-pin",
            searchTerms: [ "address", "agree", "coordinates", "destination", "gps", "localize", "location", "map", "marker", "navigation", "pin", "place", "position", "travel" ]
        }, {
            title: "fal fa-map-pin",
            searchTerms: [ "address", "agree", "coordinates", "destination", "gps", "localize", "location", "map", "marker", "navigation", "pin", "place", "position", "travel" ]
        }, {
            title: "fas fa-map-signs",
            searchTerms: [ "directions", "directory", "map", "signage", "wayfinding" ]
        }, {
            title: "far fa-map-signs",
            searchTerms: [ "directions", "directory", "map", "signage", "wayfinding" ]
        }, {
            title: "fal fa-map-signs",
            searchTerms: [ "directions", "directory", "map", "signage", "wayfinding" ]
        }, {
            title: "fab fa-markdown",
            searchTerms: []
        }, {
            title: "fas fa-marker",
            searchTerms: [ "design", "edit", "sharpie", "update", "write" ]
        }, {
            title: "far fa-marker",
            searchTerms: [ "design", "edit", "sharpie", "update", "write" ]
        }, {
            title: "fal fa-marker",
            searchTerms: [ "design", "edit", "sharpie", "update", "write" ]
        }, {
            title: "fas fa-mars",
            searchTerms: [ "male" ]
        }, {
            title: "far fa-mars",
            searchTerms: [ "male" ]
        }, {
            title: "fal fa-mars",
            searchTerms: [ "male" ]
        }, {
            title: "fas fa-mars-double",
            searchTerms: []
        }, {
            title: "far fa-mars-double",
            searchTerms: []
        }, {
            title: "fal fa-mars-double",
            searchTerms: []
        }, {
            title: "fas fa-mars-stroke",
            searchTerms: []
        }, {
            title: "far fa-mars-stroke",
            searchTerms: []
        }, {
            title: "fal fa-mars-stroke",
            searchTerms: []
        }, {
            title: "fas fa-mars-stroke-h",
            searchTerms: []
        }, {
            title: "far fa-mars-stroke-h",
            searchTerms: []
        }, {
            title: "fal fa-mars-stroke-h",
            searchTerms: []
        }, {
            title: "fas fa-mars-stroke-v",
            searchTerms: []
        }, {
            title: "far fa-mars-stroke-v",
            searchTerms: []
        }, {
            title: "fal fa-mars-stroke-v",
            searchTerms: []
        }, {
            title: "fas fa-mask",
            searchTerms: [ "carnivale", "costume", "disguise", "halloween", "secret", "super hero" ]
        }, {
            title: "far fa-mask",
            searchTerms: [ "carnivale", "costume", "disguise", "halloween", "secret", "super hero" ]
        }, {
            title: "fal fa-mask",
            searchTerms: [ "carnivale", "costume", "disguise", "halloween", "secret", "super hero" ]
        }, {
            title: "fab fa-mastodon",
            searchTerms: []
        }, {
            title: "fab fa-maxcdn",
            searchTerms: []
        }, {
            title: "fab fa-mdb",
            searchTerms: []
        }, {
            title: "fas fa-meat",
            searchTerms: [ "beef", "ham", "mutton", "pork", "veal" ]
        }, {
            title: "far fa-meat",
            searchTerms: [ "beef", "ham", "mutton", "pork", "veal" ]
        }, {
            title: "fal fa-meat",
            searchTerms: [ "beef", "ham", "mutton", "pork", "veal" ]
        }, {
            title: "fas fa-medal",
            searchTerms: [ "award", "ribbon", "star", "trophy" ]
        }, {
            title: "far fa-medal",
            searchTerms: [ "award", "ribbon", "star", "trophy" ]
        }, {
            title: "fal fa-medal",
            searchTerms: [ "award", "ribbon", "star", "trophy" ]
        }, {
            title: "fab fa-medapps",
            searchTerms: []
        }, {
            title: "fab fa-medium",
            searchTerms: []
        }, {
            title: "fab fa-medium-m",
            searchTerms: []
        }, {
            title: "fas fa-medkit",
            searchTerms: [ "first aid", "firstaid", "health", "help", "support" ]
        }, {
            title: "far fa-medkit",
            searchTerms: [ "first aid", "firstaid", "health", "help", "support" ]
        }, {
            title: "fal fa-medkit",
            searchTerms: [ "first aid", "firstaid", "health", "help", "support" ]
        }, {
            title: "fab fa-medrt",
            searchTerms: []
        }, {
            title: "fab fa-meetup",
            searchTerms: []
        }, {
            title: "fas fa-megaphone",
            searchTerms: [ "announcement", "broadcast", "bullhorn", "louder", "share" ]
        }, {
            title: "far fa-megaphone",
            searchTerms: [ "announcement", "broadcast", "bullhorn", "louder", "share" ]
        }, {
            title: "fal fa-megaphone",
            searchTerms: [ "announcement", "broadcast", "bullhorn", "louder", "share" ]
        }, {
            title: "fab fa-megaport",
            searchTerms: []
        }, {
            title: "fas fa-meh",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "far fa-meh",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fal fa-meh",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fas fa-meh-blank",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "far fa-meh-blank",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fal fa-meh-blank",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fas fa-meh-rolling-eyes",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "far fa-meh-rolling-eyes",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fal fa-meh-rolling-eyes",
            searchTerms: [ "emoticon", "face", "neutral", "rating" ]
        }, {
            title: "fas fa-memory",
            searchTerms: [ "DIMM", "RAM", "hardware", "storage", "technology" ]
        }, {
            title: "far fa-memory",
            searchTerms: [ "DIMM", "RAM", "hardware", "storage", "technology" ]
        }, {
            title: "fal fa-memory",
            searchTerms: [ "DIMM", "RAM", "hardware", "storage", "technology" ]
        }, {
            title: "fab fa-mendeley",
            searchTerms: []
        }, {
            title: "fas fa-menorah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "far fa-menorah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "fal fa-menorah",
            searchTerms: [ "candle", "hanukkah", "jewish", "judaism", "light" ]
        }, {
            title: "fas fa-mercury",
            searchTerms: [ "transgender" ]
        }, {
            title: "far fa-mercury",
            searchTerms: [ "transgender" ]
        }, {
            title: "fal fa-mercury",
            searchTerms: [ "transgender" ]
        }, {
            title: "fas fa-meteor",
            searchTerms: [ "armageddon", "asteroid", "comet", "shooting star", "space" ]
        }, {
            title: "far fa-meteor",
            searchTerms: [ "armageddon", "asteroid", "comet", "shooting star", "space" ]
        }, {
            title: "fal fa-meteor",
            searchTerms: [ "armageddon", "asteroid", "comet", "shooting star", "space" ]
        }, {
            title: "fab fa-microblog",
            searchTerms: []
        }, {
            title: "fas fa-microchip",
            searchTerms: [ "cpu", "hardware", "processor", "technology" ]
        }, {
            title: "far fa-microchip",
            searchTerms: [ "cpu", "hardware", "processor", "technology" ]
        }, {
            title: "fal fa-microchip",
            searchTerms: [ "cpu", "hardware", "processor", "technology" ]
        }, {
            title: "fas fa-microphone",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "far fa-microphone",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fal fa-microphone",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fas fa-microphone-alt",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "far fa-microphone-alt",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fal fa-microphone-alt",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fas fa-microphone-alt-slash",
            searchTerms: [ "audio", "disable", "mute", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "far fa-microphone-alt-slash",
            searchTerms: [ "audio", "disable", "mute", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fal fa-microphone-alt-slash",
            searchTerms: [ "audio", "disable", "mute", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fas fa-microphone-slash",
            searchTerms: [ "audio", "disable", "mute", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "far fa-microphone-slash",
            searchTerms: [ "audio", "disable", "mute", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fal fa-microphone-slash",
            searchTerms: [ "audio", "disable", "mute", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fas fa-microphone-stand",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "far fa-microphone-stand",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fal fa-microphone-stand",
            searchTerms: [ "audio", "podcast", "record", "sing", "sound", "voice" ]
        }, {
            title: "fas fa-microscope",
            searchTerms: [ "electron", "lens", "optics", "science", "shrink" ]
        }, {
            title: "far fa-microscope",
            searchTerms: [ "electron", "lens", "optics", "science", "shrink" ]
        }, {
            title: "fal fa-microscope",
            searchTerms: [ "electron", "lens", "optics", "science", "shrink" ]
        }, {
            title: "fab fa-microsoft",
            searchTerms: []
        }, {
            title: "fas fa-microwave",
            searchTerms: [ "chef", "cook", "kitchen", "nuke" ]
        }, {
            title: "far fa-microwave",
            searchTerms: [ "chef", "cook", "kitchen", "nuke" ]
        }, {
            title: "fal fa-microwave",
            searchTerms: [ "chef", "cook", "kitchen", "nuke" ]
        }, {
            title: "fas fa-mind-share",
            searchTerms: [ "brain", "brainstorming", "meeting", "planning" ]
        }, {
            title: "far fa-mind-share",
            searchTerms: [ "brain", "brainstorming", "meeting", "planning" ]
        }, {
            title: "fal fa-mind-share",
            searchTerms: [ "brain", "brainstorming", "meeting", "planning" ]
        }, {
            title: "fas fa-minus",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "trash" ]
        }, {
            title: "far fa-minus",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "trash" ]
        }, {
            title: "fal fa-minus",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "trash" ]
        }, {
            title: "fas fa-minus-circle",
            searchTerms: [ "delete", "hide", "negative", "remove", "shape", "trash" ]
        }, {
            title: "far fa-minus-circle",
            searchTerms: [ "delete", "hide", "negative", "remove", "shape", "trash" ]
        }, {
            title: "fal fa-minus-circle",
            searchTerms: [ "delete", "hide", "negative", "remove", "shape", "trash" ]
        }, {
            title: "fas fa-minus-hexagon",
            searchTerms: [ "delete", "hide", "negative", "remove", "shape", "trash" ]
        }, {
            title: "far fa-minus-hexagon",
            searchTerms: [ "delete", "hide", "negative", "remove", "shape", "trash" ]
        }, {
            title: "fal fa-minus-hexagon",
            searchTerms: [ "delete", "hide", "negative", "remove", "shape", "trash" ]
        }, {
            title: "fas fa-minus-octagon",
            searchTerms: [ "delete", "hide", "negative", "remove", "shape", "trash" ]
        }, {
            title: "far fa-minus-octagon",
            searchTerms: [ "delete", "hide", "negative", "remove", "shape", "trash" ]
        }, {
            title: "fal fa-minus-octagon",
            searchTerms: [ "delete", "hide", "negative", "remove", "shape", "trash" ]
        }, {
            title: "fas fa-minus-square",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "shape", "trash" ]
        }, {
            title: "far fa-minus-square",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "shape", "trash" ]
        }, {
            title: "fal fa-minus-square",
            searchTerms: [ "collapse", "delete", "hide", "minify", "negative", "remove", "shape", "trash" ]
        }, {
            title: "fas fa-mistletoe",
            searchTerms: [ "awkward", "christmas", "decoration", "flora", "holiday", "kiss", "plant", "tradition", "trap", "xmas" ]
        }, {
            title: "far fa-mistletoe",
            searchTerms: [ "awkward", "christmas", "decoration", "flora", "holiday", "kiss", "plant", "tradition", "trap", "xmas" ]
        }, {
            title: "fal fa-mistletoe",
            searchTerms: [ "awkward", "christmas", "decoration", "flora", "holiday", "kiss", "plant", "tradition", "trap", "xmas" ]
        }, {
            title: "fas fa-mitten",
            searchTerms: [ "clothing", "cold", "glove", "hands", "knitted", "seasonal", "warmth" ]
        }, {
            title: "far fa-mitten",
            searchTerms: [ "clothing", "cold", "glove", "hands", "knitted", "seasonal", "warmth" ]
        }, {
            title: "fal fa-mitten",
            searchTerms: [ "clothing", "cold", "glove", "hands", "knitted", "seasonal", "warmth" ]
        }, {
            title: "fab fa-mix",
            searchTerms: []
        }, {
            title: "fab fa-mixcloud",
            searchTerms: []
        }, {
            title: "fab fa-mizuni",
            searchTerms: []
        }, {
            title: "fas fa-mobile",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone" ]
        }, {
            title: "far fa-mobile",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone" ]
        }, {
            title: "fal fa-mobile",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone" ]
        }, {
            title: "fas fa-mobile-alt",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone" ]
        }, {
            title: "far fa-mobile-alt",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone" ]
        }, {
            title: "fal fa-mobile-alt",
            searchTerms: [ "apple", "call", "cell phone", "cellphone", "device", "iphone", "number", "screen", "telephone" ]
        }, {
            title: "fas fa-mobile-android",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "far fa-mobile-android",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "fal fa-mobile-android",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "fas fa-mobile-android-alt",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "far fa-mobile-android-alt",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "fal fa-mobile-android-alt",
            searchTerms: [ "android", "call", "cell phone", "cellphone", "device", "number", "screen", "telephone", "text" ]
        }, {
            title: "fab fa-modx",
            searchTerms: []
        }, {
            title: "fab fa-monero",
            searchTerms: []
        }, {
            title: "fas fa-money-bill",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "far fa-money-bill",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fal fa-money-bill",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fas fa-money-bill-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "far fa-money-bill-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fal fa-money-bill-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fas fa-money-bill-wave",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "far fa-money-bill-wave",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fal fa-money-bill-wave",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fas fa-money-bill-wave-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "far fa-money-bill-wave-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fal fa-money-bill-wave-alt",
            searchTerms: [ "buy", "cash", "checkout", "money", "payment", "price", "purchase" ]
        }, {
            title: "fas fa-money-check",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "price", "purchase" ]
        }, {
            title: "far fa-money-check",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "price", "purchase" ]
        }, {
            title: "fal fa-money-check",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "price", "purchase" ]
        }, {
            title: "fas fa-money-check-alt",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "price", "purchase" ]
        }, {
            title: "far fa-money-check-alt",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "price", "purchase" ]
        }, {
            title: "fal fa-money-check-alt",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "price", "purchase" ]
        }, {
            title: "fas fa-money-check-edit",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "pen", "price", "purchase" ]
        }, {
            title: "far fa-money-check-edit",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "pen", "price", "purchase" ]
        }, {
            title: "fal fa-money-check-edit",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "pen", "price", "purchase" ]
        }, {
            title: "fas fa-money-check-edit-alt",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "pen", "price", "purchase" ]
        }, {
            title: "far fa-money-check-edit-alt",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "pen", "price", "purchase" ]
        }, {
            title: "fal fa-money-check-edit-alt",
            searchTerms: [ "bank check", "buy", "checkout", "cheque", "money", "payment", "pen", "price", "purchase" ]
        }, {
            title: "fas fa-monitor-heart-rate",
            searchTerms: [ "EKG", "electrocardiogram", "health", "life", "vital" ]
        }, {
            title: "far fa-monitor-heart-rate",
            searchTerms: [ "EKG", "electrocardiogram", "health", "life", "vital" ]
        }, {
            title: "fal fa-monitor-heart-rate",
            searchTerms: [ "EKG", "electrocardiogram", "health", "life", "vital" ]
        }, {
            title: "fas fa-monkey",
            searchTerms: [ "animal", "banana", "fauna", "mammal", "tail" ]
        }, {
            title: "far fa-monkey",
            searchTerms: [ "animal", "banana", "fauna", "mammal", "tail" ]
        }, {
            title: "fal fa-monkey",
            searchTerms: [ "animal", "banana", "fauna", "mammal", "tail" ]
        }, {
            title: "fas fa-monument",
            searchTerms: [ "building", "historic", "landmark", "memorable" ]
        }, {
            title: "far fa-monument",
            searchTerms: [ "building", "historic", "landmark", "memorable" ]
        }, {
            title: "fal fa-monument",
            searchTerms: [ "building", "historic", "landmark", "memorable" ]
        }, {
            title: "fas fa-moon",
            searchTerms: [ "contrast", "crescent", "dark", "lunar", "night" ]
        }, {
            title: "far fa-moon",
            searchTerms: [ "contrast", "crescent", "dark", "lunar", "night" ]
        }, {
            title: "fal fa-moon",
            searchTerms: [ "contrast", "crescent", "dark", "lunar", "night" ]
        }, {
            title: "fas fa-moon-cloud",
            searchTerms: [ "crescent", "dark", "lunar", "night", "overcast" ]
        }, {
            title: "far fa-moon-cloud",
            searchTerms: [ "crescent", "dark", "lunar", "night", "overcast" ]
        }, {
            title: "fal fa-moon-cloud",
            searchTerms: [ "crescent", "dark", "lunar", "night", "overcast" ]
        }, {
            title: "fas fa-moon-stars",
            searchTerms: [ "clear", "crescent", "lunar", "space", "star" ]
        }, {
            title: "far fa-moon-stars",
            searchTerms: [ "clear", "crescent", "lunar", "space", "star" ]
        }, {
            title: "fal fa-moon-stars",
            searchTerms: [ "clear", "crescent", "lunar", "space", "star" ]
        }, {
            title: "fas fa-mortar-pestle",
            searchTerms: [ "crush", "culinary", "grind", "medical", "mix", "pharmacy", "prescription", "spices" ]
        }, {
            title: "far fa-mortar-pestle",
            searchTerms: [ "crush", "culinary", "grind", "medical", "mix", "pharmacy", "prescription", "spices" ]
        }, {
            title: "fal fa-mortar-pestle",
            searchTerms: [ "crush", "culinary", "grind", "medical", "mix", "pharmacy", "prescription", "spices" ]
        }, {
            title: "fas fa-mosque",
            searchTerms: [ "building", "islam", "landmark", "muslim" ]
        }, {
            title: "far fa-mosque",
            searchTerms: [ "building", "islam", "landmark", "muslim" ]
        }, {
            title: "fal fa-mosque",
            searchTerms: [ "building", "islam", "landmark", "muslim" ]
        }, {
            title: "fas fa-motorcycle",
            searchTerms: [ "bike", "machine", "transportation", "vehicle" ]
        }, {
            title: "far fa-motorcycle",
            searchTerms: [ "bike", "machine", "transportation", "vehicle" ]
        }, {
            title: "fal fa-motorcycle",
            searchTerms: [ "bike", "machine", "transportation", "vehicle" ]
        }, {
            title: "fas fa-mountain",
            searchTerms: [ "glacier", "hiking", "hill", "landscape", "travel", "view" ]
        }, {
            title: "far fa-mountain",
            searchTerms: [ "glacier", "hiking", "hill", "landscape", "travel", "view" ]
        }, {
            title: "fal fa-mountain",
            searchTerms: [ "glacier", "hiking", "hill", "landscape", "travel", "view" ]
        }, {
            title: "fas fa-mountains",
            searchTerms: [ "glacier", "hiking", "hill", "landscape", "travel", "view" ]
        }, {
            title: "far fa-mountains",
            searchTerms: [ "glacier", "hiking", "hill", "landscape", "travel", "view" ]
        }, {
            title: "fal fa-mountains",
            searchTerms: [ "glacier", "hiking", "hill", "landscape", "travel", "view" ]
        }, {
            title: "fas fa-mouse",
            searchTerms: [ "click", "computer", "cursor", "input", "peripheral" ]
        }, {
            title: "far fa-mouse",
            searchTerms: [ "click", "computer", "cursor", "input", "peripheral" ]
        }, {
            title: "fal fa-mouse",
            searchTerms: [ "click", "computer", "cursor", "input", "peripheral" ]
        }, {
            title: "fas fa-mouse-alt",
            searchTerms: [ "click", "computer", "cursor", "input", "peripheral" ]
        }, {
            title: "far fa-mouse-alt",
            searchTerms: [ "click", "computer", "cursor", "input", "peripheral" ]
        }, {
            title: "fal fa-mouse-alt",
            searchTerms: [ "click", "computer", "cursor", "input", "peripheral" ]
        }, {
            title: "fas fa-mouse-pointer",
            searchTerms: [ "arrow", "cursor", "select" ]
        }, {
            title: "far fa-mouse-pointer",
            searchTerms: [ "arrow", "cursor", "select" ]
        }, {
            title: "fal fa-mouse-pointer",
            searchTerms: [ "arrow", "cursor", "select" ]
        }, {
            title: "fas fa-mp3-player",
            searchTerms: [ "audio", "handheld", "ipod", "itunes", "music", "zune" ]
        }, {
            title: "far fa-mp3-player",
            searchTerms: [ "audio", "handheld", "ipod", "itunes", "music", "zune" ]
        }, {
            title: "fal fa-mp3-player",
            searchTerms: [ "audio", "handheld", "ipod", "itunes", "music", "zune" ]
        }, {
            title: "fas fa-mug",
            searchTerms: [ "coffee", "cup", "drink", "hot chocolate", "tea" ]
        }, {
            title: "far fa-mug",
            searchTerms: [ "coffee", "cup", "drink", "hot chocolate", "tea" ]
        }, {
            title: "fal fa-mug",
            searchTerms: [ "coffee", "cup", "drink", "hot chocolate", "tea" ]
        }, {
            title: "fas fa-mug-hot",
            searchTerms: [ "caliente", "cocoa", "coffee", "cup", "drink", "holiday", "hot chocolate", "steam", "tea", "warmth" ]
        }, {
            title: "far fa-mug-hot",
            searchTerms: [ "caliente", "cocoa", "coffee", "cup", "drink", "holiday", "hot chocolate", "steam", "tea", "warmth" ]
        }, {
            title: "fal fa-mug-hot",
            searchTerms: [ "caliente", "cocoa", "coffee", "cup", "drink", "holiday", "hot chocolate", "steam", "tea", "warmth" ]
        }, {
            title: "fas fa-mug-marshmallows",
            searchTerms: [ "cocoa", "coffee", "cup", "drink", "hot chocolate", "seasonal", "sweet", "warmth" ]
        }, {
            title: "far fa-mug-marshmallows",
            searchTerms: [ "cocoa", "coffee", "cup", "drink", "hot chocolate", "seasonal", "sweet", "warmth" ]
        }, {
            title: "fal fa-mug-marshmallows",
            searchTerms: [ "cocoa", "coffee", "cup", "drink", "hot chocolate", "seasonal", "sweet", "warmth" ]
        }, {
            title: "fas fa-mug-tea",
            searchTerms: [ "brew", "drink", "herbal", "oolong" ]
        }, {
            title: "far fa-mug-tea",
            searchTerms: [ "brew", "drink", "herbal", "oolong" ]
        }, {
            title: "fal fa-mug-tea",
            searchTerms: [ "brew", "drink", "herbal", "oolong" ]
        }, {
            title: "fas fa-music",
            searchTerms: [ "lyrics", "melody", "note", "sing", "sound" ]
        }, {
            title: "far fa-music",
            searchTerms: [ "lyrics", "melody", "note", "sing", "sound" ]
        }, {
            title: "fal fa-music",
            searchTerms: [ "lyrics", "melody", "note", "sing", "sound" ]
        }, {
            title: "fas fa-music-alt",
            searchTerms: [ "lyrics", "melody", "note", "sing", "sound" ]
        }, {
            title: "far fa-music-alt",
            searchTerms: [ "lyrics", "melody", "note", "sing", "sound" ]
        }, {
            title: "fal fa-music-alt",
            searchTerms: [ "lyrics", "melody", "note", "sing", "sound" ]
        }, {
            title: "fas fa-music-alt-slash",
            searchTerms: [ "cancel", "disabled", "lyrics", "melody", "mute", "note", "off", "sing", "sound" ]
        }, {
            title: "far fa-music-alt-slash",
            searchTerms: [ "cancel", "disabled", "lyrics", "melody", "mute", "note", "off", "sing", "sound" ]
        }, {
            title: "fal fa-music-alt-slash",
            searchTerms: [ "cancel", "disabled", "lyrics", "melody", "mute", "note", "off", "sing", "sound" ]
        }, {
            title: "fas fa-music-slash",
            searchTerms: [ "cancel", "disabled", "lyrics", "melody", "mute", "note", "off", "sing", "sound" ]
        }, {
            title: "far fa-music-slash",
            searchTerms: [ "cancel", "disabled", "lyrics", "melody", "mute", "note", "off", "sing", "sound" ]
        }, {
            title: "fal fa-music-slash",
            searchTerms: [ "cancel", "disabled", "lyrics", "melody", "mute", "note", "off", "sing", "sound" ]
        }, {
            title: "fab fa-napster",
            searchTerms: []
        }, {
            title: "fas fa-narwhal",
            searchTerms: [ "animal", "fauna", "holiday", "ivory", "mammal", "tusk", "unicorn", "whale" ]
        }, {
            title: "far fa-narwhal",
            searchTerms: [ "animal", "fauna", "holiday", "ivory", "mammal", "tusk", "unicorn", "whale" ]
        }, {
            title: "fal fa-narwhal",
            searchTerms: [ "animal", "fauna", "holiday", "ivory", "mammal", "tusk", "unicorn", "whale" ]
        }, {
            title: "fab fa-neos",
            searchTerms: []
        }, {
            title: "fas fa-network-wired",
            searchTerms: [ "computer", "connect", "ethernet", "internet", "intranet" ]
        }, {
            title: "far fa-network-wired",
            searchTerms: [ "computer", "connect", "ethernet", "internet", "intranet" ]
        }, {
            title: "fal fa-network-wired",
            searchTerms: [ "computer", "connect", "ethernet", "internet", "intranet" ]
        }, {
            title: "fas fa-neuter",
            searchTerms: []
        }, {
            title: "far fa-neuter",
            searchTerms: []
        }, {
            title: "fal fa-neuter",
            searchTerms: []
        }, {
            title: "fas fa-newspaper",
            searchTerms: [ "article", "editorial", "headline", "journal", "journalism", "news", "press" ]
        }, {
            title: "far fa-newspaper",
            searchTerms: [ "article", "editorial", "headline", "journal", "journalism", "news", "press" ]
        }, {
            title: "fal fa-newspaper",
            searchTerms: [ "article", "editorial", "headline", "journal", "journalism", "news", "press" ]
        }, {
            title: "fab fa-nimblr",
            searchTerms: []
        }, {
            title: "fab fa-node",
            searchTerms: []
        }, {
            title: "fab fa-node-js",
            searchTerms: []
        }, {
            title: "fas fa-not-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "far fa-not-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fal fa-not-equal",
            searchTerms: [ "arithmetic", "compare", "math" ]
        }, {
            title: "fas fa-notes-medical",
            searchTerms: [ "clipboard", "doctor", "ehr", "health", "history", "records" ]
        }, {
            title: "far fa-notes-medical",
            searchTerms: [ "clipboard", "doctor", "ehr", "health", "history", "records" ]
        }, {
            title: "fal fa-notes-medical",
            searchTerms: [ "clipboard", "doctor", "ehr", "health", "history", "records" ]
        }, {
            title: "fab fa-npm",
            searchTerms: []
        }, {
            title: "fab fa-ns8",
            searchTerms: []
        }, {
            title: "fab fa-nutritionix",
            searchTerms: []
        }, {
            title: "fas fa-object-group",
            searchTerms: [ "combine", "copy", "design", "merge", "select" ]
        }, {
            title: "far fa-object-group",
            searchTerms: [ "combine", "copy", "design", "merge", "select" ]
        }, {
            title: "fal fa-object-group",
            searchTerms: [ "combine", "copy", "design", "merge", "select" ]
        }, {
            title: "fas fa-object-ungroup",
            searchTerms: [ "copy", "design", "merge", "select", "separate" ]
        }, {
            title: "far fa-object-ungroup",
            searchTerms: [ "copy", "design", "merge", "select", "separate" ]
        }, {
            title: "fal fa-object-ungroup",
            searchTerms: [ "copy", "design", "merge", "select", "separate" ]
        }, {
            title: "fas fa-octagon",
            searchTerms: [ "shape", "stop" ]
        }, {
            title: "far fa-octagon",
            searchTerms: [ "shape", "stop" ]
        }, {
            title: "fal fa-octagon",
            searchTerms: [ "shape", "stop" ]
        }, {
            title: "fab fa-odnoklassniki",
            searchTerms: []
        }, {
            title: "fab fa-odnoklassniki-square",
            searchTerms: []
        }, {
            title: "fas fa-oil-can",
            searchTerms: [ "auto", "crude", "gasoline", "grease", "lubricate", "petroleum" ]
        }, {
            title: "far fa-oil-can",
            searchTerms: [ "auto", "crude", "gasoline", "grease", "lubricate", "petroleum" ]
        }, {
            title: "fal fa-oil-can",
            searchTerms: [ "auto", "crude", "gasoline", "grease", "lubricate", "petroleum" ]
        }, {
            title: "fas fa-oil-temp",
            searchTerms: [ "auto", "crude", "gasoline", "grease", "lubricate", "overheat", "petroleum", "temperature" ]
        }, {
            title: "far fa-oil-temp",
            searchTerms: [ "auto", "crude", "gasoline", "grease", "lubricate", "overheat", "petroleum", "temperature" ]
        }, {
            title: "fal fa-oil-temp",
            searchTerms: [ "auto", "crude", "gasoline", "grease", "lubricate", "overheat", "petroleum", "temperature" ]
        }, {
            title: "fab fa-old-republic",
            searchTerms: [ "politics", "star wars" ]
        }, {
            title: "fas fa-om",
            searchTerms: [ "buddhism", "hinduism", "jainism", "mantra" ]
        }, {
            title: "far fa-om",
            searchTerms: [ "buddhism", "hinduism", "jainism", "mantra" ]
        }, {
            title: "fal fa-om",
            searchTerms: [ "buddhism", "hinduism", "jainism", "mantra" ]
        }, {
            title: "fas fa-omega",
            searchTerms: [ "alphabet", "greek", "math" ]
        }, {
            title: "far fa-omega",
            searchTerms: [ "alphabet", "greek", "math" ]
        }, {
            title: "fal fa-omega",
            searchTerms: [ "alphabet", "greek", "math" ]
        }, {
            title: "fab fa-opencart",
            searchTerms: []
        }, {
            title: "fab fa-openid",
            searchTerms: []
        }, {
            title: "fab fa-opera",
            searchTerms: []
        }, {
            title: "fab fa-optin-monster",
            searchTerms: []
        }, {
            title: "fab fa-orcid",
            searchTerms: []
        }, {
            title: "fas fa-ornament",
            searchTerms: [ "christmas", "decoration", "holiday", "xmas" ]
        }, {
            title: "far fa-ornament",
            searchTerms: [ "christmas", "decoration", "holiday", "xmas" ]
        }, {
            title: "fal fa-ornament",
            searchTerms: [ "christmas", "decoration", "holiday", "xmas" ]
        }, {
            title: "fab fa-osi",
            searchTerms: []
        }, {
            title: "fas fa-otter",
            searchTerms: [ "animal", "badger", "fauna", "fur", "mammal", "marten" ]
        }, {
            title: "far fa-otter",
            searchTerms: [ "animal", "badger", "fauna", "fur", "mammal", "marten" ]
        }, {
            title: "fal fa-otter",
            searchTerms: [ "animal", "badger", "fauna", "fur", "mammal", "marten" ]
        }, {
            title: "fas fa-outdent",
            searchTerms: [ "align", "justify", "paragraph", "tab" ]
        }, {
            title: "far fa-outdent",
            searchTerms: [ "align", "justify", "paragraph", "tab" ]
        }, {
            title: "fal fa-outdent",
            searchTerms: [ "align", "justify", "paragraph", "tab" ]
        }, {
            title: "fas fa-outlet",
            searchTerms: [ "electricity", "energy", "plug" ]
        }, {
            title: "far fa-outlet",
            searchTerms: [ "electricity", "energy", "plug" ]
        }, {
            title: "fal fa-outlet",
            searchTerms: [ "electricity", "energy", "plug" ]
        }, {
            title: "fas fa-oven",
            searchTerms: [ "bake", "broiler", "convection", "cook", "kitchen", "stove" ]
        }, {
            title: "far fa-oven",
            searchTerms: [ "bake", "broiler", "convection", "cook", "kitchen", "stove" ]
        }, {
            title: "fal fa-oven",
            searchTerms: [ "bake", "broiler", "convection", "cook", "kitchen", "stove" ]
        }, {
            title: "fas fa-overline",
            searchTerms: [ "horizontal", "line", "overbar", "overscore", "vinculum" ]
        }, {
            title: "far fa-overline",
            searchTerms: [ "horizontal", "line", "overbar", "overscore", "vinculum" ]
        }, {
            title: "fal fa-overline",
            searchTerms: [ "horizontal", "line", "overbar", "overscore", "vinculum" ]
        }, {
            title: "fas fa-page-break",
            searchTerms: [ "begin", "divide", "edit", "end", "format", "split" ]
        }, {
            title: "far fa-page-break",
            searchTerms: [ "begin", "divide", "edit", "end", "format", "split" ]
        }, {
            title: "fal fa-page-break",
            searchTerms: [ "begin", "divide", "edit", "end", "format", "split" ]
        }, {
            title: "fab fa-page4",
            searchTerms: []
        }, {
            title: "fab fa-pagelines",
            searchTerms: [ "eco", "flora", "leaf", "leaves", "nature", "plant", "tree" ]
        }, {
            title: "fas fa-pager",
            searchTerms: [ "beeper", "cellphone", "communication" ]
        }, {
            title: "far fa-pager",
            searchTerms: [ "beeper", "cellphone", "communication" ]
        }, {
            title: "fal fa-pager",
            searchTerms: [ "beeper", "cellphone", "communication" ]
        }, {
            title: "fas fa-paint-brush",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "far fa-paint-brush",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fal fa-paint-brush",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fas fa-paint-brush-alt",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "far fa-paint-brush-alt",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fal fa-paint-brush-alt",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fas fa-paint-roller",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "far fa-paint-roller",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fal fa-paint-roller",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fas fa-palette",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "far fa-palette",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fal fa-palette",
            searchTerms: [ "acrylic", "art", "brush", "color", "fill", "paint", "pigment", "watercolor" ]
        }, {
            title: "fab fa-palfed",
            searchTerms: []
        }, {
            title: "fas fa-pallet",
            searchTerms: [ "archive", "box", "inventory", "shipping", "warehouse" ]
        }, {
            title: "far fa-pallet",
            searchTerms: [ "archive", "box", "inventory", "shipping", "warehouse" ]
        }, {
            title: "fal fa-pallet",
            searchTerms: [ "archive", "box", "inventory", "shipping", "warehouse" ]
        }, {
            title: "fas fa-pallet-alt",
            searchTerms: [ "archive", "box", "inventory", "shipping", "warehouse" ]
        }, {
            title: "far fa-pallet-alt",
            searchTerms: [ "archive", "box", "inventory", "shipping", "warehouse" ]
        }, {
            title: "fal fa-pallet-alt",
            searchTerms: [ "archive", "box", "inventory", "shipping", "warehouse" ]
        }, {
            title: "fas fa-paper-plane",
            searchTerms: [ "air", "float", "fold", "mail", "paper", "send" ]
        }, {
            title: "far fa-paper-plane",
            searchTerms: [ "air", "float", "fold", "mail", "paper", "send" ]
        }, {
            title: "fal fa-paper-plane",
            searchTerms: [ "air", "float", "fold", "mail", "paper", "send" ]
        }, {
            title: "fas fa-paperclip",
            searchTerms: [ "attach", "attachment", "connect", "link" ]
        }, {
            title: "far fa-paperclip",
            searchTerms: [ "attach", "attachment", "connect", "link" ]
        }, {
            title: "fal fa-paperclip",
            searchTerms: [ "attach", "attachment", "connect", "link" ]
        }, {
            title: "fas fa-parachute-box",
            searchTerms: [ "aid", "assistance", "rescue", "supplies" ]
        }, {
            title: "far fa-parachute-box",
            searchTerms: [ "aid", "assistance", "rescue", "supplies" ]
        }, {
            title: "fal fa-parachute-box",
            searchTerms: [ "aid", "assistance", "rescue", "supplies" ]
        }, {
            title: "fas fa-paragraph",
            searchTerms: [ "edit", "format", "text", "writing" ]
        }, {
            title: "far fa-paragraph",
            searchTerms: [ "edit", "format", "text", "writing" ]
        }, {
            title: "fal fa-paragraph",
            searchTerms: [ "edit", "format", "text", "writing" ]
        }, {
            title: "fas fa-paragraph-rtl",
            searchTerms: [ "edit", "format", "text", "writing" ]
        }, {
            title: "far fa-paragraph-rtl",
            searchTerms: [ "edit", "format", "text", "writing" ]
        }, {
            title: "fal fa-paragraph-rtl",
            searchTerms: [ "edit", "format", "text", "writing" ]
        }, {
            title: "fas fa-parking",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "far fa-parking",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "fal fa-parking",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "fas fa-parking-circle",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "far fa-parking-circle",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "fal fa-parking-circle",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "fas fa-parking-circle-slash",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "far fa-parking-circle-slash",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "fal fa-parking-circle-slash",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "fas fa-parking-slash",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "far fa-parking-slash",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "fal fa-parking-slash",
            searchTerms: [ "auto", "car", "garage", "meter" ]
        }, {
            title: "fas fa-passport",
            searchTerms: [ "document", "id", "identification", "issued", "travel" ]
        }, {
            title: "far fa-passport",
            searchTerms: [ "document", "id", "identification", "issued", "travel" ]
        }, {
            title: "fal fa-passport",
            searchTerms: [ "document", "id", "identification", "issued", "travel" ]
        }, {
            title: "fas fa-pastafarianism",
            searchTerms: [ "agnosticism", "atheism", "flying spaghetti monster", "fsm" ]
        }, {
            title: "far fa-pastafarianism",
            searchTerms: [ "agnosticism", "atheism", "flying spaghetti monster", "fsm" ]
        }, {
            title: "fal fa-pastafarianism",
            searchTerms: [ "agnosticism", "atheism", "flying spaghetti monster", "fsm" ]
        }, {
            title: "fas fa-paste",
            searchTerms: [ "clipboard", "copy", "document", "paper" ]
        }, {
            title: "far fa-paste",
            searchTerms: [ "clipboard", "copy", "document", "paper" ]
        }, {
            title: "fal fa-paste",
            searchTerms: [ "clipboard", "copy", "document", "paper" ]
        }, {
            title: "fab fa-patreon",
            searchTerms: []
        }, {
            title: "fas fa-pause",
            searchTerms: [ "hold", "wait" ]
        }, {
            title: "far fa-pause",
            searchTerms: [ "hold", "wait" ]
        }, {
            title: "fal fa-pause",
            searchTerms: [ "hold", "wait" ]
        }, {
            title: "fas fa-pause-circle",
            searchTerms: [ "hold", "wait" ]
        }, {
            title: "far fa-pause-circle",
            searchTerms: [ "hold", "wait" ]
        }, {
            title: "fal fa-pause-circle",
            searchTerms: [ "hold", "wait" ]
        }, {
            title: "fas fa-paw",
            searchTerms: [ "animal", "cat", "dog", "pet", "print" ]
        }, {
            title: "far fa-paw",
            searchTerms: [ "animal", "cat", "dog", "pet", "print" ]
        }, {
            title: "fal fa-paw",
            searchTerms: [ "animal", "cat", "dog", "pet", "print" ]
        }, {
            title: "fas fa-paw-alt",
            searchTerms: [ "animal", "cat", "dog", "pet", "print" ]
        }, {
            title: "far fa-paw-alt",
            searchTerms: [ "animal", "cat", "dog", "pet", "print" ]
        }, {
            title: "fal fa-paw-alt",
            searchTerms: [ "animal", "cat", "dog", "pet", "print" ]
        }, {
            title: "fas fa-paw-claws",
            searchTerms: [ "Dungeons & Dragons", "animal", "beast", "d&d", "dnd", "fantasy", "lion", "pet", "print" ]
        }, {
            title: "far fa-paw-claws",
            searchTerms: [ "Dungeons & Dragons", "animal", "beast", "d&d", "dnd", "fantasy", "lion", "pet", "print" ]
        }, {
            title: "fal fa-paw-claws",
            searchTerms: [ "Dungeons & Dragons", "animal", "beast", "d&d", "dnd", "fantasy", "lion", "pet", "print" ]
        }, {
            title: "fab fa-paypal",
            searchTerms: []
        }, {
            title: "fas fa-peace",
            searchTerms: [ "serenity", "tranquility", "truce", "war" ]
        }, {
            title: "far fa-peace",
            searchTerms: [ "serenity", "tranquility", "truce", "war" ]
        }, {
            title: "fal fa-peace",
            searchTerms: [ "serenity", "tranquility", "truce", "war" ]
        }, {
            title: "fas fa-pegasus",
            searchTerms: [ "fantasy", "horse", "unicorn", "wings" ]
        }, {
            title: "far fa-pegasus",
            searchTerms: [ "fantasy", "horse", "unicorn", "wings" ]
        }, {
            title: "fal fa-pegasus",
            searchTerms: [ "fantasy", "horse", "unicorn", "wings" ]
        }, {
            title: "fas fa-pen",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "far fa-pen",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fal fa-pen",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fas fa-pen-alt",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "far fa-pen-alt",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fal fa-pen-alt",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fas fa-pen-fancy",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "far fa-pen-fancy",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fal fa-pen-fancy",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fas fa-pen-nib",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "far fa-pen-nib",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fal fa-pen-nib",
            searchTerms: [ "design", "edit", "fountain pen", "update", "write" ]
        }, {
            title: "fas fa-pen-square",
            searchTerms: [ "edit", "pencil-square", "update", "write" ]
        }, {
            title: "far fa-pen-square",
            searchTerms: [ "edit", "pencil-square", "update", "write" ]
        }, {
            title: "fal fa-pen-square",
            searchTerms: [ "edit", "pencil-square", "update", "write" ]
        }, {
            title: "fas fa-pencil",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "far fa-pencil",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fal fa-pencil",
            searchTerms: [ "design", "edit", "update", "write" ]
        }, {
            title: "fas fa-pencil-alt",
            searchTerms: [ "design", "edit", "pencil", "update", "write" ]
        }, {
            title: "far fa-pencil-alt",
            searchTerms: [ "design", "edit", "pencil", "update", "write" ]
        }, {
            title: "fal fa-pencil-alt",
            searchTerms: [ "design", "edit", "pencil", "update", "write" ]
        }, {
            title: "fas fa-pencil-paintbrush",
            searchTerms: [ "art", "design", "paint", "pencil", "write" ]
        }, {
            title: "far fa-pencil-paintbrush",
            searchTerms: [ "art", "design", "paint", "pencil", "write" ]
        }, {
            title: "fal fa-pencil-paintbrush",
            searchTerms: [ "art", "design", "paint", "pencil", "write" ]
        }, {
            title: "fas fa-pencil-ruler",
            searchTerms: [ "design", "draft", "draw", "pencil" ]
        }, {
            title: "far fa-pencil-ruler",
            searchTerms: [ "design", "draft", "draw", "pencil" ]
        }, {
            title: "fal fa-pencil-ruler",
            searchTerms: [ "design", "draft", "draw", "pencil" ]
        }, {
            title: "fas fa-pennant",
            searchTerms: [ "banner", "flag", "sign", "sports", "win" ]
        }, {
            title: "far fa-pennant",
            searchTerms: [ "banner", "flag", "sign", "sports", "win" ]
        }, {
            title: "fal fa-pennant",
            searchTerms: [ "banner", "flag", "sign", "sports", "win" ]
        }, {
            title: "fab fa-penny-arcade",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "pax", "tabletop" ]
        }, {
            title: "fas fa-people-carry",
            searchTerms: [ "box", "carry", "fragile", "help", "movers", "package" ]
        }, {
            title: "far fa-people-carry",
            searchTerms: [ "box", "carry", "fragile", "help", "movers", "package" ]
        }, {
            title: "fal fa-people-carry",
            searchTerms: [ "box", "carry", "fragile", "help", "movers", "package" ]
        }, {
            title: "fas fa-pepper-hot",
            searchTerms: [ "buffalo wings", "capsicum", "chili", "chilli", "habanero", "jalapeno", "mexican", "spicy", "tabasco", "vegetable" ]
        }, {
            title: "far fa-pepper-hot",
            searchTerms: [ "buffalo wings", "capsicum", "chili", "chilli", "habanero", "jalapeno", "mexican", "spicy", "tabasco", "vegetable" ]
        }, {
            title: "fal fa-pepper-hot",
            searchTerms: [ "buffalo wings", "capsicum", "chili", "chilli", "habanero", "jalapeno", "mexican", "spicy", "tabasco", "vegetable" ]
        }, {
            title: "fas fa-percent",
            searchTerms: [ "discount", "fraction", "proportion", "rate", "ratio" ]
        }, {
            title: "far fa-percent",
            searchTerms: [ "discount", "fraction", "proportion", "rate", "ratio" ]
        }, {
            title: "fal fa-percent",
            searchTerms: [ "discount", "fraction", "proportion", "rate", "ratio" ]
        }, {
            title: "fas fa-percentage",
            searchTerms: [ "discount", "fraction", "proportion", "rate", "ratio" ]
        }, {
            title: "far fa-percentage",
            searchTerms: [ "discount", "fraction", "proportion", "rate", "ratio" ]
        }, {
            title: "fal fa-percentage",
            searchTerms: [ "discount", "fraction", "proportion", "rate", "ratio" ]
        }, {
            title: "fab fa-periscope",
            searchTerms: []
        }, {
            title: "fas fa-person-booth",
            searchTerms: [ "changing", "changing room", "election", "human", "person", "vote", "voting" ]
        }, {
            title: "far fa-person-booth",
            searchTerms: [ "changing", "changing room", "election", "human", "person", "vote", "voting" ]
        }, {
            title: "fal fa-person-booth",
            searchTerms: [ "changing", "changing room", "election", "human", "person", "vote", "voting" ]
        }, {
            title: "fas fa-person-carry",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "far fa-person-carry",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "fal fa-person-carry",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "fas fa-person-dolly",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "far fa-person-dolly",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "fal fa-person-dolly",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "fas fa-person-dolly-empty",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "far fa-person-dolly-empty",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "fal fa-person-dolly-empty",
            searchTerms: [ "human", "lift", "mover", "person", "transport" ]
        }, {
            title: "fas fa-person-sign",
            searchTerms: [ "advocate", "human", "information", "person", "protest", "protester", "volunteer" ]
        }, {
            title: "far fa-person-sign",
            searchTerms: [ "advocate", "human", "information", "person", "protest", "protester", "volunteer" ]
        }, {
            title: "fal fa-person-sign",
            searchTerms: [ "advocate", "human", "information", "person", "protest", "protester", "volunteer" ]
        }, {
            title: "fab fa-phabricator",
            searchTerms: []
        }, {
            title: "fab fa-phoenix-framework",
            searchTerms: []
        }, {
            title: "fab fa-phoenix-squadron",
            searchTerms: []
        }, {
            title: "fas fa-phone",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "far fa-phone",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fas fa-phone-alt",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "far fa-phone-alt",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone-alt",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fas fa-phone-laptop",
            searchTerms: [ "computer", "device", "mobile", "technology" ]
        }, {
            title: "far fa-phone-laptop",
            searchTerms: [ "computer", "device", "mobile", "technology" ]
        }, {
            title: "fal fa-phone-laptop",
            searchTerms: [ "computer", "device", "mobile", "technology" ]
        }, {
            title: "fas fa-phone-office",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "far fa-phone-office",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone-office",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fas fa-phone-plus",
            searchTerms: [ "add", "call", "earphone", "number", "positive", "support", "telephone", "voice" ]
        }, {
            title: "far fa-phone-plus",
            searchTerms: [ "add", "call", "earphone", "number", "positive", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone-plus",
            searchTerms: [ "add", "call", "earphone", "number", "positive", "support", "telephone", "voice" ]
        }, {
            title: "fas fa-phone-rotary",
            searchTerms: [ "call", "earphone", "number", "retro", "support", "telephone", "vintage", "voice" ]
        }, {
            title: "far fa-phone-rotary",
            searchTerms: [ "call", "earphone", "number", "retro", "support", "telephone", "vintage", "voice" ]
        }, {
            title: "fal fa-phone-rotary",
            searchTerms: [ "call", "earphone", "number", "retro", "support", "telephone", "vintage", "voice" ]
        }, {
            title: "fas fa-phone-slash",
            searchTerms: [ "call", "cancel", "earphone", "mute", "number", "support", "telephone", "voice" ]
        }, {
            title: "far fa-phone-slash",
            searchTerms: [ "call", "cancel", "earphone", "mute", "number", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone-slash",
            searchTerms: [ "call", "cancel", "earphone", "mute", "number", "support", "telephone", "voice" ]
        }, {
            title: "fas fa-phone-square",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "far fa-phone-square",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone-square",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fas fa-phone-square-alt",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "far fa-phone-square-alt",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fal fa-phone-square-alt",
            searchTerms: [ "call", "earphone", "number", "support", "telephone", "voice" ]
        }, {
            title: "fas fa-phone-volume",
            searchTerms: [ "call", "earphone", "number", "sound", "support", "telephone", "voice", "volume-control-phone" ]
        }, {
            title: "far fa-phone-volume",
            searchTerms: [ "call", "earphone", "number", "sound", "support", "telephone", "voice", "volume-control-phone" ]
        }, {
            title: "fal fa-phone-volume",
            searchTerms: [ "call", "earphone", "number", "sound", "support", "telephone", "voice", "volume-control-phone" ]
        }, {
            title: "fas fa-photo-video",
            searchTerms: [ "av", "film", "image", "library", "media" ]
        }, {
            title: "far fa-photo-video",
            searchTerms: [ "av", "film", "image", "library", "media" ]
        }, {
            title: "fal fa-photo-video",
            searchTerms: [ "av", "film", "image", "library", "media" ]
        }, {
            title: "fab fa-php",
            searchTerms: []
        }, {
            title: "fas fa-pi",
            searchTerms: [ "alphabet", "circumference", "diameter", "greek", "math", "mathematics" ]
        }, {
            title: "far fa-pi",
            searchTerms: [ "alphabet", "circumference", "diameter", "greek", "math", "mathematics" ]
        }, {
            title: "fal fa-pi",
            searchTerms: [ "alphabet", "circumference", "diameter", "greek", "math", "mathematics" ]
        }, {
            title: "fas fa-piano",
            searchTerms: [ "grand piano", "instrument", "keyboard", "keys", "midi", "music" ]
        }, {
            title: "far fa-piano",
            searchTerms: [ "grand piano", "instrument", "keyboard", "keys", "midi", "music" ]
        }, {
            title: "fal fa-piano",
            searchTerms: [ "grand piano", "instrument", "keyboard", "keys", "midi", "music" ]
        }, {
            title: "fas fa-piano-keyboard",
            searchTerms: [ "instrument", "keyboard", "keys", "midi", "music" ]
        }, {
            title: "far fa-piano-keyboard",
            searchTerms: [ "instrument", "keyboard", "keys", "midi", "music" ]
        }, {
            title: "fal fa-piano-keyboard",
            searchTerms: [ "instrument", "keyboard", "keys", "midi", "music" ]
        }, {
            title: "fas fa-pie",
            searchTerms: [ "apple", "bakery", "cake", "crust", "dessert", "pumpkin", "tart" ]
        }, {
            title: "far fa-pie",
            searchTerms: [ "apple", "bakery", "cake", "crust", "dessert", "pumpkin", "tart" ]
        }, {
            title: "fal fa-pie",
            searchTerms: [ "apple", "bakery", "cake", "crust", "dessert", "pumpkin", "tart" ]
        }, {
            title: "fab fa-pied-piper",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper-alt",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper-hat",
            searchTerms: [ "clothing" ]
        }, {
            title: "fab fa-pied-piper-pp",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper-square",
            searchTerms: []
        }, {
            title: "fas fa-pig",
            searchTerms: [ "agriculture", "animal", "farm", "fauna", "mammal", "oink" ]
        }, {
            title: "far fa-pig",
            searchTerms: [ "agriculture", "animal", "farm", "fauna", "mammal", "oink" ]
        }, {
            title: "fal fa-pig",
            searchTerms: [ "agriculture", "animal", "farm", "fauna", "mammal", "oink" ]
        }, {
            title: "fas fa-piggy-bank",
            searchTerms: [ "bank", "save", "savings" ]
        }, {
            title: "far fa-piggy-bank",
            searchTerms: [ "bank", "save", "savings" ]
        }, {
            title: "fal fa-piggy-bank",
            searchTerms: [ "bank", "save", "savings" ]
        }, {
            title: "fas fa-pills",
            searchTerms: [ "drugs", "medicine", "prescription", "tablets" ]
        }, {
            title: "far fa-pills",
            searchTerms: [ "drugs", "medicine", "prescription", "tablets" ]
        }, {
            title: "fal fa-pills",
            searchTerms: [ "drugs", "medicine", "prescription", "tablets" ]
        }, {
            title: "fab fa-pinterest",
            searchTerms: []
        }, {
            title: "fab fa-pinterest-p",
            searchTerms: []
        }, {
            title: "fab fa-pinterest-square",
            searchTerms: []
        }, {
            title: "fas fa-pizza",
            searchTerms: [ "cheese", "chicago", "italian", "mozzarella", "new york", "pepperoni", "pie", "slice", "teenage mutant ninja turtles", "tomato" ]
        }, {
            title: "far fa-pizza",
            searchTerms: [ "cheese", "chicago", "italian", "mozzarella", "new york", "pepperoni", "pie", "slice", "teenage mutant ninja turtles", "tomato" ]
        }, {
            title: "fal fa-pizza",
            searchTerms: [ "cheese", "chicago", "italian", "mozzarella", "new york", "pepperoni", "pie", "slice", "teenage mutant ninja turtles", "tomato" ]
        }, {
            title: "fas fa-pizza-slice",
            searchTerms: [ "cheese", "chicago", "italian", "mozzarella", "new york", "pepperoni", "pie", "slice", "teenage mutant ninja turtles", "tomato" ]
        }, {
            title: "far fa-pizza-slice",
            searchTerms: [ "cheese", "chicago", "italian", "mozzarella", "new york", "pepperoni", "pie", "slice", "teenage mutant ninja turtles", "tomato" ]
        }, {
            title: "fal fa-pizza-slice",
            searchTerms: [ "cheese", "chicago", "italian", "mozzarella", "new york", "pepperoni", "pie", "slice", "teenage mutant ninja turtles", "tomato" ]
        }, {
            title: "fas fa-place-of-worship",
            searchTerms: [ "building", "church", "holy", "mosque", "synagogue" ]
        }, {
            title: "far fa-place-of-worship",
            searchTerms: [ "building", "church", "holy", "mosque", "synagogue" ]
        }, {
            title: "fal fa-place-of-worship",
            searchTerms: [ "building", "church", "holy", "mosque", "synagogue" ]
        }, {
            title: "fas fa-plane",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "far fa-plane",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "fal fa-plane",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "fas fa-plane-alt",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "far fa-plane-alt",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "fal fa-plane-alt",
            searchTerms: [ "airplane", "destination", "fly", "location", "mode", "travel", "trip" ]
        }, {
            title: "fas fa-plane-arrival",
            searchTerms: [ "airplane", "arriving", "destination", "fly", "land", "landing", "location", "mode", "travel", "trip" ]
        }, {
            title: "far fa-plane-arrival",
            searchTerms: [ "airplane", "arriving", "destination", "fly", "land", "landing", "location", "mode", "travel", "trip" ]
        }, {
            title: "fal fa-plane-arrival",
            searchTerms: [ "airplane", "arriving", "destination", "fly", "land", "landing", "location", "mode", "travel", "trip" ]
        }, {
            title: "fas fa-plane-departure",
            searchTerms: [ "airplane", "departing", "destination", "fly", "location", "mode", "take off", "taking off", "travel", "trip" ]
        }, {
            title: "far fa-plane-departure",
            searchTerms: [ "airplane", "departing", "destination", "fly", "location", "mode", "take off", "taking off", "travel", "trip" ]
        }, {
            title: "fal fa-plane-departure",
            searchTerms: [ "airplane", "departing", "destination", "fly", "location", "mode", "take off", "taking off", "travel", "trip" ]
        }, {
            title: "fas fa-planet-moon",
            searchTerms: [ "earth", "natural satellite", "orbit", "solar system", "space", "universe" ]
        }, {
            title: "far fa-planet-moon",
            searchTerms: [ "earth", "natural satellite", "orbit", "solar system", "space", "universe" ]
        }, {
            title: "fal fa-planet-moon",
            searchTerms: [ "earth", "natural satellite", "orbit", "solar system", "space", "universe" ]
        }, {
            title: "fas fa-planet-ringed",
            searchTerms: [ "orbit", "saturn", "solar system", "space", "universe" ]
        }, {
            title: "far fa-planet-ringed",
            searchTerms: [ "orbit", "saturn", "solar system", "space", "universe" ]
        }, {
            title: "fal fa-planet-ringed",
            searchTerms: [ "orbit", "saturn", "solar system", "space", "universe" ]
        }, {
            title: "fas fa-play",
            searchTerms: [ "audio", "music", "playing", "sound", "start", "video" ]
        }, {
            title: "far fa-play",
            searchTerms: [ "audio", "music", "playing", "sound", "start", "video" ]
        }, {
            title: "fal fa-play",
            searchTerms: [ "audio", "music", "playing", "sound", "start", "video" ]
        }, {
            title: "fas fa-play-circle",
            searchTerms: [ "audio", "music", "playing", "sound", "start", "video" ]
        }, {
            title: "far fa-play-circle",
            searchTerms: [ "audio", "music", "playing", "sound", "start", "video" ]
        }, {
            title: "fal fa-play-circle",
            searchTerms: [ "audio", "music", "playing", "sound", "start", "video" ]
        }, {
            title: "fab fa-playstation",
            searchTerms: []
        }, {
            title: "fas fa-plug",
            searchTerms: [ "connect", "electric", "online", "power" ]
        }, {
            title: "far fa-plug",
            searchTerms: [ "connect", "electric", "online", "power" ]
        }, {
            title: "fal fa-plug",
            searchTerms: [ "connect", "electric", "online", "power" ]
        }, {
            title: "fas fa-plus",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "far fa-plus",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fal fa-plus",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fas fa-plus-circle",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "far fa-plus-circle",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fal fa-plus-circle",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fas fa-plus-hexagon",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "far fa-plus-hexagon",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fal fa-plus-hexagon",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fas fa-plus-octagon",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "far fa-plus-octagon",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fal fa-plus-octagon",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fas fa-plus-square",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "far fa-plus-square",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fal fa-plus-square",
            searchTerms: [ "add", "create", "expand", "new", "positive", "shape" ]
        }, {
            title: "fas fa-podcast",
            searchTerms: [ "audio", "broadcast", "music", "sound" ]
        }, {
            title: "far fa-podcast",
            searchTerms: [ "audio", "broadcast", "music", "sound" ]
        }, {
            title: "fal fa-podcast",
            searchTerms: [ "audio", "broadcast", "music", "sound" ]
        }, {
            title: "fas fa-podium",
            searchTerms: [ "debate", "election", "keynote", "lecture", "panel", "politics", "seminar", "speak", "speaker", "speech", "talk" ]
        }, {
            title: "far fa-podium",
            searchTerms: [ "debate", "election", "keynote", "lecture", "panel", "politics", "seminar", "speak", "speaker", "speech", "talk" ]
        }, {
            title: "fal fa-podium",
            searchTerms: [ "debate", "election", "keynote", "lecture", "panel", "politics", "seminar", "speak", "speaker", "speech", "talk" ]
        }, {
            title: "fas fa-podium-star",
            searchTerms: [ "debate", "election", "keynote", "lecture", "panel", "politics", "seminar", "speak", "speaker", "speech", "talk" ]
        }, {
            title: "far fa-podium-star",
            searchTerms: [ "debate", "election", "keynote", "lecture", "panel", "politics", "seminar", "speak", "speaker", "speech", "talk" ]
        }, {
            title: "fal fa-podium-star",
            searchTerms: [ "debate", "election", "keynote", "lecture", "panel", "politics", "seminar", "speak", "speaker", "speech", "talk" ]
        }, {
            title: "fas fa-police-box",
            searchTerms: [ "doctor who", "tardis", "time and relative dimension in space", "time machine" ]
        }, {
            title: "far fa-police-box",
            searchTerms: [ "doctor who", "tardis", "time and relative dimension in space", "time machine" ]
        }, {
            title: "fal fa-police-box",
            searchTerms: [ "doctor who", "tardis", "time and relative dimension in space", "time machine" ]
        }, {
            title: "fas fa-poll",
            searchTerms: [ "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "far fa-poll",
            searchTerms: [ "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "fal fa-poll",
            searchTerms: [ "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "fas fa-poll-h",
            searchTerms: [ "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "far fa-poll-h",
            searchTerms: [ "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "fal fa-poll-h",
            searchTerms: [ "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "fas fa-poll-people",
            searchTerms: [ "candidates", "election", "people", "person", "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "far fa-poll-people",
            searchTerms: [ "candidates", "election", "people", "person", "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "fal fa-poll-people",
            searchTerms: [ "candidates", "election", "people", "person", "results", "survey", "trend", "vote", "voting" ]
        }, {
            title: "fas fa-poo",
            searchTerms: [ "crap", "poop", "shit", "smile", "turd" ]
        }, {
            title: "far fa-poo",
            searchTerms: [ "crap", "poop", "shit", "smile", "turd" ]
        }, {
            title: "fal fa-poo",
            searchTerms: [ "crap", "poop", "shit", "smile", "turd" ]
        }, {
            title: "fas fa-poo-storm",
            searchTerms: [ "bolt", "cloud", "euphemism", "lightning", "mess", "poop", "shit", "turd" ]
        }, {
            title: "far fa-poo-storm",
            searchTerms: [ "bolt", "cloud", "euphemism", "lightning", "mess", "poop", "shit", "turd" ]
        }, {
            title: "fal fa-poo-storm",
            searchTerms: [ "bolt", "cloud", "euphemism", "lightning", "mess", "poop", "shit", "turd" ]
        }, {
            title: "fas fa-poop",
            searchTerms: [ "crap", "poop", "shit", "smile", "turd" ]
        }, {
            title: "far fa-poop",
            searchTerms: [ "crap", "poop", "shit", "smile", "turd" ]
        }, {
            title: "fal fa-poop",
            searchTerms: [ "crap", "poop", "shit", "smile", "turd" ]
        }, {
            title: "fas fa-popcorn",
            searchTerms: [ "bucket", "butter", "corn", "junk food", "kernels", "movie", "snack", "theater" ]
        }, {
            title: "far fa-popcorn",
            searchTerms: [ "bucket", "butter", "corn", "junk food", "kernels", "movie", "snack", "theater" ]
        }, {
            title: "fal fa-popcorn",
            searchTerms: [ "bucket", "butter", "corn", "junk food", "kernels", "movie", "snack", "theater" ]
        }, {
            title: "fas fa-portal-enter",
            searchTerms: [ "enter", "open", "teleport", "transporter", "travel" ]
        }, {
            title: "far fa-portal-enter",
            searchTerms: [ "enter", "open", "teleport", "transporter", "travel" ]
        }, {
            title: "fal fa-portal-enter",
            searchTerms: [ "enter", "open", "teleport", "transporter", "travel" ]
        }, {
            title: "fas fa-portal-exit",
            searchTerms: [ "close", "enter", "teleport", "transporter", "travel" ]
        }, {
            title: "far fa-portal-exit",
            searchTerms: [ "close", "enter", "teleport", "transporter", "travel" ]
        }, {
            title: "fal fa-portal-exit",
            searchTerms: [ "close", "enter", "teleport", "transporter", "travel" ]
        }, {
            title: "fas fa-portrait",
            searchTerms: [ "id", "image", "photo", "picture", "selfie" ]
        }, {
            title: "far fa-portrait",
            searchTerms: [ "id", "image", "photo", "picture", "selfie" ]
        }, {
            title: "fal fa-portrait",
            searchTerms: [ "id", "image", "photo", "picture", "selfie" ]
        }, {
            title: "fas fa-pound-sign",
            searchTerms: [ "currency", "gbp", "money" ]
        }, {
            title: "far fa-pound-sign",
            searchTerms: [ "currency", "gbp", "money" ]
        }, {
            title: "fal fa-pound-sign",
            searchTerms: [ "currency", "gbp", "money" ]
        }, {
            title: "fas fa-power-off",
            searchTerms: [ "cancel", "computer", "on", "reboot", "restart" ]
        }, {
            title: "far fa-power-off",
            searchTerms: [ "cancel", "computer", "on", "reboot", "restart" ]
        }, {
            title: "fal fa-power-off",
            searchTerms: [ "cancel", "computer", "on", "reboot", "restart" ]
        }, {
            title: "fas fa-pray",
            searchTerms: [ "kneel", "preach", "religion", "worship" ]
        }, {
            title: "far fa-pray",
            searchTerms: [ "kneel", "preach", "religion", "worship" ]
        }, {
            title: "fal fa-pray",
            searchTerms: [ "kneel", "preach", "religion", "worship" ]
        }, {
            title: "fas fa-praying-hands",
            searchTerms: [ "kneel", "preach", "religion", "worship" ]
        }, {
            title: "far fa-praying-hands",
            searchTerms: [ "kneel", "preach", "religion", "worship" ]
        }, {
            title: "fal fa-praying-hands",
            searchTerms: [ "kneel", "preach", "religion", "worship" ]
        }, {
            title: "fas fa-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "far fa-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "fal fa-prescription",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "fas fa-prescription-bottle",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "far fa-prescription-bottle",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "fal fa-prescription-bottle",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "fas fa-prescription-bottle-alt",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "far fa-prescription-bottle-alt",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "fal fa-prescription-bottle-alt",
            searchTerms: [ "drugs", "medical", "medicine", "pharmacy", "rx" ]
        }, {
            title: "fas fa-presentation",
            searchTerms: [ "keynote", "lecture", "panel", "powerpoint", "ppt", "seminar", "slides", "speak", "speaker", "talk" ]
        }, {
            title: "far fa-presentation",
            searchTerms: [ "keynote", "lecture", "panel", "powerpoint", "ppt", "seminar", "slides", "speak", "speaker", "talk" ]
        }, {
            title: "fal fa-presentation",
            searchTerms: [ "keynote", "lecture", "panel", "powerpoint", "ppt", "seminar", "slides", "speak", "speaker", "talk" ]
        }, {
            title: "fas fa-print",
            searchTerms: [ "business", "copy", "document", "office", "paper" ]
        }, {
            title: "far fa-print",
            searchTerms: [ "business", "copy", "document", "office", "paper" ]
        }, {
            title: "fal fa-print",
            searchTerms: [ "business", "copy", "document", "office", "paper" ]
        }, {
            title: "fas fa-print-search",
            searchTerms: [ "business", "copy", "document", "find", "office", "paper", "search" ]
        }, {
            title: "far fa-print-search",
            searchTerms: [ "business", "copy", "document", "find", "office", "paper", "search" ]
        }, {
            title: "fal fa-print-search",
            searchTerms: [ "business", "copy", "document", "find", "office", "paper", "search" ]
        }, {
            title: "fas fa-print-slash",
            searchTerms: [ "business", "copy", "document", "office", "offline", "paper" ]
        }, {
            title: "far fa-print-slash",
            searchTerms: [ "business", "copy", "document", "office", "offline", "paper" ]
        }, {
            title: "fal fa-print-slash",
            searchTerms: [ "business", "copy", "document", "office", "offline", "paper" ]
        }, {
            title: "fas fa-procedures",
            searchTerms: [ "EKG", "bed", "electrocardiogram", "health", "hospital", "life", "patient", "vital" ]
        }, {
            title: "far fa-procedures",
            searchTerms: [ "EKG", "bed", "electrocardiogram", "health", "hospital", "life", "patient", "vital" ]
        }, {
            title: "fal fa-procedures",
            searchTerms: [ "EKG", "bed", "electrocardiogram", "health", "hospital", "life", "patient", "vital" ]
        }, {
            title: "fab fa-product-hunt",
            searchTerms: []
        }, {
            title: "fas fa-project-diagram",
            searchTerms: [ "chart", "graph", "network", "pert" ]
        }, {
            title: "far fa-project-diagram",
            searchTerms: [ "chart", "graph", "network", "pert" ]
        }, {
            title: "fal fa-project-diagram",
            searchTerms: [ "chart", "graph", "network", "pert" ]
        }, {
            title: "fas fa-projector",
            searchTerms: [ "cinema", "keynote", "movie", "powerpoint", "presentation", "shadow puppets", "slides" ]
        }, {
            title: "far fa-projector",
            searchTerms: [ "cinema", "keynote", "movie", "powerpoint", "presentation", "shadow puppets", "slides" ]
        }, {
            title: "fal fa-projector",
            searchTerms: [ "cinema", "keynote", "movie", "powerpoint", "presentation", "shadow puppets", "slides" ]
        }, {
            title: "fas fa-pumpkin",
            searchTerms: [ "autumn", "gourd", "halloween", "harvest", "squash", "thanksgiving", "vegetable" ]
        }, {
            title: "far fa-pumpkin",
            searchTerms: [ "autumn", "gourd", "halloween", "harvest", "squash", "thanksgiving", "vegetable" ]
        }, {
            title: "fal fa-pumpkin",
            searchTerms: [ "autumn", "gourd", "halloween", "harvest", "squash", "thanksgiving", "vegetable" ]
        }, {
            title: "fab fa-pushed",
            searchTerms: []
        }, {
            title: "fas fa-puzzle-piece",
            searchTerms: [ "add-on", "addon", "game", "section" ]
        }, {
            title: "far fa-puzzle-piece",
            searchTerms: [ "add-on", "addon", "game", "section" ]
        }, {
            title: "fal fa-puzzle-piece",
            searchTerms: [ "add-on", "addon", "game", "section" ]
        }, {
            title: "fab fa-python",
            searchTerms: []
        }, {
            title: "fab fa-qq",
            searchTerms: []
        }, {
            title: "fas fa-qrcode",
            searchTerms: [ "barcode", "info", "information", "scan" ]
        }, {
            title: "far fa-qrcode",
            searchTerms: [ "barcode", "info", "information", "scan" ]
        }, {
            title: "fal fa-qrcode",
            searchTerms: [ "barcode", "info", "information", "scan" ]
        }, {
            title: "fas fa-question",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "far fa-question",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fal fa-question",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fas fa-question-circle",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "far fa-question-circle",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fal fa-question-circle",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fas fa-question-square",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "far fa-question-square",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fal fa-question-square",
            searchTerms: [ "help", "information", "support", "unknown" ]
        }, {
            title: "fas fa-quidditch",
            searchTerms: [ "ball", "bludger", "broom", "golden snitch", "harry potter", "hogwarts", "quaffle", "sport", "wizard" ]
        }, {
            title: "far fa-quidditch",
            searchTerms: [ "ball", "bludger", "broom", "golden snitch", "harry potter", "hogwarts", "quaffle", "sport", "wizard" ]
        }, {
            title: "fal fa-quidditch",
            searchTerms: [ "ball", "bludger", "broom", "golden snitch", "harry potter", "hogwarts", "quaffle", "sport", "wizard" ]
        }, {
            title: "fab fa-quinscape",
            searchTerms: []
        }, {
            title: "fab fa-quora",
            searchTerms: []
        }, {
            title: "fas fa-quote-left",
            searchTerms: [ "mention", "note", "phrase", "text", "type" ]
        }, {
            title: "far fa-quote-left",
            searchTerms: [ "mention", "note", "phrase", "text", "type" ]
        }, {
            title: "fal fa-quote-left",
            searchTerms: [ "mention", "note", "phrase", "text", "type" ]
        }, {
            title: "fas fa-quote-right",
            searchTerms: [ "mention", "note", "phrase", "text", "type" ]
        }, {
            title: "far fa-quote-right",
            searchTerms: [ "mention", "note", "phrase", "text", "type" ]
        }, {
            title: "fal fa-quote-right",
            searchTerms: [ "mention", "note", "phrase", "text", "type" ]
        }, {
            title: "fas fa-quran",
            searchTerms: [ "book", "islam", "muslim", "religion" ]
        }, {
            title: "far fa-quran",
            searchTerms: [ "book", "islam", "muslim", "religion" ]
        }, {
            title: "fal fa-quran",
            searchTerms: [ "book", "islam", "muslim", "religion" ]
        }, {
            title: "fab fa-r-project",
            searchTerms: []
        }, {
            title: "fas fa-rabbit",
            searchTerms: [ "animal", "bunny", "fast", "fauna", "hare", "mammal", "speed", "wabbit" ]
        }, {
            title: "far fa-rabbit",
            searchTerms: [ "animal", "bunny", "fast", "fauna", "hare", "mammal", "speed", "wabbit" ]
        }, {
            title: "fal fa-rabbit",
            searchTerms: [ "animal", "bunny", "fast", "fauna", "hare", "mammal", "speed", "wabbit" ]
        }, {
            title: "fas fa-rabbit-fast",
            searchTerms: [ "animal", "bunny", "fast", "fauna", "hare", "mammal", "running", "speed", "wabbit" ]
        }, {
            title: "far fa-rabbit-fast",
            searchTerms: [ "animal", "bunny", "fast", "fauna", "hare", "mammal", "running", "speed", "wabbit" ]
        }, {
            title: "fal fa-rabbit-fast",
            searchTerms: [ "animal", "bunny", "fast", "fauna", "hare", "mammal", "running", "speed", "wabbit" ]
        }, {
            title: "fas fa-racquet",
            searchTerms: [ "badminton", "racket", "squash", "tennis" ]
        }, {
            title: "far fa-racquet",
            searchTerms: [ "badminton", "racket", "squash", "tennis" ]
        }, {
            title: "fal fa-racquet",
            searchTerms: [ "badminton", "racket", "squash", "tennis" ]
        }, {
            title: "fas fa-radar",
            searchTerms: [ "blip", "find", "lidar", "radio", "scan", "search", "sonar", "space" ]
        }, {
            title: "far fa-radar",
            searchTerms: [ "blip", "find", "lidar", "radio", "scan", "search", "sonar", "space" ]
        }, {
            title: "fal fa-radar",
            searchTerms: [ "blip", "find", "lidar", "radio", "scan", "search", "sonar", "space" ]
        }, {
            title: "fas fa-radiation",
            searchTerms: [ "danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning" ]
        }, {
            title: "far fa-radiation",
            searchTerms: [ "danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning" ]
        }, {
            title: "fal fa-radiation",
            searchTerms: [ "danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning" ]
        }, {
            title: "fas fa-radiation-alt",
            searchTerms: [ "danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning" ]
        }, {
            title: "far fa-radiation-alt",
            searchTerms: [ "danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning" ]
        }, {
            title: "fal fa-radiation-alt",
            searchTerms: [ "danger", "dangerous", "deadly", "hazard", "nuclear", "radioactive", "warning" ]
        }, {
            title: "fas fa-radio",
            searchTerms: [ "am", "broadcast", "fm", "frequency", "music", "news", "receiver", "transmitter", "tuner" ]
        }, {
            title: "far fa-radio",
            searchTerms: [ "am", "broadcast", "fm", "frequency", "music", "news", "receiver", "transmitter", "tuner" ]
        }, {
            title: "fal fa-radio",
            searchTerms: [ "am", "broadcast", "fm", "frequency", "music", "news", "receiver", "transmitter", "tuner" ]
        }, {
            title: "fas fa-radio-alt",
            searchTerms: [ "am", "broadcast", "fm", "frequency", "music", "news", "receiver", "transmitter", "tuner" ]
        }, {
            title: "far fa-radio-alt",
            searchTerms: [ "am", "broadcast", "fm", "frequency", "music", "news", "receiver", "transmitter", "tuner" ]
        }, {
            title: "fal fa-radio-alt",
            searchTerms: [ "am", "broadcast", "fm", "frequency", "music", "news", "receiver", "transmitter", "tuner" ]
        }, {
            title: "fas fa-rainbow",
            searchTerms: [ "gold", "leprechaun", "prism", "rain", "sky" ]
        }, {
            title: "far fa-rainbow",
            searchTerms: [ "gold", "leprechaun", "prism", "rain", "sky" ]
        }, {
            title: "fal fa-rainbow",
            searchTerms: [ "gold", "leprechaun", "prism", "rain", "sky" ]
        }, {
            title: "fas fa-raindrops",
            searchTerms: [ "precipitation", "rain", "sprinkle", "storm" ]
        }, {
            title: "far fa-raindrops",
            searchTerms: [ "precipitation", "rain", "sprinkle", "storm" ]
        }, {
            title: "fal fa-raindrops",
            searchTerms: [ "precipitation", "rain", "sprinkle", "storm" ]
        }, {
            title: "fas fa-ram",
            searchTerms: [ "animal", "fauna", "horns", "mammal" ]
        }, {
            title: "far fa-ram",
            searchTerms: [ "animal", "fauna", "horns", "mammal" ]
        }, {
            title: "fal fa-ram",
            searchTerms: [ "animal", "fauna", "horns", "mammal" ]
        }, {
            title: "fas fa-ramp-loading",
            searchTerms: [ "inventory", "moving", "shipping", "storage", "warehouse" ]
        }, {
            title: "far fa-ramp-loading",
            searchTerms: [ "inventory", "moving", "shipping", "storage", "warehouse" ]
        }, {
            title: "fal fa-ramp-loading",
            searchTerms: [ "inventory", "moving", "shipping", "storage", "warehouse" ]
        }, {
            title: "fas fa-random",
            searchTerms: [ "arrows", "shuffle", "sort", "swap", "switch", "transfer" ]
        }, {
            title: "far fa-random",
            searchTerms: [ "arrows", "shuffle", "sort", "swap", "switch", "transfer" ]
        }, {
            title: "fal fa-random",
            searchTerms: [ "arrows", "shuffle", "sort", "swap", "switch", "transfer" ]
        }, {
            title: "fab fa-raspberry-pi",
            searchTerms: []
        }, {
            title: "fab fa-ravelry",
            searchTerms: []
        }, {
            title: "fas fa-raygun",
            searchTerms: [ "flash gordon", "laser", "pew pew", "phaser", "space", "stun" ]
        }, {
            title: "far fa-raygun",
            searchTerms: [ "flash gordon", "laser", "pew pew", "phaser", "space", "stun" ]
        }, {
            title: "fal fa-raygun",
            searchTerms: [ "flash gordon", "laser", "pew pew", "phaser", "space", "stun" ]
        }, {
            title: "fab fa-react",
            searchTerms: []
        }, {
            title: "fab fa-reacteurope",
            searchTerms: []
        }, {
            title: "fab fa-readme",
            searchTerms: []
        }, {
            title: "fab fa-rebel",
            searchTerms: []
        }, {
            title: "fas fa-receipt",
            searchTerms: [ "check", "invoice", "money", "pay", "table" ]
        }, {
            title: "far fa-receipt",
            searchTerms: [ "check", "invoice", "money", "pay", "table" ]
        }, {
            title: "fal fa-receipt",
            searchTerms: [ "check", "invoice", "money", "pay", "table" ]
        }, {
            title: "fas fa-record-vinyl",
            searchTerms: [ "LP", "album", "analog", "music", "phonograph", "sound" ]
        }, {
            title: "far fa-record-vinyl",
            searchTerms: [ "LP", "album", "analog", "music", "phonograph", "sound" ]
        }, {
            title: "fal fa-record-vinyl",
            searchTerms: [ "LP", "album", "analog", "music", "phonograph", "sound" ]
        }, {
            title: "fas fa-rectangle-landscape",
            searchTerms: [ "geometry", "shape" ]
        }, {
            title: "far fa-rectangle-landscape",
            searchTerms: [ "geometry", "shape" ]
        }, {
            title: "fal fa-rectangle-landscape",
            searchTerms: [ "geometry", "shape" ]
        }, {
            title: "fas fa-rectangle-portrait",
            searchTerms: [ "geometry", "shape" ]
        }, {
            title: "far fa-rectangle-portrait",
            searchTerms: [ "geometry", "shape" ]
        }, {
            title: "fal fa-rectangle-portrait",
            searchTerms: [ "geometry", "shape" ]
        }, {
            title: "fas fa-rectangle-wide",
            searchTerms: [ "geometry", "landscape", "shape" ]
        }, {
            title: "far fa-rectangle-wide",
            searchTerms: [ "geometry", "landscape", "shape" ]
        }, {
            title: "fal fa-rectangle-wide",
            searchTerms: [ "geometry", "landscape", "shape" ]
        }, {
            title: "fas fa-recycle",
            searchTerms: [ "Waste", "compost", "garbage", "reuse", "trash" ]
        }, {
            title: "far fa-recycle",
            searchTerms: [ "Waste", "compost", "garbage", "reuse", "trash" ]
        }, {
            title: "fal fa-recycle",
            searchTerms: [ "Waste", "compost", "garbage", "reuse", "trash" ]
        }, {
            title: "fab fa-red-river",
            searchTerms: []
        }, {
            title: "fab fa-reddit",
            searchTerms: []
        }, {
            title: "fab fa-reddit-alien",
            searchTerms: []
        }, {
            title: "fab fa-reddit-square",
            searchTerms: []
        }, {
            title: "fab fa-redhat",
            searchTerms: [ "linux", "operating system", "os" ]
        }, {
            title: "fas fa-redo",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "far fa-redo",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "fal fa-redo",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "fas fa-redo-alt",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "far fa-redo-alt",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "fal fa-redo-alt",
            searchTerms: [ "forward", "refresh", "reload", "repeat" ]
        }, {
            title: "fas fa-refrigerator",
            searchTerms: [ "cold", "cool", "freezer", "fridge", "icebox", "kitchen" ]
        }, {
            title: "far fa-refrigerator",
            searchTerms: [ "cold", "cool", "freezer", "fridge", "icebox", "kitchen" ]
        }, {
            title: "fal fa-refrigerator",
            searchTerms: [ "cold", "cool", "freezer", "fridge", "icebox", "kitchen" ]
        }, {
            title: "fas fa-registered",
            searchTerms: [ "copyright", "mark", "trademark" ]
        }, {
            title: "far fa-registered",
            searchTerms: [ "copyright", "mark", "trademark" ]
        }, {
            title: "fal fa-registered",
            searchTerms: [ "copyright", "mark", "trademark" ]
        }, {
            title: "fas fa-remove-format",
            searchTerms: [ "cancel", "font", "format", "remove", "style", "text" ]
        }, {
            title: "far fa-remove-format",
            searchTerms: [ "cancel", "font", "format", "remove", "style", "text" ]
        }, {
            title: "fal fa-remove-format",
            searchTerms: [ "cancel", "font", "format", "remove", "style", "text" ]
        }, {
            title: "fab fa-renren",
            searchTerms: []
        }, {
            title: "fas fa-repeat",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "far fa-repeat",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "fal fa-repeat",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "fas fa-repeat-1",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "far fa-repeat-1",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "fal fa-repeat-1",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "fas fa-repeat-1-alt",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "far fa-repeat-1-alt",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "fal fa-repeat-1-alt",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "fas fa-repeat-alt",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "far fa-repeat-alt",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "fal fa-repeat-alt",
            searchTerms: [ "flip", "reload", "rewind", "switch" ]
        }, {
            title: "fas fa-reply",
            searchTerms: [ "mail", "message", "respond" ]
        }, {
            title: "far fa-reply",
            searchTerms: [ "mail", "message", "respond" ]
        }, {
            title: "fal fa-reply",
            searchTerms: [ "mail", "message", "respond" ]
        }, {
            title: "fas fa-reply-all",
            searchTerms: [ "mail", "message", "respond" ]
        }, {
            title: "far fa-reply-all",
            searchTerms: [ "mail", "message", "respond" ]
        }, {
            title: "fal fa-reply-all",
            searchTerms: [ "mail", "message", "respond" ]
        }, {
            title: "fab fa-replyd",
            searchTerms: []
        }, {
            title: "fas fa-republican",
            searchTerms: [ "american", "conservative", "election", "elephant", "politics", "republican party", "right", "right-wing", "usa" ]
        }, {
            title: "far fa-republican",
            searchTerms: [ "american", "conservative", "election", "elephant", "politics", "republican party", "right", "right-wing", "usa" ]
        }, {
            title: "fal fa-republican",
            searchTerms: [ "american", "conservative", "election", "elephant", "politics", "republican party", "right", "right-wing", "usa" ]
        }, {
            title: "fab fa-researchgate",
            searchTerms: []
        }, {
            title: "fab fa-resolving",
            searchTerms: []
        }, {
            title: "fas fa-restroom",
            searchTerms: [ "bathroom", "john", "loo", "potty", "washroom", "waste", "wc" ]
        }, {
            title: "far fa-restroom",
            searchTerms: [ "bathroom", "john", "loo", "potty", "washroom", "waste", "wc" ]
        }, {
            title: "fal fa-restroom",
            searchTerms: [ "bathroom", "john", "loo", "potty", "washroom", "waste", "wc" ]
        }, {
            title: "fas fa-retweet",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "far fa-retweet",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fal fa-retweet",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fas fa-retweet-alt",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "far fa-retweet-alt",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fal fa-retweet-alt",
            searchTerms: [ "refresh", "reload", "share", "swap" ]
        }, {
            title: "fab fa-rev",
            searchTerms: []
        }, {
            title: "fas fa-ribbon",
            searchTerms: [ "badge", "cause", "lapel", "pin" ]
        }, {
            title: "far fa-ribbon",
            searchTerms: [ "badge", "cause", "lapel", "pin" ]
        }, {
            title: "fal fa-ribbon",
            searchTerms: [ "badge", "cause", "lapel", "pin" ]
        }, {
            title: "fas fa-ring",
            searchTerms: [ "Dungeons & Dragons", "Gollum", "band", "binding", "d&d", "dnd", "engagement", "fantasy", "gold", "jewelry", "marriage", "precious" ]
        }, {
            title: "far fa-ring",
            searchTerms: [ "Dungeons & Dragons", "Gollum", "band", "binding", "d&d", "dnd", "engagement", "fantasy", "gold", "jewelry", "marriage", "precious" ]
        }, {
            title: "fal fa-ring",
            searchTerms: [ "Dungeons & Dragons", "Gollum", "band", "binding", "d&d", "dnd", "engagement", "fantasy", "gold", "jewelry", "marriage", "precious" ]
        }, {
            title: "fas fa-rings-wedding",
            searchTerms: [ "diamond", "engagement", "gold", "marriage", "matrimony", "platinum", "proposal" ]
        }, {
            title: "far fa-rings-wedding",
            searchTerms: [ "diamond", "engagement", "gold", "marriage", "matrimony", "platinum", "proposal" ]
        }, {
            title: "fal fa-rings-wedding",
            searchTerms: [ "diamond", "engagement", "gold", "marriage", "matrimony", "platinum", "proposal" ]
        }, {
            title: "fas fa-road",
            searchTerms: [ "highway", "map", "pavement", "route", "street", "travel" ]
        }, {
            title: "far fa-road",
            searchTerms: [ "highway", "map", "pavement", "route", "street", "travel" ]
        }, {
            title: "fal fa-road",
            searchTerms: [ "highway", "map", "pavement", "route", "street", "travel" ]
        }, {
            title: "fas fa-robot",
            searchTerms: [ "android", "automate", "computer", "cyborg" ]
        }, {
            title: "far fa-robot",
            searchTerms: [ "android", "automate", "computer", "cyborg" ]
        }, {
            title: "fal fa-robot",
            searchTerms: [ "android", "automate", "computer", "cyborg" ]
        }, {
            title: "fas fa-rocket",
            searchTerms: [ "aircraft", "app", "jet", "launch", "nasa", "space" ]
        }, {
            title: "far fa-rocket",
            searchTerms: [ "aircraft", "app", "jet", "launch", "nasa", "space" ]
        }, {
            title: "fal fa-rocket",
            searchTerms: [ "aircraft", "app", "jet", "launch", "nasa", "space" ]
        }, {
            title: "fas fa-rocket-launch",
            searchTerms: [ "aircraft", "app", "ignition", "jet", "launch", "nasa", "space", "thrusters" ]
        }, {
            title: "far fa-rocket-launch",
            searchTerms: [ "aircraft", "app", "ignition", "jet", "launch", "nasa", "space", "thrusters" ]
        }, {
            title: "fal fa-rocket-launch",
            searchTerms: [ "aircraft", "app", "ignition", "jet", "launch", "nasa", "space", "thrusters" ]
        }, {
            title: "fab fa-rocketchat",
            searchTerms: []
        }, {
            title: "fab fa-rockrms",
            searchTerms: []
        }, {
            title: "fas fa-route",
            searchTerms: [ "directions", "navigation", "travel" ]
        }, {
            title: "far fa-route",
            searchTerms: [ "directions", "navigation", "travel" ]
        }, {
            title: "fal fa-route",
            searchTerms: [ "directions", "navigation", "travel" ]
        }, {
            title: "fas fa-route-highway",
            searchTerms: [ "directions", "highway", "interstate", "navigation", "sign", "travel" ]
        }, {
            title: "far fa-route-highway",
            searchTerms: [ "directions", "highway", "interstate", "navigation", "sign", "travel" ]
        }, {
            title: "fal fa-route-highway",
            searchTerms: [ "directions", "highway", "interstate", "navigation", "sign", "travel" ]
        }, {
            title: "fas fa-route-interstate",
            searchTerms: [ "directions", "highway", "interstate", "navigation", "sign", "travel" ]
        }, {
            title: "far fa-route-interstate",
            searchTerms: [ "directions", "highway", "interstate", "navigation", "sign", "travel" ]
        }, {
            title: "fal fa-route-interstate",
            searchTerms: [ "directions", "highway", "interstate", "navigation", "sign", "travel" ]
        }, {
            title: "fas fa-router",
            searchTerms: [ "bandwidth", "connection", "dsl", "ethernet", "internet", "modem", "switch", "wifi", "wireless" ]
        }, {
            title: "far fa-router",
            searchTerms: [ "bandwidth", "connection", "dsl", "ethernet", "internet", "modem", "switch", "wifi", "wireless" ]
        }, {
            title: "fal fa-router",
            searchTerms: [ "bandwidth", "connection", "dsl", "ethernet", "internet", "modem", "switch", "wifi", "wireless" ]
        }, {
            title: "fas fa-rss",
            searchTerms: [ "blog", "feed", "journal", "news", "writing" ]
        }, {
            title: "far fa-rss",
            searchTerms: [ "blog", "feed", "journal", "news", "writing" ]
        }, {
            title: "fal fa-rss",
            searchTerms: [ "blog", "feed", "journal", "news", "writing" ]
        }, {
            title: "fas fa-rss-square",
            searchTerms: [ "blog", "feed", "journal", "news", "writing" ]
        }, {
            title: "far fa-rss-square",
            searchTerms: [ "blog", "feed", "journal", "news", "writing" ]
        }, {
            title: "fal fa-rss-square",
            searchTerms: [ "blog", "feed", "journal", "news", "writing" ]
        }, {
            title: "fas fa-ruble-sign",
            searchTerms: [ "currency", "money", "rub" ]
        }, {
            title: "far fa-ruble-sign",
            searchTerms: [ "currency", "money", "rub" ]
        }, {
            title: "fal fa-ruble-sign",
            searchTerms: [ "currency", "money", "rub" ]
        }, {
            title: "fas fa-ruler",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "far fa-ruler",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fal fa-ruler",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fas fa-ruler-combined",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "far fa-ruler-combined",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fal fa-ruler-combined",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fas fa-ruler-horizontal",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "far fa-ruler-horizontal",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fal fa-ruler-horizontal",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fas fa-ruler-triangle",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "far fa-ruler-triangle",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fal fa-ruler-triangle",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fas fa-ruler-vertical",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "far fa-ruler-vertical",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fal fa-ruler-vertical",
            searchTerms: [ "design", "draft", "length", "measure", "planning" ]
        }, {
            title: "fas fa-running",
            searchTerms: [ "exercise", "health", "jog", "person", "run", "sport", "sprint" ]
        }, {
            title: "far fa-running",
            searchTerms: [ "exercise", "health", "jog", "person", "run", "sport", "sprint" ]
        }, {
            title: "fal fa-running",
            searchTerms: [ "exercise", "health", "jog", "person", "run", "sport", "sprint" ]
        }, {
            title: "fas fa-rupee-sign",
            searchTerms: [ "currency", "indian", "inr", "money" ]
        }, {
            title: "far fa-rupee-sign",
            searchTerms: [ "currency", "indian", "inr", "money" ]
        }, {
            title: "fal fa-rupee-sign",
            searchTerms: [ "currency", "indian", "inr", "money" ]
        }, {
            title: "fas fa-rv",
            searchTerms: [ "camping", "cousin eddie", "recreational", "travel", "vehicle" ]
        }, {
            title: "far fa-rv",
            searchTerms: [ "camping", "cousin eddie", "recreational", "travel", "vehicle" ]
        }, {
            title: "fal fa-rv",
            searchTerms: [ "camping", "cousin eddie", "recreational", "travel", "vehicle" ]
        }, {
            title: "fas fa-sack",
            searchTerms: [ "bag", "burlap", "money", "santa" ]
        }, {
            title: "far fa-sack",
            searchTerms: [ "bag", "burlap", "money", "santa" ]
        }, {
            title: "fal fa-sack",
            searchTerms: [ "bag", "burlap", "money", "santa" ]
        }, {
            title: "fas fa-sack-dollar",
            searchTerms: [ "bag", "burlap", "cash", "dollar", "money", "robber", "santa", "usd" ]
        }, {
            title: "far fa-sack-dollar",
            searchTerms: [ "bag", "burlap", "cash", "dollar", "money", "robber", "santa", "usd" ]
        }, {
            title: "fal fa-sack-dollar",
            searchTerms: [ "bag", "burlap", "cash", "dollar", "money", "robber", "santa", "usd" ]
        }, {
            title: "fas fa-sad-cry",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "far fa-sad-cry",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fal fa-sad-cry",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fas fa-sad-tear",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "far fa-sad-tear",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fal fa-sad-tear",
            searchTerms: [ "emoticon", "face", "tear", "tears" ]
        }, {
            title: "fab fa-safari",
            searchTerms: [ "browser" ]
        }, {
            title: "fas fa-salad",
            searchTerms: [ "bowl", "health", "lettuce", "spinach", "vegan", "vegetable", "vegetarian" ]
        }, {
            title: "far fa-salad",
            searchTerms: [ "bowl", "health", "lettuce", "spinach", "vegan", "vegetable", "vegetarian" ]
        }, {
            title: "fal fa-salad",
            searchTerms: [ "bowl", "health", "lettuce", "spinach", "vegan", "vegetable", "vegetarian" ]
        }, {
            title: "fab fa-salesforce",
            searchTerms: []
        }, {
            title: "fas fa-sandwich",
            searchTerms: [ "bread", "deli", "grilled cheese", "toast" ]
        }, {
            title: "far fa-sandwich",
            searchTerms: [ "bread", "deli", "grilled cheese", "toast" ]
        }, {
            title: "fal fa-sandwich",
            searchTerms: [ "bread", "deli", "grilled cheese", "toast" ]
        }, {
            title: "fab fa-sass",
            searchTerms: []
        }, {
            title: "fas fa-satellite",
            searchTerms: [ "communications", "hardware", "orbit", "space" ]
        }, {
            title: "far fa-satellite",
            searchTerms: [ "communications", "hardware", "orbit", "space" ]
        }, {
            title: "fal fa-satellite",
            searchTerms: [ "communications", "hardware", "orbit", "space" ]
        }, {
            title: "fas fa-satellite-dish",
            searchTerms: [ "SETI", "communications", "hardware", "receiver", "saucer", "signal", "space" ]
        }, {
            title: "far fa-satellite-dish",
            searchTerms: [ "SETI", "communications", "hardware", "receiver", "saucer", "signal", "space" ]
        }, {
            title: "fal fa-satellite-dish",
            searchTerms: [ "SETI", "communications", "hardware", "receiver", "saucer", "signal", "space" ]
        }, {
            title: "fas fa-sausage",
            searchTerms: [ "bratwurst", "breakfast", "chorizo", "frankfurt", "frankfurter", "hot dog", "hotdog", "kielbasa", "kosher", "pepperoni", "polish", "vienna", "weiner" ]
        }, {
            title: "far fa-sausage",
            searchTerms: [ "bratwurst", "breakfast", "chorizo", "frankfurt", "frankfurter", "hot dog", "hotdog", "kielbasa", "kosher", "pepperoni", "polish", "vienna", "weiner" ]
        }, {
            title: "fal fa-sausage",
            searchTerms: [ "bratwurst", "breakfast", "chorizo", "frankfurt", "frankfurter", "hot dog", "hotdog", "kielbasa", "kosher", "pepperoni", "polish", "vienna", "weiner" ]
        }, {
            title: "fas fa-save",
            searchTerms: [ "disk", "download", "floppy", "floppy-o" ]
        }, {
            title: "far fa-save",
            searchTerms: [ "disk", "download", "floppy", "floppy-o" ]
        }, {
            title: "fal fa-save",
            searchTerms: [ "disk", "download", "floppy", "floppy-o" ]
        }, {
            title: "fas fa-sax-hot",
            searchTerms: [ "brass", "fire", "flame", "instrument", "jazz", "music", "saxophone", "woodwind" ]
        }, {
            title: "far fa-sax-hot",
            searchTerms: [ "brass", "fire", "flame", "instrument", "jazz", "music", "saxophone", "woodwind" ]
        }, {
            title: "fal fa-sax-hot",
            searchTerms: [ "brass", "fire", "flame", "instrument", "jazz", "music", "saxophone", "woodwind" ]
        }, {
            title: "fas fa-saxophone",
            searchTerms: [ "brass", "instrument", "jazz", "music", "woodwind" ]
        }, {
            title: "far fa-saxophone",
            searchTerms: [ "brass", "instrument", "jazz", "music", "woodwind" ]
        }, {
            title: "fal fa-saxophone",
            searchTerms: [ "brass", "instrument", "jazz", "music", "woodwind" ]
        }, {
            title: "fas fa-scalpel",
            searchTerms: [ "blade", "cut", "doctor", "knife", "surgeon", "surgery" ]
        }, {
            title: "far fa-scalpel",
            searchTerms: [ "blade", "cut", "doctor", "knife", "surgeon", "surgery" ]
        }, {
            title: "fal fa-scalpel",
            searchTerms: [ "blade", "cut", "doctor", "knife", "surgeon", "surgery" ]
        }, {
            title: "fas fa-scalpel-path",
            searchTerms: [ "blade", "cut", "doctor", "knife", "surgeon", "surgery" ]
        }, {
            title: "far fa-scalpel-path",
            searchTerms: [ "blade", "cut", "doctor", "knife", "surgeon", "surgery" ]
        }, {
            title: "fal fa-scalpel-path",
            searchTerms: [ "blade", "cut", "doctor", "knife", "surgeon", "surgery" ]
        }, {
            title: "fas fa-scanner",
            searchTerms: [ "barcode", "checkout", "gun", "inventory", "price", "upc", "warehouse" ]
        }, {
            title: "far fa-scanner",
            searchTerms: [ "barcode", "checkout", "gun", "inventory", "price", "upc", "warehouse" ]
        }, {
            title: "fal fa-scanner",
            searchTerms: [ "barcode", "checkout", "gun", "inventory", "price", "upc", "warehouse" ]
        }, {
            title: "fas fa-scanner-image",
            searchTerms: [ "copy", "device", "digitize", "image", "import" ]
        }, {
            title: "far fa-scanner-image",
            searchTerms: [ "copy", "device", "digitize", "image", "import" ]
        }, {
            title: "fal fa-scanner-image",
            searchTerms: [ "copy", "device", "digitize", "image", "import" ]
        }, {
            title: "fas fa-scanner-keyboard",
            searchTerms: [ "barcode", "checkout", "gun", "inventory", "price", "upc", "warehouse" ]
        }, {
            title: "far fa-scanner-keyboard",
            searchTerms: [ "barcode", "checkout", "gun", "inventory", "price", "upc", "warehouse" ]
        }, {
            title: "fal fa-scanner-keyboard",
            searchTerms: [ "barcode", "checkout", "gun", "inventory", "price", "upc", "warehouse" ]
        }, {
            title: "fas fa-scanner-touchscreen",
            searchTerms: [ "barcode", "checkout", "gun", "inventory", "price", "upc", "warehouse" ]
        }, {
            title: "far fa-scanner-touchscreen",
            searchTerms: [ "barcode", "checkout", "gun", "inventory", "price", "upc", "warehouse" ]
        }, {
            title: "fal fa-scanner-touchscreen",
            searchTerms: [ "barcode", "checkout", "gun", "inventory", "price", "upc", "warehouse" ]
        }, {
            title: "fas fa-scarecrow",
            searchTerms: [ "bird", "crow", "farm", "field", "halloween", "strawman" ]
        }, {
            title: "far fa-scarecrow",
            searchTerms: [ "bird", "crow", "farm", "field", "halloween", "strawman" ]
        }, {
            title: "fal fa-scarecrow",
            searchTerms: [ "bird", "crow", "farm", "field", "halloween", "strawman" ]
        }, {
            title: "fas fa-scarf",
            searchTerms: [ "clothing", "knitted", "neck", "seasonal", "warmth" ]
        }, {
            title: "far fa-scarf",
            searchTerms: [ "clothing", "knitted", "neck", "seasonal", "warmth" ]
        }, {
            title: "fal fa-scarf",
            searchTerms: [ "clothing", "knitted", "neck", "seasonal", "warmth" ]
        }, {
            title: "fab fa-schlix",
            searchTerms: []
        }, {
            title: "fas fa-school",
            searchTerms: [ "building", "education", "learn", "student", "teacher" ]
        }, {
            title: "far fa-school",
            searchTerms: [ "building", "education", "learn", "student", "teacher" ]
        }, {
            title: "fal fa-school",
            searchTerms: [ "building", "education", "learn", "student", "teacher" ]
        }, {
            title: "fas fa-screwdriver",
            searchTerms: [ "admin", "fix", "mechanic", "repair", "settings", "tool" ]
        }, {
            title: "far fa-screwdriver",
            searchTerms: [ "admin", "fix", "mechanic", "repair", "settings", "tool" ]
        }, {
            title: "fal fa-screwdriver",
            searchTerms: [ "admin", "fix", "mechanic", "repair", "settings", "tool" ]
        }, {
            title: "fab fa-scribd",
            searchTerms: []
        }, {
            title: "fas fa-scroll",
            searchTerms: [ "Dungeons & Dragons", "announcement", "d&d", "dnd", "fantasy", "paper", "script" ]
        }, {
            title: "far fa-scroll",
            searchTerms: [ "Dungeons & Dragons", "announcement", "d&d", "dnd", "fantasy", "paper", "script" ]
        }, {
            title: "fal fa-scroll",
            searchTerms: [ "Dungeons & Dragons", "announcement", "d&d", "dnd", "fantasy", "paper", "script" ]
        }, {
            title: "fas fa-scroll-old",
            searchTerms: [ "Dungeons & Dragons", "ancient", "announcement", "d&d", "dnd", "fantasy", "paper", "relic", "script", "worn" ]
        }, {
            title: "far fa-scroll-old",
            searchTerms: [ "Dungeons & Dragons", "ancient", "announcement", "d&d", "dnd", "fantasy", "paper", "relic", "script", "worn" ]
        }, {
            title: "fal fa-scroll-old",
            searchTerms: [ "Dungeons & Dragons", "ancient", "announcement", "d&d", "dnd", "fantasy", "paper", "relic", "script", "worn" ]
        }, {
            title: "fas fa-scrubber",
            searchTerms: [ "circle", "dot", "toggle" ]
        }, {
            title: "far fa-scrubber",
            searchTerms: [ "circle", "dot", "toggle" ]
        }, {
            title: "fal fa-scrubber",
            searchTerms: [ "circle", "dot", "toggle" ]
        }, {
            title: "fas fa-scythe",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "death", "dnd", "fantasy", "grim reaper", "weapon" ]
        }, {
            title: "far fa-scythe",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "death", "dnd", "fantasy", "grim reaper", "weapon" ]
        }, {
            title: "fal fa-scythe",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "death", "dnd", "fantasy", "grim reaper", "weapon" ]
        }, {
            title: "fas fa-sd-card",
            searchTerms: [ "image", "memory", "photo", "save" ]
        }, {
            title: "far fa-sd-card",
            searchTerms: [ "image", "memory", "photo", "save" ]
        }, {
            title: "fal fa-sd-card",
            searchTerms: [ "image", "memory", "photo", "save" ]
        }, {
            title: "fas fa-search",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "preview", "zoom" ]
        }, {
            title: "far fa-search",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "preview", "zoom" ]
        }, {
            title: "fal fa-search",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "preview", "zoom" ]
        }, {
            title: "fas fa-search-dollar",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "money", "preview", "zoom" ]
        }, {
            title: "far fa-search-dollar",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "money", "preview", "zoom" ]
        }, {
            title: "fal fa-search-dollar",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "money", "preview", "zoom" ]
        }, {
            title: "fas fa-search-location",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "preview", "zoom" ]
        }, {
            title: "far fa-search-location",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "preview", "zoom" ]
        }, {
            title: "fal fa-search-location",
            searchTerms: [ "bigger", "enlarge", "find", "magnify", "preview", "zoom" ]
        }, {
            title: "fas fa-search-minus",
            searchTerms: [ "minify", "negative", "smaller", "zoom", "zoom out" ]
        }, {
            title: "far fa-search-minus",
            searchTerms: [ "minify", "negative", "smaller", "zoom", "zoom out" ]
        }, {
            title: "fal fa-search-minus",
            searchTerms: [ "minify", "negative", "smaller", "zoom", "zoom out" ]
        }, {
            title: "fas fa-search-plus",
            searchTerms: [ "bigger", "enlarge", "magnify", "positive", "zoom", "zoom in" ]
        }, {
            title: "far fa-search-plus",
            searchTerms: [ "bigger", "enlarge", "magnify", "positive", "zoom", "zoom in" ]
        }, {
            title: "fal fa-search-plus",
            searchTerms: [ "bigger", "enlarge", "magnify", "positive", "zoom", "zoom in" ]
        }, {
            title: "fab fa-searchengin",
            searchTerms: []
        }, {
            title: "fas fa-seedling",
            searchTerms: [ "flora", "grow", "plant", "vegan" ]
        }, {
            title: "far fa-seedling",
            searchTerms: [ "flora", "grow", "plant", "vegan" ]
        }, {
            title: "fal fa-seedling",
            searchTerms: [ "flora", "grow", "plant", "vegan" ]
        }, {
            title: "fab fa-sellcast",
            searchTerms: [ "eercast" ]
        }, {
            title: "fab fa-sellsy",
            searchTerms: []
        }, {
            title: "fas fa-send-back",
            searchTerms: [ "arrange", "backward", "layer", "order", "stack" ]
        }, {
            title: "far fa-send-back",
            searchTerms: [ "arrange", "backward", "layer", "order", "stack" ]
        }, {
            title: "fal fa-send-back",
            searchTerms: [ "arrange", "backward", "layer", "order", "stack" ]
        }, {
            title: "fas fa-send-backward",
            searchTerms: [ "arrange", "back", "layer", "order", "stack" ]
        }, {
            title: "far fa-send-backward",
            searchTerms: [ "arrange", "back", "layer", "order", "stack" ]
        }, {
            title: "fal fa-send-backward",
            searchTerms: [ "arrange", "back", "layer", "order", "stack" ]
        }, {
            title: "fas fa-sensor",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "far fa-sensor",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "fal fa-sensor",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "fas fa-sensor-alert",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "far fa-sensor-alert",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "fal fa-sensor-alert",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "fas fa-sensor-fire",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "far fa-sensor-fire",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "fal fa-sensor-fire",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "fas fa-sensor-on",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "far fa-sensor-on",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "fal fa-sensor-on",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "fas fa-sensor-smoke",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "far fa-sensor-smoke",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "fal fa-sensor-smoke",
            searchTerms: [ "alarm", "alert", "carbon monoxide", "detector", "fire", "smoke" ]
        }, {
            title: "fas fa-server",
            searchTerms: [ "computer", "cpu", "database", "hardware", "network" ]
        }, {
            title: "far fa-server",
            searchTerms: [ "computer", "cpu", "database", "hardware", "network" ]
        }, {
            title: "fal fa-server",
            searchTerms: [ "computer", "cpu", "database", "hardware", "network" ]
        }, {
            title: "fab fa-servicestack",
            searchTerms: []
        }, {
            title: "fas fa-shapes",
            searchTerms: [ "blocks", "build", "circle", "square", "triangle" ]
        }, {
            title: "far fa-shapes",
            searchTerms: [ "blocks", "build", "circle", "square", "triangle" ]
        }, {
            title: "fal fa-shapes",
            searchTerms: [ "blocks", "build", "circle", "square", "triangle" ]
        }, {
            title: "fas fa-share",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "far fa-share",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fal fa-share",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fas fa-share-all",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "far fa-share-all",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fal fa-share-all",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fas fa-share-alt",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "far fa-share-alt",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fal fa-share-alt",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fas fa-share-alt-square",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "far fa-share-alt-square",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fal fa-share-alt-square",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fas fa-share-square",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "far fa-share-square",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fal fa-share-square",
            searchTerms: [ "forward", "save", "send", "social" ]
        }, {
            title: "fas fa-sheep",
            searchTerms: [ "agriculture", "animal", "farming", "fauna", "mammal", "wool", "yarn" ]
        }, {
            title: "far fa-sheep",
            searchTerms: [ "agriculture", "animal", "farming", "fauna", "mammal", "wool", "yarn" ]
        }, {
            title: "fal fa-sheep",
            searchTerms: [ "agriculture", "animal", "farming", "fauna", "mammal", "wool", "yarn" ]
        }, {
            title: "fas fa-shekel-sign",
            searchTerms: [ "currency", "ils", "money" ]
        }, {
            title: "far fa-shekel-sign",
            searchTerms: [ "currency", "ils", "money" ]
        }, {
            title: "fal fa-shekel-sign",
            searchTerms: [ "currency", "ils", "money" ]
        }, {
            title: "fas fa-shield",
            searchTerms: [ "achievement", "armor", "award", "block", "cleric", "defend", "defense", "holy", "paladin", "security", "winner" ]
        }, {
            title: "far fa-shield",
            searchTerms: [ "achievement", "armor", "award", "block", "cleric", "defend", "defense", "holy", "paladin", "security", "winner" ]
        }, {
            title: "fal fa-shield",
            searchTerms: [ "achievement", "armor", "award", "block", "cleric", "defend", "defense", "holy", "paladin", "security", "winner" ]
        }, {
            title: "fas fa-shield-alt",
            searchTerms: [ "achievement", "award", "block", "defend", "security", "winner" ]
        }, {
            title: "far fa-shield-alt",
            searchTerms: [ "achievement", "award", "block", "defend", "security", "winner" ]
        }, {
            title: "fal fa-shield-alt",
            searchTerms: [ "achievement", "award", "block", "defend", "security", "winner" ]
        }, {
            title: "fas fa-shield-check",
            searchTerms: [ "achievement", "award", "block", "defend", "security", "select", "success", "tick", "todo", "winner" ]
        }, {
            title: "far fa-shield-check",
            searchTerms: [ "achievement", "award", "block", "defend", "security", "select", "success", "tick", "todo", "winner" ]
        }, {
            title: "fal fa-shield-check",
            searchTerms: [ "achievement", "award", "block", "defend", "security", "select", "success", "tick", "todo", "winner" ]
        }, {
            title: "fas fa-shield-cross",
            searchTerms: [ "Dungeons & Dragons", "block", "crusader", "d&d", "defend", "dnd", "fantasy", "security", "templar" ]
        }, {
            title: "far fa-shield-cross",
            searchTerms: [ "Dungeons & Dragons", "block", "crusader", "d&d", "defend", "dnd", "fantasy", "security", "templar" ]
        }, {
            title: "fal fa-shield-cross",
            searchTerms: [ "Dungeons & Dragons", "block", "crusader", "d&d", "defend", "dnd", "fantasy", "security", "templar" ]
        }, {
            title: "fas fa-ship",
            searchTerms: [ "boat", "sea", "water" ]
        }, {
            title: "far fa-ship",
            searchTerms: [ "boat", "sea", "water" ]
        }, {
            title: "fal fa-ship",
            searchTerms: [ "boat", "sea", "water" ]
        }, {
            title: "fas fa-shipping-fast",
            searchTerms: [ "express", "fedex", "mail", "overnight", "package", "ups" ]
        }, {
            title: "far fa-shipping-fast",
            searchTerms: [ "express", "fedex", "mail", "overnight", "package", "ups" ]
        }, {
            title: "fal fa-shipping-fast",
            searchTerms: [ "express", "fedex", "mail", "overnight", "package", "ups" ]
        }, {
            title: "fas fa-shipping-timed",
            searchTerms: [ "express", "fedex", "mail", "overnight", "package", "ups" ]
        }, {
            title: "far fa-shipping-timed",
            searchTerms: [ "express", "fedex", "mail", "overnight", "package", "ups" ]
        }, {
            title: "fal fa-shipping-timed",
            searchTerms: [ "express", "fedex", "mail", "overnight", "package", "ups" ]
        }, {
            title: "fab fa-shirtsinbulk",
            searchTerms: []
        }, {
            title: "fas fa-shish-kebab",
            searchTerms: [ "grill", "kabob", "kebob", "meat", "shawarma", "skewer", "souvlaki" ]
        }, {
            title: "far fa-shish-kebab",
            searchTerms: [ "grill", "kabob", "kebob", "meat", "shawarma", "skewer", "souvlaki" ]
        }, {
            title: "fal fa-shish-kebab",
            searchTerms: [ "grill", "kabob", "kebob", "meat", "shawarma", "skewer", "souvlaki" ]
        }, {
            title: "fas fa-shoe-prints",
            searchTerms: [ "feet", "footprints", "steps", "walk" ]
        }, {
            title: "far fa-shoe-prints",
            searchTerms: [ "feet", "footprints", "steps", "walk" ]
        }, {
            title: "fal fa-shoe-prints",
            searchTerms: [ "feet", "footprints", "steps", "walk" ]
        }, {
            title: "fas fa-shopping-bag",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "far fa-shopping-bag",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "fal fa-shopping-bag",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "fas fa-shopping-basket",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "far fa-shopping-basket",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "fal fa-shopping-basket",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "fas fa-shopping-cart",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "far fa-shopping-cart",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "fal fa-shopping-cart",
            searchTerms: [ "buy", "checkout", "grocery", "payment", "purchase" ]
        }, {
            title: "fab fa-shopware",
            searchTerms: []
        }, {
            title: "fas fa-shovel",
            searchTerms: [ "construction", "dig", "excavate", "tool", "trench" ]
        }, {
            title: "far fa-shovel",
            searchTerms: [ "construction", "dig", "excavate", "tool", "trench" ]
        }, {
            title: "fal fa-shovel",
            searchTerms: [ "construction", "dig", "excavate", "tool", "trench" ]
        }, {
            title: "fas fa-shovel-snow",
            searchTerms: [ "construction", "dig", "excavate", "plow", "tool", "trench" ]
        }, {
            title: "far fa-shovel-snow",
            searchTerms: [ "construction", "dig", "excavate", "plow", "tool", "trench" ]
        }, {
            title: "fal fa-shovel-snow",
            searchTerms: [ "construction", "dig", "excavate", "plow", "tool", "trench" ]
        }, {
            title: "fas fa-shower",
            searchTerms: [ "bath", "clean", "faucet", "water" ]
        }, {
            title: "far fa-shower",
            searchTerms: [ "bath", "clean", "faucet", "water" ]
        }, {
            title: "fal fa-shower",
            searchTerms: [ "bath", "clean", "faucet", "water" ]
        }, {
            title: "fas fa-shredder",
            searchTerms: [ "destroy", "document", "office", "paper", "print" ]
        }, {
            title: "far fa-shredder",
            searchTerms: [ "destroy", "document", "office", "paper", "print" ]
        }, {
            title: "fal fa-shredder",
            searchTerms: [ "destroy", "document", "office", "paper", "print" ]
        }, {
            title: "fas fa-shuttle-van",
            searchTerms: [ "airport", "machine", "public-transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "far fa-shuttle-van",
            searchTerms: [ "airport", "machine", "public-transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "fal fa-shuttle-van",
            searchTerms: [ "airport", "machine", "public-transportation", "transportation", "travel", "vehicle" ]
        }, {
            title: "fas fa-shuttlecock",
            searchTerms: [ "badminton", "birdie", "feather", "sport" ]
        }, {
            title: "far fa-shuttlecock",
            searchTerms: [ "badminton", "birdie", "feather", "sport" ]
        }, {
            title: "fal fa-shuttlecock",
            searchTerms: [ "badminton", "birdie", "feather", "sport" ]
        }, {
            title: "fas fa-sickle",
            searchTerms: [ "blade", "d&d", "dnd", "dungeons & dragons", "fantasy", "weapon" ]
        }, {
            title: "far fa-sickle",
            searchTerms: [ "blade", "d&d", "dnd", "dungeons & dragons", "fantasy", "weapon" ]
        }, {
            title: "fal fa-sickle",
            searchTerms: [ "blade", "d&d", "dnd", "dungeons & dragons", "fantasy", "weapon" ]
        }, {
            title: "fas fa-sigma",
            searchTerms: [ "alphabet", "greek", "math", "summation" ]
        }, {
            title: "far fa-sigma",
            searchTerms: [ "alphabet", "greek", "math", "summation" ]
        }, {
            title: "fal fa-sigma",
            searchTerms: [ "alphabet", "greek", "math", "summation" ]
        }, {
            title: "fas fa-sign",
            searchTerms: [ "directions", "real estate", "signage", "wayfinding" ]
        }, {
            title: "far fa-sign",
            searchTerms: [ "directions", "real estate", "signage", "wayfinding" ]
        }, {
            title: "fal fa-sign",
            searchTerms: [ "directions", "real estate", "signage", "wayfinding" ]
        }, {
            title: "fas fa-sign-in",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "far fa-sign-in",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "fal fa-sign-in",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "fas fa-sign-in-alt",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "far fa-sign-in-alt",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "fal fa-sign-in-alt",
            searchTerms: [ "arrow", "enter", "join", "log in", "login", "sign in", "sign up", "sign-in", "signin", "signup" ]
        }, {
            title: "fas fa-sign-language",
            searchTerms: [ "Translate", "asl", "deaf", "hands" ]
        }, {
            title: "far fa-sign-language",
            searchTerms: [ "Translate", "asl", "deaf", "hands" ]
        }, {
            title: "fal fa-sign-language",
            searchTerms: [ "Translate", "asl", "deaf", "hands" ]
        }, {
            title: "fas fa-sign-out",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout" ]
        }, {
            title: "far fa-sign-out",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout" ]
        }, {
            title: "fal fa-sign-out",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout" ]
        }, {
            title: "fas fa-sign-out-alt",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout", "sign-out" ]
        }, {
            title: "far fa-sign-out-alt",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout", "sign-out" ]
        }, {
            title: "fal fa-sign-out-alt",
            searchTerms: [ "arrow", "exit", "leave", "log out", "logout", "sign-out" ]
        }, {
            title: "fas fa-signal",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-1",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal-1",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal-1",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-2",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal-2",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal-2",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-3",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal-3",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal-3",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-4",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal-4",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal-4",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-alt",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal-alt",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal-alt",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-alt-1",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal-alt-1",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal-alt-1",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-alt-2",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal-alt-2",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal-alt-2",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-alt-3",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal-alt-3",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal-alt-3",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-alt-slash",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal-alt-slash",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal-alt-slash",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-slash",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "far fa-signal-slash",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fal fa-signal-slash",
            searchTerms: [ "bars", "graph", "online", "reception", "status" ]
        }, {
            title: "fas fa-signal-stream",
            searchTerms: [ "podcast", "radio", "sisngal", "streaming", "wave", "wifi", "wireless" ]
        }, {
            title: "far fa-signal-stream",
            searchTerms: [ "podcast", "radio", "sisngal", "streaming", "wave", "wifi", "wireless" ]
        }, {
            title: "fal fa-signal-stream",
            searchTerms: [ "podcast", "radio", "sisngal", "streaming", "wave", "wifi", "wireless" ]
        }, {
            title: "fas fa-signature",
            searchTerms: [ "John Hancock", "cursive", "name", "writing" ]
        }, {
            title: "far fa-signature",
            searchTerms: [ "John Hancock", "cursive", "name", "writing" ]
        }, {
            title: "fal fa-signature",
            searchTerms: [ "John Hancock", "cursive", "name", "writing" ]
        }, {
            title: "fas fa-sim-card",
            searchTerms: [ "hard drive", "hardware", "portable", "storage", "technology", "tiny" ]
        }, {
            title: "far fa-sim-card",
            searchTerms: [ "hard drive", "hardware", "portable", "storage", "technology", "tiny" ]
        }, {
            title: "fal fa-sim-card",
            searchTerms: [ "hard drive", "hardware", "portable", "storage", "technology", "tiny" ]
        }, {
            title: "fab fa-simplybuilt",
            searchTerms: []
        }, {
            title: "fas fa-siren",
            searchTerms: [ "alarm", "alert", "ambulance", "loud", "police", "warning" ]
        }, {
            title: "far fa-siren",
            searchTerms: [ "alarm", "alert", "ambulance", "loud", "police", "warning" ]
        }, {
            title: "fal fa-siren",
            searchTerms: [ "alarm", "alert", "ambulance", "loud", "police", "warning" ]
        }, {
            title: "fas fa-siren-on",
            searchTerms: [ "alarm", "alert", "ambulance", "loud", "police", "warning" ]
        }, {
            title: "far fa-siren-on",
            searchTerms: [ "alarm", "alert", "ambulance", "loud", "police", "warning" ]
        }, {
            title: "fal fa-siren-on",
            searchTerms: [ "alarm", "alert", "ambulance", "loud", "police", "warning" ]
        }, {
            title: "fab fa-sistrix",
            searchTerms: []
        }, {
            title: "fas fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "ia", "information architecture", "organization" ]
        }, {
            title: "far fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "ia", "information architecture", "organization" ]
        }, {
            title: "fal fa-sitemap",
            searchTerms: [ "directory", "hierarchy", "ia", "information architecture", "organization" ]
        }, {
            title: "fab fa-sith",
            searchTerms: []
        }, {
            title: "fas fa-skating",
            searchTerms: [ "activity", "figure skating", "fitness", "ice", "person", "winter" ]
        }, {
            title: "far fa-skating",
            searchTerms: [ "activity", "figure skating", "fitness", "ice", "person", "winter" ]
        }, {
            title: "fal fa-skating",
            searchTerms: [ "activity", "figure skating", "fitness", "ice", "person", "winter" ]
        }, {
            title: "fas fa-skeleton",
            searchTerms: [ "bones", "skeletal", "vertebrate", "x-ray" ]
        }, {
            title: "far fa-skeleton",
            searchTerms: [ "bones", "skeletal", "vertebrate", "x-ray" ]
        }, {
            title: "fal fa-skeleton",
            searchTerms: [ "bones", "skeletal", "vertebrate", "x-ray" ]
        }, {
            title: "fab fa-sketch",
            searchTerms: [ "app", "design", "interface" ]
        }, {
            title: "fas fa-ski-jump",
            searchTerms: [ "activity", "fast", "fitness", "olympics", "outdoors", "person", "snowman" ]
        }, {
            title: "far fa-ski-jump",
            searchTerms: [ "activity", "fast", "fitness", "olympics", "outdoors", "person", "snowman" ]
        }, {
            title: "fal fa-ski-jump",
            searchTerms: [ "activity", "fast", "fitness", "olympics", "outdoors", "person", "snowman" ]
        }, {
            title: "fas fa-ski-lift",
            searchTerms: [ "machine", "outdoors", "resort", "seasonal", "seat", "skiing", "tow" ]
        }, {
            title: "far fa-ski-lift",
            searchTerms: [ "machine", "outdoors", "resort", "seasonal", "seat", "skiing", "tow" ]
        }, {
            title: "fal fa-ski-lift",
            searchTerms: [ "machine", "outdoors", "resort", "seasonal", "seat", "skiing", "tow" ]
        }, {
            title: "fas fa-skiing",
            searchTerms: [ "activity", "downhill", "fast", "fitness", "olympics", "outdoors", "person", "seasonal", "slalom" ]
        }, {
            title: "far fa-skiing",
            searchTerms: [ "activity", "downhill", "fast", "fitness", "olympics", "outdoors", "person", "seasonal", "slalom" ]
        }, {
            title: "fal fa-skiing",
            searchTerms: [ "activity", "downhill", "fast", "fitness", "olympics", "outdoors", "person", "seasonal", "slalom" ]
        }, {
            title: "fas fa-skiing-nordic",
            searchTerms: [ "activity", "cross country", "fitness", "outdoors", "person", "seasonal" ]
        }, {
            title: "far fa-skiing-nordic",
            searchTerms: [ "activity", "cross country", "fitness", "outdoors", "person", "seasonal" ]
        }, {
            title: "fal fa-skiing-nordic",
            searchTerms: [ "activity", "cross country", "fitness", "outdoors", "person", "seasonal" ]
        }, {
            title: "fas fa-skull",
            searchTerms: [ "bones", "skeleton", "x-ray", "yorick" ]
        }, {
            title: "far fa-skull",
            searchTerms: [ "bones", "skeleton", "x-ray", "yorick" ]
        }, {
            title: "fal fa-skull",
            searchTerms: [ "bones", "skeleton", "x-ray", "yorick" ]
        }, {
            title: "fal fa-skull-cow",
            searchTerms: [ "barren", "cowboy", "dead", "desert", "horns", "old west", "skeleton", "western" ]
        }, {
            title: "far fa-skull-cow",
            searchTerms: [ "barren", "cowboy", "dead", "desert", "horns", "old west", "skeleton", "western" ]
        }, {
            title: "fas fa-skull-cow",
            searchTerms: [ "barren", "cowboy", "dead", "desert", "horns", "old west", "skeleton", "western" ]
        }, {
            title: "fas fa-skull-crossbones",
            searchTerms: [ "Dungeons & Dragons", "alert", "bones", "d&d", "danger", "dead", "deadly", "death", "dnd", "fantasy", "halloween", "holiday", "jolly-roger", "pirate", "poison", "skeleton", "warning" ]
        }, {
            title: "far fa-skull-crossbones",
            searchTerms: [ "Dungeons & Dragons", "alert", "bones", "d&d", "danger", "dead", "deadly", "death", "dnd", "fantasy", "halloween", "holiday", "jolly-roger", "pirate", "poison", "skeleton", "warning" ]
        }, {
            title: "fal fa-skull-crossbones",
            searchTerms: [ "Dungeons & Dragons", "alert", "bones", "d&d", "danger", "dead", "deadly", "death", "dnd", "fantasy", "halloween", "holiday", "jolly-roger", "pirate", "poison", "skeleton", "warning" ]
        }, {
            title: "fab fa-skyatlas",
            searchTerms: []
        }, {
            title: "fab fa-skype",
            searchTerms: []
        }, {
            title: "fab fa-slack",
            searchTerms: [ "anchor", "hash", "hashtag" ]
        }, {
            title: "fab fa-slack-hash",
            searchTerms: [ "anchor", "hash", "hashtag" ]
        }, {
            title: "fas fa-slash",
            searchTerms: [ "cancel", "close", "mute", "off", "stop", "x" ]
        }, {
            title: "far fa-slash",
            searchTerms: [ "cancel", "close", "mute", "off", "stop", "x" ]
        }, {
            title: "fal fa-slash",
            searchTerms: [ "cancel", "close", "mute", "off", "stop", "x" ]
        }, {
            title: "fas fa-sledding",
            searchTerms: [ "activity", "luge", "outdoors", "person", "seasonal", "snow", "toboggan" ]
        }, {
            title: "far fa-sledding",
            searchTerms: [ "activity", "luge", "outdoors", "person", "seasonal", "snow", "toboggan" ]
        }, {
            title: "fal fa-sledding",
            searchTerms: [ "activity", "luge", "outdoors", "person", "seasonal", "snow", "toboggan" ]
        }, {
            title: "fas fa-sleigh",
            searchTerms: [ "christmas", "claus", "fly", "holiday", "santa", "sled", "snow", "xmas" ]
        }, {
            title: "far fa-sleigh",
            searchTerms: [ "christmas", "claus", "fly", "holiday", "santa", "sled", "snow", "xmas" ]
        }, {
            title: "fal fa-sleigh",
            searchTerms: [ "christmas", "claus", "fly", "holiday", "santa", "sled", "snow", "xmas" ]
        }, {
            title: "fas fa-sliders-h",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "far fa-sliders-h",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "fal fa-sliders-h",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "fas fa-sliders-h-square",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "far fa-sliders-h-square",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "fal fa-sliders-h-square",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "fas fa-sliders-v",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "far fa-sliders-v",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "fal fa-sliders-v",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "fas fa-sliders-v-square",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "far fa-sliders-v-square",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "fal fa-sliders-v-square",
            searchTerms: [ "adjust", "settings", "sliders", "toggle" ]
        }, {
            title: "fab fa-slideshare",
            searchTerms: []
        }, {
            title: "fas fa-smile",
            searchTerms: [ "approve", "emoticon", "face", "happy", "rating", "satisfied" ]
        }, {
            title: "far fa-smile",
            searchTerms: [ "approve", "emoticon", "face", "happy", "rating", "satisfied" ]
        }, {
            title: "fal fa-smile",
            searchTerms: [ "approve", "emoticon", "face", "happy", "rating", "satisfied" ]
        }, {
            title: "fas fa-smile-beam",
            searchTerms: [ "emoticon", "face", "happy", "positive" ]
        }, {
            title: "far fa-smile-beam",
            searchTerms: [ "emoticon", "face", "happy", "positive" ]
        }, {
            title: "fal fa-smile-beam",
            searchTerms: [ "emoticon", "face", "happy", "positive" ]
        }, {
            title: "fas fa-smile-plus",
            searchTerms: [ "add", "emoticon", "face", "happy", "new" ]
        }, {
            title: "far fa-smile-plus",
            searchTerms: [ "add", "emoticon", "face", "happy", "new" ]
        }, {
            title: "fal fa-smile-plus",
            searchTerms: [ "add", "emoticon", "face", "happy", "new" ]
        }, {
            title: "fas fa-smile-wink",
            searchTerms: [ "emoticon", "face", "happy", "hint", "joke" ]
        }, {
            title: "far fa-smile-wink",
            searchTerms: [ "emoticon", "face", "happy", "hint", "joke" ]
        }, {
            title: "fal fa-smile-wink",
            searchTerms: [ "emoticon", "face", "happy", "hint", "joke" ]
        }, {
            title: "fas fa-smog",
            searchTerms: [ "dragon", "fog", "haze", "pollution", "smoke", "weather" ]
        }, {
            title: "far fa-smog",
            searchTerms: [ "dragon", "fog", "haze", "pollution", "smoke", "weather" ]
        }, {
            title: "fal fa-smog",
            searchTerms: [ "dragon", "fog", "haze", "pollution", "smoke", "weather" ]
        }, {
            title: "fas fa-smoke",
            searchTerms: [ "cloud", "fire", "fog", "haze" ]
        }, {
            title: "far fa-smoke",
            searchTerms: [ "cloud", "fire", "fog", "haze" ]
        }, {
            title: "fal fa-smoke",
            searchTerms: [ "cloud", "fire", "fog", "haze" ]
        }, {
            title: "fas fa-smoking",
            searchTerms: [ "cancer", "cigarette", "nicotine", "smoking status", "tobacco" ]
        }, {
            title: "far fa-smoking",
            searchTerms: [ "cancer", "cigarette", "nicotine", "smoking status", "tobacco" ]
        }, {
            title: "fal fa-smoking",
            searchTerms: [ "cancer", "cigarette", "nicotine", "smoking status", "tobacco" ]
        }, {
            title: "fas fa-smoking-ban",
            searchTerms: [ "ban", "cancel", "no smoking", "non-smoking" ]
        }, {
            title: "far fa-smoking-ban",
            searchTerms: [ "ban", "cancel", "no smoking", "non-smoking" ]
        }, {
            title: "fal fa-smoking-ban",
            searchTerms: [ "ban", "cancel", "no smoking", "non-smoking" ]
        }, {
            title: "fas fa-sms",
            searchTerms: [ "chat", "conversation", "message", "mobile", "notification", "phone", "sms", "texting" ]
        }, {
            title: "far fa-sms",
            searchTerms: [ "chat", "conversation", "message", "mobile", "notification", "phone", "sms", "texting" ]
        }, {
            title: "fal fa-sms",
            searchTerms: [ "chat", "conversation", "message", "mobile", "notification", "phone", "sms", "texting" ]
        }, {
            title: "fas fa-snake",
            searchTerms: [ "cobra", "fauna", "reptile", "slither" ]
        }, {
            title: "far fa-snake",
            searchTerms: [ "cobra", "fauna", "reptile", "slither" ]
        }, {
            title: "fal fa-snake",
            searchTerms: [ "cobra", "fauna", "reptile", "slither" ]
        }, {
            title: "fab fa-snapchat",
            searchTerms: []
        }, {
            title: "fab fa-snapchat-ghost",
            searchTerms: []
        }, {
            title: "fab fa-snapchat-square",
            searchTerms: []
        }, {
            title: "fas fa-snooze",
            searchTerms: [ "alarm", "nap", "rest", "siesta", "sleep" ]
        }, {
            title: "far fa-snooze",
            searchTerms: [ "alarm", "nap", "rest", "siesta", "sleep" ]
        }, {
            title: "fal fa-snooze",
            searchTerms: [ "alarm", "nap", "rest", "siesta", "sleep" ]
        }, {
            title: "fas fa-snow-blowing",
            searchTerms: [ "blizzard", "precipitation", "storm", "winter" ]
        }, {
            title: "far fa-snow-blowing",
            searchTerms: [ "blizzard", "precipitation", "storm", "winter" ]
        }, {
            title: "fal fa-snow-blowing",
            searchTerms: [ "blizzard", "precipitation", "storm", "winter" ]
        }, {
            title: "fas fa-snowboarding",
            searchTerms: [ "activity", "fitness", "olympics", "outdoors", "person" ]
        }, {
            title: "far fa-snowboarding",
            searchTerms: [ "activity", "fitness", "olympics", "outdoors", "person" ]
        }, {
            title: "fal fa-snowboarding",
            searchTerms: [ "activity", "fitness", "olympics", "outdoors", "person" ]
        }, {
            title: "fas fa-snowflake",
            searchTerms: [ "precipitation", "rain", "winter" ]
        }, {
            title: "far fa-snowflake",
            searchTerms: [ "precipitation", "rain", "winter" ]
        }, {
            title: "fal fa-snowflake",
            searchTerms: [ "precipitation", "rain", "winter" ]
        }, {
            title: "fas fa-snowflakes",
            searchTerms: [ "precipitation", "rain", "winter" ]
        }, {
            title: "far fa-snowflakes",
            searchTerms: [ "precipitation", "rain", "winter" ]
        }, {
            title: "fal fa-snowflakes",
            searchTerms: [ "precipitation", "rain", "winter" ]
        }, {
            title: "fas fa-snowman",
            searchTerms: [ "decoration", "frost", "frosty", "holiday" ]
        }, {
            title: "far fa-snowman",
            searchTerms: [ "decoration", "frost", "frosty", "holiday" ]
        }, {
            title: "fal fa-snowman",
            searchTerms: [ "decoration", "frost", "frosty", "holiday" ]
        }, {
            title: "fas fa-snowmobile",
            searchTerms: [ "fast", "person", "transportation", "treads", "vehicle", "winter" ]
        }, {
            title: "far fa-snowmobile",
            searchTerms: [ "fast", "person", "transportation", "treads", "vehicle", "winter" ]
        }, {
            title: "fal fa-snowmobile",
            searchTerms: [ "fast", "person", "transportation", "treads", "vehicle", "winter" ]
        }, {
            title: "fas fa-snowplow",
            searchTerms: [ "clean up", "cold", "road", "storm", "winter" ]
        }, {
            title: "far fa-snowplow",
            searchTerms: [ "clean up", "cold", "road", "storm", "winter" ]
        }, {
            title: "fal fa-snowplow",
            searchTerms: [ "clean up", "cold", "road", "storm", "winter" ]
        }, {
            title: "fas fa-socks",
            searchTerms: [ "business socks", "business time", "clothing", "feet", "flight of the conchords", "wednesday" ]
        }, {
            title: "far fa-socks",
            searchTerms: [ "business socks", "business time", "clothing", "feet", "flight of the conchords", "wednesday" ]
        }, {
            title: "fal fa-socks",
            searchTerms: [ "business socks", "business time", "clothing", "feet", "flight of the conchords", "wednesday" ]
        }, {
            title: "fas fa-solar-panel",
            searchTerms: [ "clean", "eco-friendly", "energy", "green", "sun" ]
        }, {
            title: "far fa-solar-panel",
            searchTerms: [ "clean", "eco-friendly", "energy", "green", "sun" ]
        }, {
            title: "fal fa-solar-panel",
            searchTerms: [ "clean", "eco-friendly", "energy", "green", "sun" ]
        }, {
            title: "fas fa-solar-system",
            searchTerms: [ "galaxy", "orbit", "planets", "space", "sun", "universe" ]
        }, {
            title: "far fa-solar-system",
            searchTerms: [ "galaxy", "orbit", "planets", "space", "sun", "universe" ]
        }, {
            title: "fal fa-solar-system",
            searchTerms: [ "galaxy", "orbit", "planets", "space", "sun", "universe" ]
        }, {
            title: "fas fa-sort",
            searchTerms: [ "filter", "order" ]
        }, {
            title: "far fa-sort",
            searchTerms: [ "filter", "order" ]
        }, {
            title: "fal fa-sort",
            searchTerms: [ "filter", "order" ]
        }, {
            title: "fas fa-sort-alpha-down",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-asc" ]
        }, {
            title: "far fa-sort-alpha-down",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-asc" ]
        }, {
            title: "fal fa-sort-alpha-down",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-asc" ]
        }, {
            title: "fas fa-sort-alpha-down-alt",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-asc" ]
        }, {
            title: "far fa-sort-alpha-down-alt",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-asc" ]
        }, {
            title: "fal fa-sort-alpha-down-alt",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-asc" ]
        }, {
            title: "fas fa-sort-alpha-up",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-desc" ]
        }, {
            title: "far fa-sort-alpha-up",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-desc" ]
        }, {
            title: "fal fa-sort-alpha-up",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-desc" ]
        }, {
            title: "fas fa-sort-alpha-up-alt",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-desc" ]
        }, {
            title: "far fa-sort-alpha-up-alt",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-desc" ]
        }, {
            title: "fal fa-sort-alpha-up-alt",
            searchTerms: [ "alphabetical", "arrange", "filter", "order", "sort-alpha-desc" ]
        }, {
            title: "fas fa-sort-alt",
            searchTerms: [ "arrange", "arrows", "exchange", "filter", "order", "transfer" ]
        }, {
            title: "far fa-sort-alt",
            searchTerms: [ "arrange", "arrows", "exchange", "filter", "order", "transfer" ]
        }, {
            title: "fal fa-sort-alt",
            searchTerms: [ "arrange", "arrows", "exchange", "filter", "order", "transfer" ]
        }, {
            title: "fas fa-sort-amount-down",
            searchTerms: [ "arrange", "filter", "number", "order", "sort-amount-asc" ]
        }, {
            title: "far fa-sort-amount-down",
            searchTerms: [ "arrange", "filter", "number", "order", "sort-amount-asc" ]
        }, {
            title: "fal fa-sort-amount-down",
            searchTerms: [ "arrange", "filter", "number", "order", "sort-amount-asc" ]
        }, {
            title: "fas fa-sort-amount-down-alt",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-asc" ]
        }, {
            title: "far fa-sort-amount-down-alt",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-asc" ]
        }, {
            title: "fal fa-sort-amount-down-alt",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-asc" ]
        }, {
            title: "fas fa-sort-amount-up",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-desc" ]
        }, {
            title: "far fa-sort-amount-up",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-desc" ]
        }, {
            title: "fal fa-sort-amount-up",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-desc" ]
        }, {
            title: "fas fa-sort-amount-up-alt",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-desc" ]
        }, {
            title: "far fa-sort-amount-up-alt",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-desc" ]
        }, {
            title: "fal fa-sort-amount-up-alt",
            searchTerms: [ "arrange", "filter", "order", "sort-amount-desc" ]
        }, {
            title: "fas fa-sort-circle",
            searchTerms: [ "down", "elevator", "lower", "raise", "temperature", "thermostat", "up" ]
        }, {
            title: "far fa-sort-circle",
            searchTerms: [ "down", "elevator", "lower", "raise", "temperature", "thermostat", "up" ]
        }, {
            title: "fal fa-sort-circle",
            searchTerms: [ "down", "elevator", "lower", "raise", "temperature", "thermostat", "up" ]
        }, {
            title: "fas fa-sort-circle-down",
            searchTerms: [ "down", "elevator", "lower", "raise", "temperature", "thermostat", "up" ]
        }, {
            title: "far fa-sort-circle-down",
            searchTerms: [ "down", "elevator", "lower", "raise", "temperature", "thermostat", "up" ]
        }, {
            title: "fal fa-sort-circle-down",
            searchTerms: [ "down", "elevator", "lower", "raise", "temperature", "thermostat", "up" ]
        }, {
            title: "fas fa-sort-circle-up",
            searchTerms: [ "down", "elevator", "lower", "raise", "temperature", "thermostat", "up" ]
        }, {
            title: "far fa-sort-circle-up",
            searchTerms: [ "down", "elevator", "lower", "raise", "temperature", "thermostat", "up" ]
        }, {
            title: "fal fa-sort-circle-up",
            searchTerms: [ "down", "elevator", "lower", "raise", "temperature", "thermostat", "up" ]
        }, {
            title: "fas fa-sort-down",
            searchTerms: [ "arrow", "descending", "filter", "order", "sort-desc" ]
        }, {
            title: "far fa-sort-down",
            searchTerms: [ "arrow", "descending", "filter", "order", "sort-desc" ]
        }, {
            title: "fal fa-sort-down",
            searchTerms: [ "arrow", "descending", "filter", "order", "sort-desc" ]
        }, {
            title: "fas fa-sort-numeric-down",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-asc" ]
        }, {
            title: "far fa-sort-numeric-down",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-asc" ]
        }, {
            title: "fal fa-sort-numeric-down",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-asc" ]
        }, {
            title: "fas fa-sort-numeric-down-alt",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-asc" ]
        }, {
            title: "far fa-sort-numeric-down-alt",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-asc" ]
        }, {
            title: "fal fa-sort-numeric-down-alt",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-asc" ]
        }, {
            title: "fas fa-sort-numeric-up",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-desc" ]
        }, {
            title: "far fa-sort-numeric-up",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-desc" ]
        }, {
            title: "fal fa-sort-numeric-up",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-desc" ]
        }, {
            title: "fas fa-sort-numeric-up-alt",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-desc" ]
        }, {
            title: "far fa-sort-numeric-up-alt",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-desc" ]
        }, {
            title: "fal fa-sort-numeric-up-alt",
            searchTerms: [ "arrange", "filter", "numbers", "order", "sort-numeric-desc" ]
        }, {
            title: "fas fa-sort-shapes-down",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "far fa-sort-shapes-down",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "fal fa-sort-shapes-down",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "fas fa-sort-shapes-down-alt",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "far fa-sort-shapes-down-alt",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "fal fa-sort-shapes-down-alt",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "fas fa-sort-shapes-up",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "far fa-sort-shapes-up",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "fal fa-sort-shapes-up",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "fas fa-sort-shapes-up-alt",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "far fa-sort-shapes-up-alt",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "fal fa-sort-shapes-up-alt",
            searchTerms: [ "arrange", "filter", "order", "shapes", "square", "triangle" ]
        }, {
            title: "fas fa-sort-size-down",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "far fa-sort-size-down",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "fal fa-sort-size-down",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "fas fa-sort-size-down-alt",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "far fa-sort-size-down-alt",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "fal fa-sort-size-down-alt",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "fas fa-sort-size-up",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "far fa-sort-size-up",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "fal fa-sort-size-up",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "fas fa-sort-size-up-alt",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "far fa-sort-size-up-alt",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "fal fa-sort-size-up-alt",
            searchTerms: [ "arrange", "filter", "order", "rectangle" ]
        }, {
            title: "fas fa-sort-up",
            searchTerms: [ "arrow", "ascending", "filter", "order", "sort-asc" ]
        }, {
            title: "far fa-sort-up",
            searchTerms: [ "arrow", "ascending", "filter", "order", "sort-asc" ]
        }, {
            title: "fal fa-sort-up",
            searchTerms: [ "arrow", "ascending", "filter", "order", "sort-asc" ]
        }, {
            title: "fab fa-soundcloud",
            searchTerms: []
        }, {
            title: "fas fa-soup",
            searchTerms: [ "bisque", "bouillon", "bowl", "broth", "chicken", "chowder", "gazpacho", "ramen", "stew" ]
        }, {
            title: "far fa-soup",
            searchTerms: [ "bisque", "bouillon", "bowl", "broth", "chicken", "chowder", "gazpacho", "ramen", "stew" ]
        }, {
            title: "fal fa-soup",
            searchTerms: [ "bisque", "bouillon", "bowl", "broth", "chicken", "chowder", "gazpacho", "ramen", "stew" ]
        }, {
            title: "fab fa-sourcetree",
            searchTerms: []
        }, {
            title: "fas fa-spa",
            searchTerms: [ "flora", "massage", "mindfulness", "plant", "wellness" ]
        }, {
            title: "far fa-spa",
            searchTerms: [ "flora", "massage", "mindfulness", "plant", "wellness" ]
        }, {
            title: "fal fa-spa",
            searchTerms: [ "flora", "massage", "mindfulness", "plant", "wellness" ]
        }, {
            title: "fas fa-space-shuttle",
            searchTerms: [ "astronaut", "machine", "nasa", "rocket", "space", "transportation" ]
        }, {
            title: "far fa-space-shuttle",
            searchTerms: [ "astronaut", "machine", "nasa", "rocket", "space", "transportation" ]
        }, {
            title: "fal fa-space-shuttle",
            searchTerms: [ "astronaut", "machine", "nasa", "rocket", "space", "transportation" ]
        }, {
            title: "fas fa-space-station-moon",
            searchTerms: [ "death star", "empire", "galen erso", "kyber crystal", "laser", "not a moon", "secret weapon", "star wars" ]
        }, {
            title: "far fa-space-station-moon",
            searchTerms: [ "death star", "empire", "galen erso", "kyber crystal", "laser", "not a moon", "secret weapon", "star wars" ]
        }, {
            title: "fal fa-space-station-moon",
            searchTerms: [ "death star", "empire", "galen erso", "kyber crystal", "laser", "not a moon", "secret weapon", "star wars" ]
        }, {
            title: "fas fa-space-station-moon-alt",
            searchTerms: [ "death star", "empire", "kyber crystal", "laser", "not a moon", "star wars", "under construction" ]
        }, {
            title: "far fa-space-station-moon-alt",
            searchTerms: [ "death star", "empire", "kyber crystal", "laser", "not a moon", "star wars", "under construction" ]
        }, {
            title: "fal fa-space-station-moon-alt",
            searchTerms: [ "death star", "empire", "kyber crystal", "laser", "not a moon", "star wars", "under construction" ]
        }, {
            title: "fas fa-spade",
            searchTerms: [ "card", "game", "poker", "suit" ]
        }, {
            title: "far fa-spade",
            searchTerms: [ "card", "game", "poker", "suit" ]
        }, {
            title: "fal fa-spade",
            searchTerms: [ "card", "game", "poker", "suit" ]
        }, {
            title: "fas fa-sparkles",
            searchTerms: [ "glitter", "magic", "new", "special", "twinkle" ]
        }, {
            title: "far fa-sparkles",
            searchTerms: [ "glitter", "magic", "new", "special", "twinkle" ]
        }, {
            title: "fal fa-sparkles",
            searchTerms: [ "glitter", "magic", "new", "special", "twinkle" ]
        }, {
            title: "fab fa-speakap",
            searchTerms: []
        }, {
            title: "fas fa-speaker",
            searchTerms: [ "audio", "device", "music", "sound", "subwoofer", "transducer", "tweeter" ]
        }, {
            title: "far fa-speaker",
            searchTerms: [ "audio", "device", "music", "sound", "subwoofer", "transducer", "tweeter" ]
        }, {
            title: "fal fa-speaker",
            searchTerms: [ "audio", "device", "music", "sound", "subwoofer", "transducer", "tweeter" ]
        }, {
            title: "fab fa-speaker-deck",
            searchTerms: []
        }, {
            title: "fas fa-speakers",
            searchTerms: [ "audio", "device", "group", "music", "sound", "subwoofer", "transducer", "tweeter" ]
        }, {
            title: "far fa-speakers",
            searchTerms: [ "audio", "device", "group", "music", "sound", "subwoofer", "transducer", "tweeter" ]
        }, {
            title: "fal fa-speakers",
            searchTerms: [ "audio", "device", "group", "music", "sound", "subwoofer", "transducer", "tweeter" ]
        }, {
            title: "fas fa-spell-check",
            searchTerms: [ "dictionary", "edit", "editor", "grammar", "text" ]
        }, {
            title: "far fa-spell-check",
            searchTerms: [ "dictionary", "edit", "editor", "grammar", "text" ]
        }, {
            title: "fal fa-spell-check",
            searchTerms: [ "dictionary", "edit", "editor", "grammar", "text" ]
        }, {
            title: "fas fa-spider",
            searchTerms: [ "arachnid", "bug", "charlotte", "crawl", "eight", "halloween" ]
        }, {
            title: "far fa-spider",
            searchTerms: [ "arachnid", "bug", "charlotte", "crawl", "eight", "halloween" ]
        }, {
            title: "fal fa-spider",
            searchTerms: [ "arachnid", "bug", "charlotte", "crawl", "eight", "halloween" ]
        }, {
            title: "fas fa-spider-black-widow",
            searchTerms: [ "alert", "arachnid", "bug", "charlotte", "crawl", "danger", "dangerous", "deadly", "eight", "error", "halloween" ]
        }, {
            title: "far fa-spider-black-widow",
            searchTerms: [ "alert", "arachnid", "bug", "charlotte", "crawl", "danger", "dangerous", "deadly", "eight", "error", "halloween" ]
        }, {
            title: "fal fa-spider-black-widow",
            searchTerms: [ "alert", "arachnid", "bug", "charlotte", "crawl", "danger", "dangerous", "deadly", "eight", "error", "halloween" ]
        }, {
            title: "fas fa-spider-web",
            searchTerms: [ "cobweb", "gossamer", "halloween" ]
        }, {
            title: "far fa-spider-web",
            searchTerms: [ "cobweb", "gossamer", "halloween" ]
        }, {
            title: "fal fa-spider-web",
            searchTerms: [ "cobweb", "gossamer", "halloween" ]
        }, {
            title: "fas fa-spinner",
            searchTerms: [ "circle", "loading", "progress" ]
        }, {
            title: "far fa-spinner",
            searchTerms: [ "circle", "loading", "progress" ]
        }, {
            title: "fal fa-spinner",
            searchTerms: [ "circle", "loading", "progress" ]
        }, {
            title: "fas fa-spinner-third",
            searchTerms: [ "circle", "loading", "progress" ]
        }, {
            title: "far fa-spinner-third",
            searchTerms: [ "circle", "loading", "progress" ]
        }, {
            title: "fal fa-spinner-third",
            searchTerms: [ "circle", "loading", "progress" ]
        }, {
            title: "fas fa-splotch",
            searchTerms: [ "Ink", "blob", "blotch", "glob", "stain" ]
        }, {
            title: "far fa-splotch",
            searchTerms: [ "Ink", "blob", "blotch", "glob", "stain" ]
        }, {
            title: "fal fa-splotch",
            searchTerms: [ "Ink", "blob", "blotch", "glob", "stain" ]
        }, {
            title: "fab fa-spotify",
            searchTerms: []
        }, {
            title: "fas fa-spray-can",
            searchTerms: [ "Paint", "aerosol", "design", "graffiti", "tag" ]
        }, {
            title: "far fa-spray-can",
            searchTerms: [ "Paint", "aerosol", "design", "graffiti", "tag" ]
        }, {
            title: "fal fa-spray-can",
            searchTerms: [ "Paint", "aerosol", "design", "graffiti", "tag" ]
        }, {
            title: "fas fa-sprinkler",
            searchTerms: [ "grass", "lawn", "shower", "spray", "water" ]
        }, {
            title: "far fa-sprinkler",
            searchTerms: [ "grass", "lawn", "shower", "spray", "water" ]
        }, {
            title: "fal fa-sprinkler",
            searchTerms: [ "grass", "lawn", "shower", "spray", "water" ]
        }, {
            title: "fas fa-square",
            searchTerms: [ "block", "box", "shape" ]
        }, {
            title: "far fa-square",
            searchTerms: [ "block", "box", "shape" ]
        }, {
            title: "fal fa-square",
            searchTerms: [ "block", "box", "shape" ]
        }, {
            title: "fas fa-square-full",
            searchTerms: [ "block", "box", "shape" ]
        }, {
            title: "far fa-square-full",
            searchTerms: [ "block", "box", "shape" ]
        }, {
            title: "fal fa-square-full",
            searchTerms: [ "block", "box", "shape" ]
        }, {
            title: "fas fa-square-root",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "far fa-square-root",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "fal fa-square-root",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "fas fa-square-root-alt",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "far fa-square-root-alt",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "fal fa-square-root-alt",
            searchTerms: [ "arithmetic", "calculus", "division", "math" ]
        }, {
            title: "fab fa-squarespace",
            searchTerms: []
        }, {
            title: "fas fa-squirrel",
            searchTerms: [ "animal", "chipmunk", "mammal", "marmot", "rat", "rodent", "tree" ]
        }, {
            title: "far fa-squirrel",
            searchTerms: [ "animal", "chipmunk", "mammal", "marmot", "rat", "rodent", "tree" ]
        }, {
            title: "fal fa-squirrel",
            searchTerms: [ "animal", "chipmunk", "mammal", "marmot", "rat", "rodent", "tree" ]
        }, {
            title: "fab fa-stack-exchange",
            searchTerms: []
        }, {
            title: "fab fa-stack-overflow",
            searchTerms: []
        }, {
            title: "fab fa-stackpath",
            searchTerms: []
        }, {
            title: "fas fa-staff",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "mage", "stick", "weapon" ]
        }, {
            title: "far fa-staff",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "mage", "stick", "weapon" ]
        }, {
            title: "fal fa-staff",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "mage", "stick", "weapon" ]
        }, {
            title: "fas fa-stamp",
            searchTerms: [ "art", "certificate", "imprint", "rubber", "seal" ]
        }, {
            title: "far fa-stamp",
            searchTerms: [ "art", "certificate", "imprint", "rubber", "seal" ]
        }, {
            title: "fal fa-stamp",
            searchTerms: [ "art", "certificate", "imprint", "rubber", "seal" ]
        }, {
            title: "fas fa-star",
            searchTerms: [ "achievement", "award", "favorite", "important", "night", "rating", "score" ]
        }, {
            title: "far fa-star",
            searchTerms: [ "achievement", "award", "favorite", "important", "night", "rating", "score" ]
        }, {
            title: "fal fa-star",
            searchTerms: [ "achievement", "award", "favorite", "important", "night", "rating", "score" ]
        }, {
            title: "fas fa-star-and-crescent",
            searchTerms: [ "islam", "muslim", "religion" ]
        }, {
            title: "far fa-star-and-crescent",
            searchTerms: [ "islam", "muslim", "religion" ]
        }, {
            title: "fal fa-star-and-crescent",
            searchTerms: [ "islam", "muslim", "religion" ]
        }, {
            title: "fas fa-star-christmas",
            searchTerms: [ "bethlehem", "christmas", "holiday", "north", "xmas" ]
        }, {
            title: "far fa-star-christmas",
            searchTerms: [ "bethlehem", "christmas", "holiday", "north", "xmas" ]
        }, {
            title: "fal fa-star-christmas",
            searchTerms: [ "bethlehem", "christmas", "holiday", "north", "xmas" ]
        }, {
            title: "fas fa-star-exclamation",
            searchTerms: [ "achievement", "alert", "award", "favorite", "night", "rating", "score" ]
        }, {
            title: "far fa-star-exclamation",
            searchTerms: [ "achievement", "alert", "award", "favorite", "night", "rating", "score" ]
        }, {
            title: "fal fa-star-exclamation",
            searchTerms: [ "achievement", "alert", "award", "favorite", "night", "rating", "score" ]
        }, {
            title: "fas fa-star-half",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "far fa-star-half",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fal fa-star-half",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fas fa-star-half-alt",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "far fa-star-half-alt",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fal fa-star-half-alt",
            searchTerms: [ "achievement", "award", "rating", "score", "star-half-empty", "star-half-full" ]
        }, {
            title: "fas fa-star-of-david",
            searchTerms: [ "jewish", "judaism", "religion" ]
        }, {
            title: "far fa-star-of-david",
            searchTerms: [ "jewish", "judaism", "religion" ]
        }, {
            title: "fal fa-star-of-david",
            searchTerms: [ "jewish", "judaism", "religion" ]
        }, {
            title: "fas fa-star-of-life",
            searchTerms: [ "doctor", "emt", "first aid", "health", "medical" ]
        }, {
            title: "far fa-star-of-life",
            searchTerms: [ "doctor", "emt", "first aid", "health", "medical" ]
        }, {
            title: "fal fa-star-of-life",
            searchTerms: [ "doctor", "emt", "first aid", "health", "medical" ]
        }, {
            title: "fas fa-star-shooting",
            searchTerms: [ "asteroid", "comet", "meteor", "space", "wish" ]
        }, {
            title: "far fa-star-shooting",
            searchTerms: [ "asteroid", "comet", "meteor", "space", "wish" ]
        }, {
            title: "fal fa-star-shooting",
            searchTerms: [ "asteroid", "comet", "meteor", "space", "wish" ]
        }, {
            title: "fas fa-starfighter",
            searchTerms: [ "luke skywalker", "rebel", "spaceship", "star wars", "x-wing" ]
        }, {
            title: "far fa-starfighter",
            searchTerms: [ "luke skywalker", "rebel", "spaceship", "star wars", "x-wing" ]
        }, {
            title: "fal fa-starfighter",
            searchTerms: [ "luke skywalker", "rebel", "spaceship", "star wars", "x-wing" ]
        }, {
            title: "fas fa-starfighter-alt",
            searchTerms: [ "darth vader", "empire", "spaceship", "star wars", "tie fighter" ]
        }, {
            title: "far fa-starfighter-alt",
            searchTerms: [ "darth vader", "empire", "spaceship", "star wars", "tie fighter" ]
        }, {
            title: "fal fa-starfighter-alt",
            searchTerms: [ "darth vader", "empire", "spaceship", "star wars", "tie fighter" ]
        }, {
            title: "fas fa-stars",
            searchTerms: [ "favorite", "galaxy", "magic", "night", "space" ]
        }, {
            title: "far fa-stars",
            searchTerms: [ "favorite", "galaxy", "magic", "night", "space" ]
        }, {
            title: "fal fa-stars",
            searchTerms: [ "favorite", "galaxy", "magic", "night", "space" ]
        }, {
            title: "fas fa-starship",
            searchTerms: [ "engage", "enterprise", "james t kirk", "jean-luc picard", "make it so", "ncc-1701", "spacecraft", "spaceship", "star trek" ]
        }, {
            title: "far fa-starship",
            searchTerms: [ "engage", "enterprise", "james t kirk", "jean-luc picard", "make it so", "ncc-1701", "spacecraft", "spaceship", "star trek" ]
        }, {
            title: "fal fa-starship",
            searchTerms: [ "engage", "enterprise", "james t kirk", "jean-luc picard", "make it so", "ncc-1701", "spacecraft", "spaceship", "star trek" ]
        }, {
            title: "fas fa-starship-freighter",
            searchTerms: [ "chewbacca", "han solo", "millenium falcon", "rebel", "spaceship", "star wars", "yt-1300" ]
        }, {
            title: "far fa-starship-freighter",
            searchTerms: [ "chewbacca", "han solo", "millenium falcon", "rebel", "spaceship", "star wars", "yt-1300" ]
        }, {
            title: "fal fa-starship-freighter",
            searchTerms: [ "chewbacca", "han solo", "millenium falcon", "rebel", "spaceship", "star wars", "yt-1300" ]
        }, {
            title: "fab fa-staylinked",
            searchTerms: []
        }, {
            title: "fas fa-steak",
            searchTerms: [ "beef", "grill", "meat", "sirloin" ]
        }, {
            title: "far fa-steak",
            searchTerms: [ "beef", "grill", "meat", "sirloin" ]
        }, {
            title: "fal fa-steak",
            searchTerms: [ "beef", "grill", "meat", "sirloin" ]
        }, {
            title: "fab fa-steam",
            searchTerms: []
        }, {
            title: "fab fa-steam-square",
            searchTerms: []
        }, {
            title: "fab fa-steam-symbol",
            searchTerms: []
        }, {
            title: "fas fa-steering-wheel",
            searchTerms: [ "auto", "car", "direction", "driving", "navigation" ]
        }, {
            title: "far fa-steering-wheel",
            searchTerms: [ "auto", "car", "direction", "driving", "navigation" ]
        }, {
            title: "fal fa-steering-wheel",
            searchTerms: [ "auto", "car", "direction", "driving", "navigation" ]
        }, {
            title: "fas fa-step-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "far fa-step-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fal fa-step-backward",
            searchTerms: [ "beginning", "first", "previous", "rewind", "start" ]
        }, {
            title: "fas fa-step-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "far fa-step-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fal fa-step-forward",
            searchTerms: [ "end", "last", "next" ]
        }, {
            title: "fas fa-stethoscope",
            searchTerms: [ "diagnosis", "doctor", "general practitioner", "hospital", "infirmary", "medicine", "office", "outpatient" ]
        }, {
            title: "far fa-stethoscope",
            searchTerms: [ "diagnosis", "doctor", "general practitioner", "hospital", "infirmary", "medicine", "office", "outpatient" ]
        }, {
            title: "fal fa-stethoscope",
            searchTerms: [ "diagnosis", "doctor", "general practitioner", "hospital", "infirmary", "medicine", "office", "outpatient" ]
        }, {
            title: "fab fa-sticker-mule",
            searchTerms: []
        }, {
            title: "fas fa-sticky-note",
            searchTerms: [ "message", "note", "paper", "reminder", "sticker" ]
        }, {
            title: "far fa-sticky-note",
            searchTerms: [ "message", "note", "paper", "reminder", "sticker" ]
        }, {
            title: "fal fa-sticky-note",
            searchTerms: [ "message", "note", "paper", "reminder", "sticker" ]
        }, {
            title: "fas fa-stocking",
            searchTerms: [ "christmas", "clothing", "decoration", "gift", "holiday", "present", "sock", "tradition", "xmas" ]
        }, {
            title: "far fa-stocking",
            searchTerms: [ "christmas", "clothing", "decoration", "gift", "holiday", "present", "sock", "tradition", "xmas" ]
        }, {
            title: "fal fa-stocking",
            searchTerms: [ "christmas", "clothing", "decoration", "gift", "holiday", "present", "sock", "tradition", "xmas" ]
        }, {
            title: "fas fa-stomach",
            searchTerms: [ "abdomen", "belly", "food", "gut", "hungry", "intestine", "organ", "tummy" ]
        }, {
            title: "far fa-stomach",
            searchTerms: [ "abdomen", "belly", "food", "gut", "hungry", "intestine", "organ", "tummy" ]
        }, {
            title: "fal fa-stomach",
            searchTerms: [ "abdomen", "belly", "food", "gut", "hungry", "intestine", "organ", "tummy" ]
        }, {
            title: "fas fa-stop",
            searchTerms: [ "block", "box", "square" ]
        }, {
            title: "far fa-stop",
            searchTerms: [ "block", "box", "square" ]
        }, {
            title: "fal fa-stop",
            searchTerms: [ "block", "box", "square" ]
        }, {
            title: "fas fa-stop-circle",
            searchTerms: [ "block", "box", "circle", "square" ]
        }, {
            title: "far fa-stop-circle",
            searchTerms: [ "block", "box", "circle", "square" ]
        }, {
            title: "fal fa-stop-circle",
            searchTerms: [ "block", "box", "circle", "square" ]
        }, {
            title: "fas fa-stopwatch",
            searchTerms: [ "clock", "reminder", "time" ]
        }, {
            title: "far fa-stopwatch",
            searchTerms: [ "clock", "reminder", "time" ]
        }, {
            title: "fal fa-stopwatch",
            searchTerms: [ "clock", "reminder", "time" ]
        }, {
            title: "fas fa-store",
            searchTerms: [ "building", "buy", "purchase", "shopping" ]
        }, {
            title: "far fa-store",
            searchTerms: [ "building", "buy", "purchase", "shopping" ]
        }, {
            title: "fal fa-store",
            searchTerms: [ "building", "buy", "purchase", "shopping" ]
        }, {
            title: "fas fa-store-alt",
            searchTerms: [ "building", "buy", "purchase", "shopping" ]
        }, {
            title: "far fa-store-alt",
            searchTerms: [ "building", "buy", "purchase", "shopping" ]
        }, {
            title: "fal fa-store-alt",
            searchTerms: [ "building", "buy", "purchase", "shopping" ]
        }, {
            title: "fab fa-strava",
            searchTerms: []
        }, {
            title: "fas fa-stream",
            searchTerms: [ "flow", "list", "timeline" ]
        }, {
            title: "far fa-stream",
            searchTerms: [ "flow", "list", "timeline" ]
        }, {
            title: "fal fa-stream",
            searchTerms: [ "flow", "list", "timeline" ]
        }, {
            title: "fas fa-street-view",
            searchTerms: [ "directions", "location", "map", "navigation" ]
        }, {
            title: "far fa-street-view",
            searchTerms: [ "directions", "location", "map", "navigation" ]
        }, {
            title: "fal fa-street-view",
            searchTerms: [ "directions", "location", "map", "navigation" ]
        }, {
            title: "fas fa-stretcher",
            searchTerms: [ "ambulance", "bed", "emergency", "er", "patient" ]
        }, {
            title: "far fa-stretcher",
            searchTerms: [ "ambulance", "bed", "emergency", "er", "patient" ]
        }, {
            title: "fal fa-stretcher",
            searchTerms: [ "ambulance", "bed", "emergency", "er", "patient" ]
        }, {
            title: "fas fa-strikethrough",
            searchTerms: [ "cancel", "edit", "font", "format", "text", "type" ]
        }, {
            title: "far fa-strikethrough",
            searchTerms: [ "cancel", "edit", "font", "format", "text", "type" ]
        }, {
            title: "fal fa-strikethrough",
            searchTerms: [ "cancel", "edit", "font", "format", "text", "type" ]
        }, {
            title: "fab fa-stripe",
            searchTerms: []
        }, {
            title: "fab fa-stripe-s",
            searchTerms: []
        }, {
            title: "fas fa-stroopwafel",
            searchTerms: [ "caramel", "cookie", "dessert", "sweets", "waffle" ]
        }, {
            title: "far fa-stroopwafel",
            searchTerms: [ "caramel", "cookie", "dessert", "sweets", "waffle" ]
        }, {
            title: "fal fa-stroopwafel",
            searchTerms: [ "caramel", "cookie", "dessert", "sweets", "waffle" ]
        }, {
            title: "fab fa-studiovinari",
            searchTerms: []
        }, {
            title: "fab fa-stumbleupon",
            searchTerms: []
        }, {
            title: "fab fa-stumbleupon-circle",
            searchTerms: []
        }, {
            title: "fas fa-subscript",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "far fa-subscript",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "fal fa-subscript",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "fas fa-subway",
            searchTerms: [ "machine", "railway", "train", "transportation", "vehicle" ]
        }, {
            title: "far fa-subway",
            searchTerms: [ "machine", "railway", "train", "transportation", "vehicle" ]
        }, {
            title: "fal fa-subway",
            searchTerms: [ "machine", "railway", "train", "transportation", "vehicle" ]
        }, {
            title: "fas fa-suitcase",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "far fa-suitcase",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "fal fa-suitcase",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "fas fa-suitcase-rolling",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "far fa-suitcase-rolling",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "fal fa-suitcase-rolling",
            searchTerms: [ "baggage", "luggage", "move", "suitcase", "travel", "trip" ]
        }, {
            title: "fas fa-sun",
            searchTerms: [ "brighten", "contrast", "day", "lighter", "sol", "solar", "star", "weather" ]
        }, {
            title: "far fa-sun",
            searchTerms: [ "brighten", "contrast", "day", "lighter", "sol", "solar", "star", "weather" ]
        }, {
            title: "fal fa-sun",
            searchTerms: [ "brighten", "contrast", "day", "lighter", "sol", "solar", "star", "weather" ]
        }, {
            title: "fas fa-sun-cloud",
            searchTerms: [ "cloud", "day", "lighter", "sol", "solar", "star", "weather" ]
        }, {
            title: "far fa-sun-cloud",
            searchTerms: [ "cloud", "day", "lighter", "sol", "solar", "star", "weather" ]
        }, {
            title: "fal fa-sun-cloud",
            searchTerms: [ "cloud", "day", "lighter", "sol", "solar", "star", "weather" ]
        }, {
            title: "fas fa-sun-dust",
            searchTerms: [ "day", "dry", "haze", "heat" ]
        }, {
            title: "far fa-sun-dust",
            searchTerms: [ "day", "dry", "haze", "heat" ]
        }, {
            title: "fal fa-sun-dust",
            searchTerms: [ "day", "dry", "haze", "heat" ]
        }, {
            title: "fas fa-sun-haze",
            searchTerms: [ "fog", "heat", "hot", "sweltering" ]
        }, {
            title: "far fa-sun-haze",
            searchTerms: [ "fog", "heat", "hot", "sweltering" ]
        }, {
            title: "fal fa-sun-haze",
            searchTerms: [ "fog", "heat", "hot", "sweltering" ]
        }, {
            title: "fas fa-sunglasses",
            searchTerms: [ "bright", "cool", "mib", "shades" ]
        }, {
            title: "far fa-sunglasses",
            searchTerms: [ "bright", "cool", "mib", "shades" ]
        }, {
            title: "fal fa-sunglasses",
            searchTerms: [ "bright", "cool", "mib", "shades" ]
        }, {
            title: "fas fa-sunrise",
            searchTerms: [ "dawn", "day", "daybreak", "daylight", "daytime", "morning", "sun up" ]
        }, {
            title: "far fa-sunrise",
            searchTerms: [ "dawn", "day", "daybreak", "daylight", "daytime", "morning", "sun up" ]
        }, {
            title: "fal fa-sunrise",
            searchTerms: [ "dawn", "day", "daybreak", "daylight", "daytime", "morning", "sun up" ]
        }, {
            title: "fas fa-sunset",
            searchTerms: [ "dusk", "night", "nighttime", "sun down" ]
        }, {
            title: "far fa-sunset",
            searchTerms: [ "dusk", "night", "nighttime", "sun down" ]
        }, {
            title: "fal fa-sunset",
            searchTerms: [ "dusk", "night", "nighttime", "sun down" ]
        }, {
            title: "fab fa-superpowers",
            searchTerms: []
        }, {
            title: "fas fa-superscript",
            searchTerms: [ "edit", "exponential", "font", "format", "text", "type" ]
        }, {
            title: "far fa-superscript",
            searchTerms: [ "edit", "exponential", "font", "format", "text", "type" ]
        }, {
            title: "fal fa-superscript",
            searchTerms: [ "edit", "exponential", "font", "format", "text", "type" ]
        }, {
            title: "fab fa-supple",
            searchTerms: []
        }, {
            title: "fas fa-surprise",
            searchTerms: [ "emoticon", "face", "shocked" ]
        }, {
            title: "far fa-surprise",
            searchTerms: [ "emoticon", "face", "shocked" ]
        }, {
            title: "fal fa-surprise",
            searchTerms: [ "emoticon", "face", "shocked" ]
        }, {
            title: "fab fa-suse",
            searchTerms: [ "linux", "operating system", "os" ]
        }, {
            title: "fas fa-swatchbook",
            searchTerms: [ "Pantone", "color", "design", "hue", "palette" ]
        }, {
            title: "far fa-swatchbook",
            searchTerms: [ "Pantone", "color", "design", "hue", "palette" ]
        }, {
            title: "fal fa-swatchbook",
            searchTerms: [ "Pantone", "color", "design", "hue", "palette" ]
        }, {
            title: "fab fa-swift",
            searchTerms: []
        }, {
            title: "fas fa-swimmer",
            searchTerms: [ "athlete", "head", "man", "olympics", "person", "pool", "water" ]
        }, {
            title: "far fa-swimmer",
            searchTerms: [ "athlete", "head", "man", "olympics", "person", "pool", "water" ]
        }, {
            title: "fal fa-swimmer",
            searchTerms: [ "athlete", "head", "man", "olympics", "person", "pool", "water" ]
        }, {
            title: "fas fa-swimming-pool",
            searchTerms: [ "ladder", "recreation", "swim", "water" ]
        }, {
            title: "far fa-swimming-pool",
            searchTerms: [ "ladder", "recreation", "swim", "water" ]
        }, {
            title: "fal fa-swimming-pool",
            searchTerms: [ "ladder", "recreation", "swim", "water" ]
        }, {
            title: "fas fa-sword",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "fight", "sharp", "weapon" ]
        }, {
            title: "far fa-sword",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "fight", "sharp", "weapon" ]
        }, {
            title: "fal fa-sword",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "fight", "sharp", "weapon" ]
        }, {
            title: "fas fa-sword-laser",
            searchTerms: [ "jedi", "lightsaber", "luke skywalker", "rebel", "star wars" ]
        }, {
            title: "far fa-sword-laser",
            searchTerms: [ "jedi", "lightsaber", "luke skywalker", "rebel", "star wars" ]
        }, {
            title: "fal fa-sword-laser",
            searchTerms: [ "jedi", "lightsaber", "luke skywalker", "rebel", "star wars" ]
        }, {
            title: "fas fa-sword-laser-alt",
            searchTerms: [ "darth vader", "empire", "lightsaber", "sith", "star wars" ]
        }, {
            title: "far fa-sword-laser-alt",
            searchTerms: [ "darth vader", "empire", "lightsaber", "sith", "star wars" ]
        }, {
            title: "fal fa-sword-laser-alt",
            searchTerms: [ "darth vader", "empire", "lightsaber", "sith", "star wars" ]
        }, {
            title: "fas fa-swords",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "fight", "sharp", "weapon" ]
        }, {
            title: "far fa-swords",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "fight", "sharp", "weapon" ]
        }, {
            title: "fal fa-swords",
            searchTerms: [ "Dungeons & Dragons", "blade", "d&d", "dnd", "fantasy", "fight", "sharp", "weapon" ]
        }, {
            title: "fas fa-swords-laser",
            searchTerms: [ "clash", "darth vader", "duel", "fight", "jedi", "lightsaber", "luke skywalker", "rebel", "sith", "star wars" ]
        }, {
            title: "far fa-swords-laser",
            searchTerms: [ "clash", "darth vader", "duel", "fight", "jedi", "lightsaber", "luke skywalker", "rebel", "sith", "star wars" ]
        }, {
            title: "fal fa-swords-laser",
            searchTerms: [ "clash", "darth vader", "duel", "fight", "jedi", "lightsaber", "luke skywalker", "rebel", "sith", "star wars" ]
        }, {
            title: "fab fa-symfony",
            searchTerms: []
        }, {
            title: "fas fa-synagogue",
            searchTerms: [ "building", "jewish", "judaism", "religion", "star of david", "temple" ]
        }, {
            title: "far fa-synagogue",
            searchTerms: [ "building", "jewish", "judaism", "religion", "star of david", "temple" ]
        }, {
            title: "fal fa-synagogue",
            searchTerms: [ "building", "jewish", "judaism", "religion", "star of david", "temple" ]
        }, {
            title: "fas fa-sync",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "far fa-sync",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "fal fa-sync",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "fas fa-sync-alt",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "far fa-sync-alt",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "fal fa-sync-alt",
            searchTerms: [ "exchange", "refresh", "reload", "rotate", "swap" ]
        }, {
            title: "fas fa-syringe",
            searchTerms: [ "doctor", "immunizations", "medical", "needle" ]
        }, {
            title: "far fa-syringe",
            searchTerms: [ "doctor", "immunizations", "medical", "needle" ]
        }, {
            title: "fal fa-syringe",
            searchTerms: [ "doctor", "immunizations", "medical", "needle" ]
        }, {
            title: "fas fa-table",
            searchTerms: [ "data", "excel", "spreadsheet" ]
        }, {
            title: "far fa-table",
            searchTerms: [ "data", "excel", "spreadsheet" ]
        }, {
            title: "fal fa-table",
            searchTerms: [ "data", "excel", "spreadsheet" ]
        }, {
            title: "fas fa-table-tennis",
            searchTerms: [ "ball", "paddle", "ping pong" ]
        }, {
            title: "far fa-table-tennis",
            searchTerms: [ "ball", "paddle", "ping pong" ]
        }, {
            title: "fal fa-table-tennis",
            searchTerms: [ "ball", "paddle", "ping pong" ]
        }, {
            title: "fas fa-tablet",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "far fa-tablet",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fal fa-tablet",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fas fa-tablet-alt",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "far fa-tablet-alt",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fal fa-tablet-alt",
            searchTerms: [ "apple", "device", "ipad", "kindle", "screen" ]
        }, {
            title: "fas fa-tablet-android",
            searchTerms: [ "device", "kindle", "screen" ]
        }, {
            title: "far fa-tablet-android",
            searchTerms: [ "device", "kindle", "screen" ]
        }, {
            title: "fal fa-tablet-android",
            searchTerms: [ "device", "kindle", "screen" ]
        }, {
            title: "fas fa-tablet-android-alt",
            searchTerms: [ "device", "kindle", "screen" ]
        }, {
            title: "far fa-tablet-android-alt",
            searchTerms: [ "device", "kindle", "screen" ]
        }, {
            title: "fal fa-tablet-android-alt",
            searchTerms: [ "device", "kindle", "screen" ]
        }, {
            title: "fas fa-tablet-rugged",
            searchTerms: [ "device", "durable", "protection", "screen", "tough" ]
        }, {
            title: "far fa-tablet-rugged",
            searchTerms: [ "device", "durable", "protection", "screen", "tough" ]
        }, {
            title: "fal fa-tablet-rugged",
            searchTerms: [ "device", "durable", "protection", "screen", "tough" ]
        }, {
            title: "fas fa-tablets",
            searchTerms: [ "drugs", "medicine", "pills", "prescription" ]
        }, {
            title: "far fa-tablets",
            searchTerms: [ "drugs", "medicine", "pills", "prescription" ]
        }, {
            title: "fal fa-tablets",
            searchTerms: [ "drugs", "medicine", "pills", "prescription" ]
        }, {
            title: "fas fa-tachometer",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-alt",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-alt",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-alt",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-alt-average",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-alt-average",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-alt-average",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-alt-fast",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-alt-fast",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-alt-fast",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-alt-fastest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-alt-fastest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-alt-fastest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-alt-slow",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-alt-slow",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-alt-slow",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-alt-slowest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-alt-slowest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-alt-slowest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-average",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-average",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-average",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-fast",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-fast",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-fast",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-fastest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-fastest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-fastest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-slow",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-slow",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-slow",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-tachometer-slowest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "far fa-tachometer-slowest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fal fa-tachometer-slowest",
            searchTerms: [ "dashboard", "fast", "odometer", "speed", "speedometer" ]
        }, {
            title: "fas fa-taco",
            searchTerms: [ "corn", "maize", "mexican", "salsa", "tortilla" ]
        }, {
            title: "far fa-taco",
            searchTerms: [ "corn", "maize", "mexican", "salsa", "tortilla" ]
        }, {
            title: "fal fa-taco",
            searchTerms: [ "corn", "maize", "mexican", "salsa", "tortilla" ]
        }, {
            title: "fas fa-tag",
            searchTerms: [ "discount", "label", "price", "shopping" ]
        }, {
            title: "far fa-tag",
            searchTerms: [ "discount", "label", "price", "shopping" ]
        }, {
            title: "fal fa-tag",
            searchTerms: [ "discount", "label", "price", "shopping" ]
        }, {
            title: "fas fa-tags",
            searchTerms: [ "discount", "label", "price", "shopping" ]
        }, {
            title: "far fa-tags",
            searchTerms: [ "discount", "label", "price", "shopping" ]
        }, {
            title: "fal fa-tags",
            searchTerms: [ "discount", "label", "price", "shopping" ]
        }, {
            title: "fas fa-tally",
            searchTerms: [ "count", "hash", "numbers" ]
        }, {
            title: "far fa-tally",
            searchTerms: [ "count", "hash", "numbers" ]
        }, {
            title: "fal fa-tally",
            searchTerms: [ "count", "hash", "numbers" ]
        }, {
            title: "fas fa-tanakh",
            searchTerms: [ "book", "jewish", "judaism", "religion" ]
        }, {
            title: "far fa-tanakh",
            searchTerms: [ "book", "jewish", "judaism", "religion" ]
        }, {
            title: "fal fa-tanakh",
            searchTerms: [ "book", "jewish", "judaism", "religion" ]
        }, {
            title: "fas fa-tape",
            searchTerms: [ "design", "package", "sticky" ]
        }, {
            title: "far fa-tape",
            searchTerms: [ "design", "package", "sticky" ]
        }, {
            title: "fal fa-tape",
            searchTerms: [ "design", "package", "sticky" ]
        }, {
            title: "fas fa-tasks",
            searchTerms: [ "checklist", "downloading", "downloads", "loading", "progress", "project management", "settings", "to do" ]
        }, {
            title: "far fa-tasks",
            searchTerms: [ "checklist", "downloading", "downloads", "loading", "progress", "project management", "settings", "to do" ]
        }, {
            title: "fal fa-tasks",
            searchTerms: [ "checklist", "downloading", "downloads", "loading", "progress", "project management", "settings", "to do" ]
        }, {
            title: "fas fa-tasks-alt",
            searchTerms: [ "checklist", "downloading", "downloads", "loading", "poll", "progress", "project management", "settings", "to do" ]
        }, {
            title: "far fa-tasks-alt",
            searchTerms: [ "checklist", "downloading", "downloads", "loading", "poll", "progress", "project management", "settings", "to do" ]
        }, {
            title: "fal fa-tasks-alt",
            searchTerms: [ "checklist", "downloading", "downloads", "loading", "poll", "progress", "project management", "settings", "to do" ]
        }, {
            title: "fas fa-taxi",
            searchTerms: [ "cab", "cabbie", "car", "car service", "lyft", "machine", "transportation", "travel", "uber", "vehicle" ]
        }, {
            title: "far fa-taxi",
            searchTerms: [ "cab", "cabbie", "car", "car service", "lyft", "machine", "transportation", "travel", "uber", "vehicle" ]
        }, {
            title: "fal fa-taxi",
            searchTerms: [ "cab", "cabbie", "car", "car service", "lyft", "machine", "transportation", "travel", "uber", "vehicle" ]
        }, {
            title: "fab fa-teamspeak",
            searchTerms: []
        }, {
            title: "fas fa-teeth",
            searchTerms: [ "bite", "dental", "dentist", "gums", "mouth", "smile", "tooth" ]
        }, {
            title: "far fa-teeth",
            searchTerms: [ "bite", "dental", "dentist", "gums", "mouth", "smile", "tooth" ]
        }, {
            title: "fal fa-teeth",
            searchTerms: [ "bite", "dental", "dentist", "gums", "mouth", "smile", "tooth" ]
        }, {
            title: "fas fa-teeth-open",
            searchTerms: [ "dental", "dentist", "gums bite", "mouth", "smile", "tooth" ]
        }, {
            title: "far fa-teeth-open",
            searchTerms: [ "dental", "dentist", "gums bite", "mouth", "smile", "tooth" ]
        }, {
            title: "fal fa-teeth-open",
            searchTerms: [ "dental", "dentist", "gums bite", "mouth", "smile", "tooth" ]
        }, {
            title: "fab fa-telegram",
            searchTerms: []
        }, {
            title: "fab fa-telegram-plane",
            searchTerms: []
        }, {
            title: "fas fa-telescope",
            searchTerms: [ "astronomy", "lens", "look", "microscope", "observatory", "scope", "search", "space", "view" ]
        }, {
            title: "far fa-telescope",
            searchTerms: [ "astronomy", "lens", "look", "microscope", "observatory", "scope", "search", "space", "view" ]
        }, {
            title: "fal fa-telescope",
            searchTerms: [ "astronomy", "lens", "look", "microscope", "observatory", "scope", "search", "space", "view" ]
        }, {
            title: "fas fa-temperature-down",
            searchTerms: [ "air conditioner", "cold", "heater", "mercury", "thermometer", "winter" ]
        }, {
            title: "far fa-temperature-down",
            searchTerms: [ "air conditioner", "cold", "heater", "mercury", "thermometer", "winter" ]
        }, {
            title: "fal fa-temperature-down",
            searchTerms: [ "air conditioner", "cold", "heater", "mercury", "thermometer", "winter" ]
        }, {
            title: "fas fa-temperature-frigid",
            searchTerms: [ "cold", "mercury", "thermometer", "winter" ]
        }, {
            title: "far fa-temperature-frigid",
            searchTerms: [ "cold", "mercury", "thermometer", "winter" ]
        }, {
            title: "fal fa-temperature-frigid",
            searchTerms: [ "cold", "mercury", "thermometer", "winter" ]
        }, {
            title: "fas fa-temperature-high",
            searchTerms: [ "cook", "mercury", "summer", "thermometer", "warm" ]
        }, {
            title: "far fa-temperature-high",
            searchTerms: [ "cook", "mercury", "summer", "thermometer", "warm" ]
        }, {
            title: "fal fa-temperature-high",
            searchTerms: [ "cook", "mercury", "summer", "thermometer", "warm" ]
        }, {
            title: "fas fa-temperature-hot",
            searchTerms: [ "heat", "mercury", "summer", "thermometer" ]
        }, {
            title: "far fa-temperature-hot",
            searchTerms: [ "heat", "mercury", "summer", "thermometer" ]
        }, {
            title: "fal fa-temperature-hot",
            searchTerms: [ "heat", "mercury", "summer", "thermometer" ]
        }, {
            title: "fas fa-temperature-low",
            searchTerms: [ "cold", "cool", "mercury", "thermometer", "winter" ]
        }, {
            title: "far fa-temperature-low",
            searchTerms: [ "cold", "cool", "mercury", "thermometer", "winter" ]
        }, {
            title: "fal fa-temperature-low",
            searchTerms: [ "cold", "cool", "mercury", "thermometer", "winter" ]
        }, {
            title: "fas fa-temperature-up",
            searchTerms: [ "air conditioner", "cold", "heater", "mercury", "thermometer", "winter" ]
        }, {
            title: "far fa-temperature-up",
            searchTerms: [ "air conditioner", "cold", "heater", "mercury", "thermometer", "winter" ]
        }, {
            title: "fal fa-temperature-up",
            searchTerms: [ "air conditioner", "cold", "heater", "mercury", "thermometer", "winter" ]
        }, {
            title: "fab fa-tencent-weibo",
            searchTerms: []
        }, {
            title: "fas fa-tenge",
            searchTerms: [ "currency", "kazakhstan", "money", "price" ]
        }, {
            title: "far fa-tenge",
            searchTerms: [ "currency", "kazakhstan", "money", "price" ]
        }, {
            title: "fal fa-tenge",
            searchTerms: [ "currency", "kazakhstan", "money", "price" ]
        }, {
            title: "fas fa-tennis-ball",
            searchTerms: [ "racket", "sport", "tennis", "us open" ]
        }, {
            title: "far fa-tennis-ball",
            searchTerms: [ "racket", "sport", "tennis", "us open" ]
        }, {
            title: "fal fa-tennis-ball",
            searchTerms: [ "racket", "sport", "tennis", "us open" ]
        }, {
            title: "fas fa-terminal",
            searchTerms: [ "code", "command", "console", "development", "prompt" ]
        }, {
            title: "far fa-terminal",
            searchTerms: [ "code", "command", "console", "development", "prompt" ]
        }, {
            title: "fal fa-terminal",
            searchTerms: [ "code", "command", "console", "development", "prompt" ]
        }, {
            title: "fas fa-text",
            searchTerms: [ "font", "format", "letter", "style", "typography" ]
        }, {
            title: "far fa-text",
            searchTerms: [ "font", "format", "letter", "style", "typography" ]
        }, {
            title: "fal fa-text",
            searchTerms: [ "font", "format", "letter", "style", "typography" ]
        }, {
            title: "fas fa-text-height",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "far fa-text-height",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "fal fa-text-height",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "fas fa-text-size",
            searchTerms: [ "decrease", "edit", "font", "format", "increase", "text", "type" ]
        }, {
            title: "far fa-text-size",
            searchTerms: [ "decrease", "edit", "font", "format", "increase", "text", "type" ]
        }, {
            title: "fal fa-text-size",
            searchTerms: [ "decrease", "edit", "font", "format", "increase", "text", "type" ]
        }, {
            title: "fas fa-text-width",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "far fa-text-width",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "fal fa-text-width",
            searchTerms: [ "edit", "font", "format", "text", "type" ]
        }, {
            title: "fas fa-th",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "far fa-th",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fal fa-th",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fas fa-th-large",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "far fa-th-large",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fal fa-th-large",
            searchTerms: [ "blocks", "boxes", "grid", "squares" ]
        }, {
            title: "fas fa-th-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "far fa-th-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fal fa-th-list",
            searchTerms: [ "checklist", "completed", "done", "finished", "ol", "todo", "ul" ]
        }, {
            title: "fab fa-the-red-yeti",
            searchTerms: []
        }, {
            title: "fas fa-theater-masks",
            searchTerms: [ "comedy", "perform", "theatre", "tragedy" ]
        }, {
            title: "far fa-theater-masks",
            searchTerms: [ "comedy", "perform", "theatre", "tragedy" ]
        }, {
            title: "fal fa-theater-masks",
            searchTerms: [ "comedy", "perform", "theatre", "tragedy" ]
        }, {
            title: "fab fa-themeco",
            searchTerms: []
        }, {
            title: "fab fa-themeisle",
            searchTerms: []
        }, {
            title: "fas fa-thermometer",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "far fa-thermometer",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fas fa-thermometer-empty",
            searchTerms: [ "cold", "mercury", "status", "temperature" ]
        }, {
            title: "far fa-thermometer-empty",
            searchTerms: [ "cold", "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer-empty",
            searchTerms: [ "cold", "mercury", "status", "temperature" ]
        }, {
            title: "fas fa-thermometer-full",
            searchTerms: [ "fever", "hot", "mercury", "status", "temperature" ]
        }, {
            title: "far fa-thermometer-full",
            searchTerms: [ "fever", "hot", "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer-full",
            searchTerms: [ "fever", "hot", "mercury", "status", "temperature" ]
        }, {
            title: "fas fa-thermometer-half",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "far fa-thermometer-half",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer-half",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fas fa-thermometer-quarter",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "far fa-thermometer-quarter",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer-quarter",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fas fa-thermometer-three-quarters",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "far fa-thermometer-three-quarters",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fal fa-thermometer-three-quarters",
            searchTerms: [ "mercury", "status", "temperature" ]
        }, {
            title: "fas fa-theta",
            searchTerms: [ "alphabet", "greek", "math" ]
        }, {
            title: "far fa-theta",
            searchTerms: [ "alphabet", "greek", "math" ]
        }, {
            title: "fal fa-theta",
            searchTerms: [ "alphabet", "greek", "math" ]
        }, {
            title: "fab fa-think-peaks",
            searchTerms: []
        }, {
            title: "fas fa-thumbs-down",
            searchTerms: [ "disagree", "disapprove", "dislike", "hand", "social", "thumbs-o-down" ]
        }, {
            title: "far fa-thumbs-down",
            searchTerms: [ "disagree", "disapprove", "dislike", "hand", "social", "thumbs-o-down" ]
        }, {
            title: "fal fa-thumbs-down",
            searchTerms: [ "disagree", "disapprove", "dislike", "hand", "social", "thumbs-o-down" ]
        }, {
            title: "fas fa-thumbs-up",
            searchTerms: [ "agree", "approve", "favorite", "hand", "like", "ok", "okay", "social", "success", "thumbs-o-up", "yes", "you got it dude" ]
        }, {
            title: "far fa-thumbs-up",
            searchTerms: [ "agree", "approve", "favorite", "hand", "like", "ok", "okay", "social", "success", "thumbs-o-up", "yes", "you got it dude" ]
        }, {
            title: "fal fa-thumbs-up",
            searchTerms: [ "agree", "approve", "favorite", "hand", "like", "ok", "okay", "social", "success", "thumbs-o-up", "yes", "you got it dude" ]
        }, {
            title: "fas fa-thumbtack",
            searchTerms: [ "coordinates", "location", "marker", "pin", "thumb-tack" ]
        }, {
            title: "far fa-thumbtack",
            searchTerms: [ "coordinates", "location", "marker", "pin", "thumb-tack" ]
        }, {
            title: "fal fa-thumbtack",
            searchTerms: [ "coordinates", "location", "marker", "pin", "thumb-tack" ]
        }, {
            title: "fas fa-thunderstorm",
            searchTerms: [ "bolt", "lightning", "precipitation", "rain", "storm", "weather" ]
        }, {
            title: "far fa-thunderstorm",
            searchTerms: [ "bolt", "lightning", "precipitation", "rain", "storm", "weather" ]
        }, {
            title: "fal fa-thunderstorm",
            searchTerms: [ "bolt", "lightning", "precipitation", "rain", "storm", "weather" ]
        }, {
            title: "fas fa-thunderstorm-moon",
            searchTerms: [ "bolt", "lightning", "lunar", "moon", "precipitation", "rain", "storm", "weather" ]
        }, {
            title: "far fa-thunderstorm-moon",
            searchTerms: [ "bolt", "lightning", "lunar", "moon", "precipitation", "rain", "storm", "weather" ]
        }, {
            title: "fal fa-thunderstorm-moon",
            searchTerms: [ "bolt", "lightning", "lunar", "moon", "precipitation", "rain", "storm", "weather" ]
        }, {
            title: "fas fa-thunderstorm-sun",
            searchTerms: [ "bolt", "lightning", "precipitation", "rain", "solar", "storm", "sun", "weather" ]
        }, {
            title: "far fa-thunderstorm-sun",
            searchTerms: [ "bolt", "lightning", "precipitation", "rain", "solar", "storm", "sun", "weather" ]
        }, {
            title: "fal fa-thunderstorm-sun",
            searchTerms: [ "bolt", "lightning", "precipitation", "rain", "solar", "storm", "sun", "weather" ]
        }, {
            title: "fas fa-ticket",
            searchTerms: [ "movie", "pass", "support", "ticket" ]
        }, {
            title: "far fa-ticket",
            searchTerms: [ "movie", "pass", "support", "ticket" ]
        }, {
            title: "fal fa-ticket",
            searchTerms: [ "movie", "pass", "support", "ticket" ]
        }, {
            title: "fas fa-ticket-alt",
            searchTerms: [ "movie", "pass", "support", "ticket" ]
        }, {
            title: "far fa-ticket-alt",
            searchTerms: [ "movie", "pass", "support", "ticket" ]
        }, {
            title: "fal fa-ticket-alt",
            searchTerms: [ "movie", "pass", "support", "ticket" ]
        }, {
            title: "fas fa-tilde",
            searchTerms: [ "accent", "symbol", "text", "type" ]
        }, {
            title: "far fa-tilde",
            searchTerms: [ "accent", "symbol", "text", "type" ]
        }, {
            title: "fal fa-tilde",
            searchTerms: [ "accent", "symbol", "text", "type" ]
        }, {
            title: "fas fa-times",
            searchTerms: [ "close", "cross", "error", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "far fa-times",
            searchTerms: [ "close", "cross", "error", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times",
            searchTerms: [ "close", "cross", "error", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fas fa-times-circle",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "far fa-times-circle",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times-circle",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fas fa-times-hexagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "far fa-times-hexagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times-hexagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fas fa-times-octagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "far fa-times-octagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fal fa-times-octagon",
            searchTerms: [ "close", "cross", "exit", "incorrect", "notice", "notification", "notify", "problem", "wrong", "x" ]
        }, {
            title: "fas fa-times-square",
            searchTerms: [ "close", "cross", "incorrect", "notice", "notification", "notify", "problem", "window", "wrong" ]
        }, {
            title: "far fa-times-square",
            searchTerms: [ "close", "cross", "incorrect", "notice", "notification", "notify", "problem", "window", "wrong" ]
        }, {
            title: "fal fa-times-square",
            searchTerms: [ "close", "cross", "incorrect", "notice", "notification", "notify", "problem", "window", "wrong" ]
        }, {
            title: "fas fa-tint",
            searchTerms: [ "color", "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "far fa-tint",
            searchTerms: [ "color", "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "fal fa-tint",
            searchTerms: [ "color", "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "fas fa-tint-slash",
            searchTerms: [ "color", "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "far fa-tint-slash",
            searchTerms: [ "color", "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "fal fa-tint-slash",
            searchTerms: [ "color", "drop", "droplet", "raindrop", "waterdrop" ]
        }, {
            title: "fas fa-tire",
            searchTerms: [ "auto", "car", "rim", "rubber", "wheel" ]
        }, {
            title: "far fa-tire",
            searchTerms: [ "auto", "car", "rim", "rubber", "wheel" ]
        }, {
            title: "fal fa-tire",
            searchTerms: [ "auto", "car", "rim", "rubber", "wheel" ]
        }, {
            title: "fas fa-tire-flat",
            searchTerms: [ "auto", "car", "rim", "rubber", "wheel" ]
        }, {
            title: "far fa-tire-flat",
            searchTerms: [ "auto", "car", "rim", "rubber", "wheel" ]
        }, {
            title: "fal fa-tire-flat",
            searchTerms: [ "auto", "car", "rim", "rubber", "wheel" ]
        }, {
            title: "fas fa-tire-pressure-warning",
            searchTerms: [ "alert", "auto", "car", "flat", "rim", "rubber", "wheel" ]
        }, {
            title: "far fa-tire-pressure-warning",
            searchTerms: [ "alert", "auto", "car", "flat", "rim", "rubber", "wheel" ]
        }, {
            title: "fal fa-tire-pressure-warning",
            searchTerms: [ "alert", "auto", "car", "flat", "rim", "rubber", "wheel" ]
        }, {
            title: "fas fa-tire-rugged",
            searchTerms: [ "auto", "car", "offroad", "rim", "rubber", "wheel" ]
        }, {
            title: "far fa-tire-rugged",
            searchTerms: [ "auto", "car", "offroad", "rim", "rubber", "wheel" ]
        }, {
            title: "fal fa-tire-rugged",
            searchTerms: [ "auto", "car", "offroad", "rim", "rubber", "wheel" ]
        }, {
            title: "fas fa-tired",
            searchTerms: [ "angry", "emoticon", "face", "grumpy", "upset" ]
        }, {
            title: "far fa-tired",
            searchTerms: [ "angry", "emoticon", "face", "grumpy", "upset" ]
        }, {
            title: "fal fa-tired",
            searchTerms: [ "angry", "emoticon", "face", "grumpy", "upset" ]
        }, {
            title: "fas fa-toggle-off",
            searchTerms: [ "switch" ]
        }, {
            title: "far fa-toggle-off",
            searchTerms: [ "switch" ]
        }, {
            title: "fal fa-toggle-off",
            searchTerms: [ "switch" ]
        }, {
            title: "fas fa-toggle-on",
            searchTerms: [ "switch" ]
        }, {
            title: "far fa-toggle-on",
            searchTerms: [ "switch" ]
        }, {
            title: "fal fa-toggle-on",
            searchTerms: [ "switch" ]
        }, {
            title: "fas fa-toilet",
            searchTerms: [ "bathroom", "flush", "john", "loo", "pee", "plumbing", "poop", "porcelain", "potty", "restroom", "throne", "washroom", "waste", "wc" ]
        }, {
            title: "far fa-toilet",
            searchTerms: [ "bathroom", "flush", "john", "loo", "pee", "plumbing", "poop", "porcelain", "potty", "restroom", "throne", "washroom", "waste", "wc" ]
        }, {
            title: "fal fa-toilet",
            searchTerms: [ "bathroom", "flush", "john", "loo", "pee", "plumbing", "poop", "porcelain", "potty", "restroom", "throne", "washroom", "waste", "wc" ]
        }, {
            title: "fas fa-toilet-paper",
            searchTerms: [ "bathroom", "halloween", "holiday", "lavatory", "prank", "restroom", "roll" ]
        }, {
            title: "far fa-toilet-paper",
            searchTerms: [ "bathroom", "halloween", "holiday", "lavatory", "prank", "restroom", "roll" ]
        }, {
            title: "fal fa-toilet-paper",
            searchTerms: [ "bathroom", "halloween", "holiday", "lavatory", "prank", "restroom", "roll" ]
        }, {
            title: "fas fa-toilet-paper-alt",
            searchTerms: [ "bathroom", "halloween", "holiday", "lavatory", "prank", "restroom", "roll" ]
        }, {
            title: "far fa-toilet-paper-alt",
            searchTerms: [ "bathroom", "halloween", "holiday", "lavatory", "prank", "restroom", "roll" ]
        }, {
            title: "fal fa-toilet-paper-alt",
            searchTerms: [ "bathroom", "halloween", "holiday", "lavatory", "prank", "restroom", "roll" ]
        }, {
            title: "fas fa-tombstone",
            searchTerms: [ "cemetery", "cross", "dead", "death", "delete", "grave", "halloween", "holiday", "remove" ]
        }, {
            title: "far fa-tombstone",
            searchTerms: [ "cemetery", "cross", "dead", "death", "delete", "grave", "halloween", "holiday", "remove" ]
        }, {
            title: "fal fa-tombstone",
            searchTerms: [ "cemetery", "cross", "dead", "death", "delete", "grave", "halloween", "holiday", "remove" ]
        }, {
            title: "fas fa-tombstone-alt",
            searchTerms: [ "cemetery", "cross", "dead", "death", "delete", "grave", "halloween", "holiday", "remove" ]
        }, {
            title: "far fa-tombstone-alt",
            searchTerms: [ "cemetery", "cross", "dead", "death", "delete", "grave", "halloween", "holiday", "remove" ]
        }, {
            title: "fal fa-tombstone-alt",
            searchTerms: [ "cemetery", "cross", "dead", "death", "delete", "grave", "halloween", "holiday", "remove" ]
        }, {
            title: "fas fa-toolbox",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tools" ]
        }, {
            title: "far fa-toolbox",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tools" ]
        }, {
            title: "fal fa-toolbox",
            searchTerms: [ "admin", "container", "fix", "repair", "settings", "tools" ]
        }, {
            title: "fas fa-tools",
            searchTerms: [ "admin", "fix", "repair", "screwdriver", "settings", "tools", "wrench" ]
        }, {
            title: "far fa-tools",
            searchTerms: [ "admin", "fix", "repair", "screwdriver", "settings", "tools", "wrench" ]
        }, {
            title: "fal fa-tools",
            searchTerms: [ "admin", "fix", "repair", "screwdriver", "settings", "tools", "wrench" ]
        }, {
            title: "fas fa-tooth",
            searchTerms: [ "bicuspid", "dental", "dentist", "molar", "mouth", "teeth" ]
        }, {
            title: "far fa-tooth",
            searchTerms: [ "bicuspid", "dental", "dentist", "molar", "mouth", "teeth" ]
        }, {
            title: "fal fa-tooth",
            searchTerms: [ "bicuspid", "dental", "dentist", "molar", "mouth", "teeth" ]
        }, {
            title: "fas fa-toothbrush",
            searchTerms: [ "bicuspid", "dental", "dentist", "molar", "mouth", "teeth" ]
        }, {
            title: "far fa-toothbrush",
            searchTerms: [ "bicuspid", "dental", "dentist", "molar", "mouth", "teeth" ]
        }, {
            title: "fal fa-toothbrush",
            searchTerms: [ "bicuspid", "dental", "dentist", "molar", "mouth", "teeth" ]
        }, {
            title: "fas fa-torah",
            searchTerms: [ "book", "jewish", "judaism", "religion", "scroll" ]
        }, {
            title: "far fa-torah",
            searchTerms: [ "book", "jewish", "judaism", "religion", "scroll" ]
        }, {
            title: "fal fa-torah",
            searchTerms: [ "book", "jewish", "judaism", "religion", "scroll" ]
        }, {
            title: "fas fa-torii-gate",
            searchTerms: [ "building", "shintoism" ]
        }, {
            title: "far fa-torii-gate",
            searchTerms: [ "building", "shintoism" ]
        }, {
            title: "fal fa-torii-gate",
            searchTerms: [ "building", "shintoism" ]
        }, {
            title: "fas fa-tornado",
            searchTerms: [ "cyclone", "dorothy", "landspout", "toto", "twister", "vortext", "waterspout", "weather", "whirlwind" ]
        }, {
            title: "far fa-tornado",
            searchTerms: [ "cyclone", "dorothy", "landspout", "toto", "twister", "vortext", "waterspout", "weather", "whirlwind" ]
        }, {
            title: "fal fa-tornado",
            searchTerms: [ "cyclone", "dorothy", "landspout", "toto", "twister", "vortext", "waterspout", "weather", "whirlwind" ]
        }, {
            title: "fas fa-tractor",
            searchTerms: [ "agriculture", "farm", "vehicle" ]
        }, {
            title: "far fa-tractor",
            searchTerms: [ "agriculture", "farm", "vehicle" ]
        }, {
            title: "fal fa-tractor",
            searchTerms: [ "agriculture", "farm", "vehicle" ]
        }, {
            title: "fab fa-trade-federation",
            searchTerms: []
        }, {
            title: "fas fa-trademark",
            searchTerms: [ "copyright", "register", "symbol" ]
        }, {
            title: "far fa-trademark",
            searchTerms: [ "copyright", "register", "symbol" ]
        }, {
            title: "fal fa-trademark",
            searchTerms: [ "copyright", "register", "symbol" ]
        }, {
            title: "fas fa-traffic-cone",
            searchTerms: [ "alert", "construction", "road" ]
        }, {
            title: "far fa-traffic-cone",
            searchTerms: [ "alert", "construction", "road" ]
        }, {
            title: "fal fa-traffic-cone",
            searchTerms: [ "alert", "construction", "road" ]
        }, {
            title: "fas fa-traffic-light",
            searchTerms: [ "direction", "road", "signal", "travel" ]
        }, {
            title: "far fa-traffic-light",
            searchTerms: [ "direction", "road", "signal", "travel" ]
        }, {
            title: "fal fa-traffic-light",
            searchTerms: [ "direction", "road", "signal", "travel" ]
        }, {
            title: "fas fa-traffic-light-go",
            searchTerms: [ "direction", "green", "road", "signal", "travel" ]
        }, {
            title: "far fa-traffic-light-go",
            searchTerms: [ "direction", "green", "road", "signal", "travel" ]
        }, {
            title: "fal fa-traffic-light-go",
            searchTerms: [ "direction", "green", "road", "signal", "travel" ]
        }, {
            title: "fas fa-traffic-light-slow",
            searchTerms: [ "direction", "road", "signal", "travel", "yellow" ]
        }, {
            title: "far fa-traffic-light-slow",
            searchTerms: [ "direction", "road", "signal", "travel", "yellow" ]
        }, {
            title: "fal fa-traffic-light-slow",
            searchTerms: [ "direction", "road", "signal", "travel", "yellow" ]
        }, {
            title: "fas fa-traffic-light-stop",
            searchTerms: [ "direction", "red", "road", "signal", "travel" ]
        }, {
            title: "far fa-traffic-light-stop",
            searchTerms: [ "direction", "red", "road", "signal", "travel" ]
        }, {
            title: "fal fa-traffic-light-stop",
            searchTerms: [ "direction", "red", "road", "signal", "travel" ]
        }, {
            title: "fas fa-trailer",
            searchTerms: [ "carry", "haul", "moving", "travel" ]
        }, {
            title: "far fa-trailer",
            searchTerms: [ "carry", "haul", "moving", "travel" ]
        }, {
            title: "fal fa-trailer",
            searchTerms: [ "carry", "haul", "moving", "travel" ]
        }, {
            title: "fas fa-train",
            searchTerms: [ "bullet", "commute", "locomotive", "railway", "subway" ]
        }, {
            title: "far fa-train",
            searchTerms: [ "bullet", "commute", "locomotive", "railway", "subway" ]
        }, {
            title: "fal fa-train",
            searchTerms: [ "bullet", "commute", "locomotive", "railway", "subway" ]
        }, {
            title: "fas fa-tram",
            searchTerms: [ "crossing", "machine", "mountains", "seasonal", "transportation" ]
        }, {
            title: "far fa-tram",
            searchTerms: [ "crossing", "machine", "mountains", "seasonal", "transportation" ]
        }, {
            title: "fal fa-tram",
            searchTerms: [ "crossing", "machine", "mountains", "seasonal", "transportation" ]
        }, {
            title: "fas fa-transgender",
            searchTerms: [ "intersex" ]
        }, {
            title: "far fa-transgender",
            searchTerms: [ "intersex" ]
        }, {
            title: "fal fa-transgender",
            searchTerms: [ "intersex" ]
        }, {
            title: "fas fa-transgender-alt",
            searchTerms: [ "intersex" ]
        }, {
            title: "far fa-transgender-alt",
            searchTerms: [ "intersex" ]
        }, {
            title: "fal fa-transgender-alt",
            searchTerms: [ "intersex" ]
        }, {
            title: "fas fa-transporter",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "far fa-transporter",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "fal fa-transporter",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "fas fa-transporter-1",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "far fa-transporter-1",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "fal fa-transporter-1",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "fas fa-transporter-2",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "far fa-transporter-2",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "fal fa-transporter-2",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "fas fa-transporter-3",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "far fa-transporter-3",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "fal fa-transporter-3",
            searchTerms: [ "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "fas fa-transporter-empty",
            searchTerms: [ "complete", "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "far fa-transporter-empty",
            searchTerms: [ "complete", "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "fal fa-transporter-empty",
            searchTerms: [ "complete", "move", "teleport", "transfer", "translocate", "travel" ]
        }, {
            title: "fas fa-trash",
            searchTerms: [ "delete", "garbage", "hide", "remove" ]
        }, {
            title: "far fa-trash",
            searchTerms: [ "delete", "garbage", "hide", "remove" ]
        }, {
            title: "fal fa-trash",
            searchTerms: [ "delete", "garbage", "hide", "remove" ]
        }, {
            title: "fas fa-trash-alt",
            searchTerms: [ "delete", "garbage", "hide", "remove", "trash-o" ]
        }, {
            title: "far fa-trash-alt",
            searchTerms: [ "delete", "garbage", "hide", "remove", "trash-o" ]
        }, {
            title: "fal fa-trash-alt",
            searchTerms: [ "delete", "garbage", "hide", "remove", "trash-o" ]
        }, {
            title: "fas fa-trash-restore",
            searchTerms: [ "back", "control z", "oops", "undo" ]
        }, {
            title: "far fa-trash-restore",
            searchTerms: [ "back", "control z", "oops", "undo" ]
        }, {
            title: "fal fa-trash-restore",
            searchTerms: [ "back", "control z", "oops", "undo" ]
        }, {
            title: "fas fa-trash-restore-alt",
            searchTerms: [ "back", "control z", "oops", "undo" ]
        }, {
            title: "far fa-trash-restore-alt",
            searchTerms: [ "back", "control z", "oops", "undo" ]
        }, {
            title: "fal fa-trash-restore-alt",
            searchTerms: [ "back", "control z", "oops", "undo" ]
        }, {
            title: "fas fa-trash-undo",
            searchTerms: [ "back", "control z", "oops", "restore" ]
        }, {
            title: "far fa-trash-undo",
            searchTerms: [ "back", "control z", "oops", "restore" ]
        }, {
            title: "fal fa-trash-undo",
            searchTerms: [ "back", "control z", "oops", "restore" ]
        }, {
            title: "fas fa-trash-undo-alt",
            searchTerms: [ "back", "control z", "oops", "restore" ]
        }, {
            title: "far fa-trash-undo-alt",
            searchTerms: [ "back", "control z", "oops", "restore" ]
        }, {
            title: "fal fa-trash-undo-alt",
            searchTerms: [ "back", "control z", "oops", "restore" ]
        }, {
            title: "fas fa-treasure-chest",
            searchTerms: [ "Dungeons & Dragons", "booty", "d&d", "dnd", "fantasy", "gold", "hidden", "loot", "reward", "trap" ]
        }, {
            title: "far fa-treasure-chest",
            searchTerms: [ "Dungeons & Dragons", "booty", "d&d", "dnd", "fantasy", "gold", "hidden", "loot", "reward", "trap" ]
        }, {
            title: "fal fa-treasure-chest",
            searchTerms: [ "Dungeons & Dragons", "booty", "d&d", "dnd", "fantasy", "gold", "hidden", "loot", "reward", "trap" ]
        }, {
            title: "fas fa-tree",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "far fa-tree",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-tree",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fas fa-tree-alt",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "far fa-tree-alt",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-tree-alt",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fas fa-tree-christmas",
            searchTerms: [ "christmas", "decorated", "decorations", "flora", "holiday", "lights", "plant", "star", "xmas" ]
        }, {
            title: "far fa-tree-christmas",
            searchTerms: [ "christmas", "decorated", "decorations", "flora", "holiday", "lights", "plant", "star", "xmas" ]
        }, {
            title: "fal fa-tree-christmas",
            searchTerms: [ "christmas", "decorated", "decorations", "flora", "holiday", "lights", "plant", "star", "xmas" ]
        }, {
            title: "fas fa-tree-decorated",
            searchTerms: [ "christmas", "decorations", "flora", "holiday", "lights", "plant", "xmas" ]
        }, {
            title: "far fa-tree-decorated",
            searchTerms: [ "christmas", "decorations", "flora", "holiday", "lights", "plant", "xmas" ]
        }, {
            title: "fal fa-tree-decorated",
            searchTerms: [ "christmas", "decorations", "flora", "holiday", "lights", "plant", "xmas" ]
        }, {
            title: "fas fa-tree-large",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "far fa-tree-large",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-tree-large",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fas fa-tree-palm",
            searchTerms: [ "coconut", "frond", "tropical" ]
        }, {
            title: "far fa-tree-palm",
            searchTerms: [ "coconut", "frond", "tropical" ]
        }, {
            title: "fal fa-tree-palm",
            searchTerms: [ "coconut", "frond", "tropical" ]
        }, {
            title: "fas fa-trees",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "far fa-trees",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fal fa-trees",
            searchTerms: [ "bark", "fall", "flora", "forest", "nature", "plant", "seasonal" ]
        }, {
            title: "fab fa-trello",
            searchTerms: [ "atlassian" ]
        }, {
            title: "fas fa-triangle",
            searchTerms: [ "pyramid", "shape" ]
        }, {
            title: "far fa-triangle",
            searchTerms: [ "pyramid", "shape" ]
        }, {
            title: "fal fa-triangle",
            searchTerms: [ "pyramid", "shape" ]
        }, {
            title: "fas fa-triangle-music",
            searchTerms: [ "ding", "idiophone", "instrument", "music", "percussion" ]
        }, {
            title: "far fa-triangle-music",
            searchTerms: [ "ding", "idiophone", "instrument", "music", "percussion" ]
        }, {
            title: "fal fa-triangle-music",
            searchTerms: [ "ding", "idiophone", "instrument", "music", "percussion" ]
        }, {
            title: "fab fa-tripadvisor",
            searchTerms: []
        }, {
            title: "fas fa-trophy",
            searchTerms: [ "achievement", "award", "cup", "game", "winner" ]
        }, {
            title: "far fa-trophy",
            searchTerms: [ "achievement", "award", "cup", "game", "winner" ]
        }, {
            title: "fal fa-trophy",
            searchTerms: [ "achievement", "award", "cup", "game", "winner" ]
        }, {
            title: "fas fa-trophy-alt",
            searchTerms: [ "achievement", "award", "cup", "game", "star", "winner" ]
        }, {
            title: "far fa-trophy-alt",
            searchTerms: [ "achievement", "award", "cup", "game", "star", "winner" ]
        }, {
            title: "fal fa-trophy-alt",
            searchTerms: [ "achievement", "award", "cup", "game", "star", "winner" ]
        }, {
            title: "fas fa-truck",
            searchTerms: [ "cargo", "delivery", "shipping", "vehicle" ]
        }, {
            title: "far fa-truck",
            searchTerms: [ "cargo", "delivery", "shipping", "vehicle" ]
        }, {
            title: "fal fa-truck",
            searchTerms: [ "cargo", "delivery", "shipping", "vehicle" ]
        }, {
            title: "fas fa-truck-container",
            searchTerms: [ "cargo", "delivery", "shipping", "vehicle" ]
        }, {
            title: "far fa-truck-container",
            searchTerms: [ "cargo", "delivery", "shipping", "vehicle" ]
        }, {
            title: "fal fa-truck-container",
            searchTerms: [ "cargo", "delivery", "shipping", "vehicle" ]
        }, {
            title: "fas fa-truck-couch",
            searchTerms: [ "cargo", "delivery", "moving", "rental", "shipping", "vehicle" ]
        }, {
            title: "far fa-truck-couch",
            searchTerms: [ "cargo", "delivery", "moving", "rental", "shipping", "vehicle" ]
        }, {
            title: "fal fa-truck-couch",
            searchTerms: [ "cargo", "delivery", "moving", "rental", "shipping", "vehicle" ]
        }, {
            title: "fas fa-truck-loading",
            searchTerms: [ "box", "cargo", "delivery", "inventory", "moving", "rental", "vehicle" ]
        }, {
            title: "far fa-truck-loading",
            searchTerms: [ "box", "cargo", "delivery", "inventory", "moving", "rental", "vehicle" ]
        }, {
            title: "fal fa-truck-loading",
            searchTerms: [ "box", "cargo", "delivery", "inventory", "moving", "rental", "vehicle" ]
        }, {
            title: "fas fa-truck-monster",
            searchTerms: [ "offroad", "vehicle", "wheel" ]
        }, {
            title: "far fa-truck-monster",
            searchTerms: [ "offroad", "vehicle", "wheel" ]
        }, {
            title: "fal fa-truck-monster",
            searchTerms: [ "offroad", "vehicle", "wheel" ]
        }, {
            title: "fas fa-truck-moving",
            searchTerms: [ "cargo", "inventory", "rental", "vehicle" ]
        }, {
            title: "far fa-truck-moving",
            searchTerms: [ "cargo", "inventory", "rental", "vehicle" ]
        }, {
            title: "fal fa-truck-moving",
            searchTerms: [ "cargo", "inventory", "rental", "vehicle" ]
        }, {
            title: "fas fa-truck-pickup",
            searchTerms: [ "cargo", "vehicle" ]
        }, {
            title: "far fa-truck-pickup",
            searchTerms: [ "cargo", "vehicle" ]
        }, {
            title: "fal fa-truck-pickup",
            searchTerms: [ "cargo", "vehicle" ]
        }, {
            title: "fas fa-truck-plow",
            searchTerms: [ "clean up", "cold", "seasonal", "snow", "winter" ]
        }, {
            title: "far fa-truck-plow",
            searchTerms: [ "clean up", "cold", "seasonal", "snow", "winter" ]
        }, {
            title: "fal fa-truck-plow",
            searchTerms: [ "clean up", "cold", "seasonal", "snow", "winter" ]
        }, {
            title: "fas fa-truck-ramp",
            searchTerms: [ "box", "cargo", "delivery", "inventory", "moving", "rental", "vehicle" ]
        }, {
            title: "far fa-truck-ramp",
            searchTerms: [ "box", "cargo", "delivery", "inventory", "moving", "rental", "vehicle" ]
        }, {
            title: "fal fa-truck-ramp",
            searchTerms: [ "box", "cargo", "delivery", "inventory", "moving", "rental", "vehicle" ]
        }, {
            title: "fas fa-trumpet",
            searchTerms: [ "brass", "bugle", "classical", "cornet", "instrument", "jazz", "music", "orchestra" ]
        }, {
            title: "far fa-trumpet",
            searchTerms: [ "brass", "bugle", "classical", "cornet", "instrument", "jazz", "music", "orchestra" ]
        }, {
            title: "fal fa-trumpet",
            searchTerms: [ "brass", "bugle", "classical", "cornet", "instrument", "jazz", "music", "orchestra" ]
        }, {
            title: "fas fa-tshirt",
            searchTerms: [ "clothing", "fashion", "garment", "shirt" ]
        }, {
            title: "far fa-tshirt",
            searchTerms: [ "clothing", "fashion", "garment", "shirt" ]
        }, {
            title: "fal fa-tshirt",
            searchTerms: [ "clothing", "fashion", "garment", "shirt" ]
        }, {
            title: "fas fa-tty",
            searchTerms: [ "communication", "deaf", "telephone", "teletypewriter", "text" ]
        }, {
            title: "far fa-tty",
            searchTerms: [ "communication", "deaf", "telephone", "teletypewriter", "text" ]
        }, {
            title: "fal fa-tty",
            searchTerms: [ "communication", "deaf", "telephone", "teletypewriter", "text" ]
        }, {
            title: "fab fa-tumblr",
            searchTerms: []
        }, {
            title: "fab fa-tumblr-square",
            searchTerms: []
        }, {
            title: "fas fa-turkey",
            searchTerms: [ "bird", "chicken", "meal", "meat", "poultry", "seasonal", "thanksgiving" ]
        }, {
            title: "far fa-turkey",
            searchTerms: [ "bird", "chicken", "meal", "meat", "poultry", "seasonal", "thanksgiving" ]
        }, {
            title: "fal fa-turkey",
            searchTerms: [ "bird", "chicken", "meal", "meat", "poultry", "seasonal", "thanksgiving" ]
        }, {
            title: "fas fa-turntable",
            searchTerms: [ "album", "music", "phonograph", "record", "record player", "vinyl" ]
        }, {
            title: "far fa-turntable",
            searchTerms: [ "album", "music", "phonograph", "record", "record player", "vinyl" ]
        }, {
            title: "fal fa-turntable",
            searchTerms: [ "album", "music", "phonograph", "record", "record player", "vinyl" ]
        }, {
            title: "fas fa-turtle",
            searchTerms: [ "cowabunga", "donatello", "fauna", "leonardo", "michaelangelo", "raphael", "reptile", "shell", "slow" ]
        }, {
            title: "far fa-turtle",
            searchTerms: [ "cowabunga", "donatello", "fauna", "leonardo", "michaelangelo", "raphael", "reptile", "shell", "slow" ]
        }, {
            title: "fal fa-turtle",
            searchTerms: [ "cowabunga", "donatello", "fauna", "leonardo", "michaelangelo", "raphael", "reptile", "shell", "slow" ]
        }, {
            title: "fas fa-tv",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "far fa-tv",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "fal fa-tv",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "fas fa-tv-alt",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "far fa-tv-alt",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "fal fa-tv-alt",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "fas fa-tv-music",
            searchTerms: [ "audio", "mtv", "music", "music video", "sound", "television", "vh1" ]
        }, {
            title: "far fa-tv-music",
            searchTerms: [ "audio", "mtv", "music", "music video", "sound", "television", "vh1" ]
        }, {
            title: "fal fa-tv-music",
            searchTerms: [ "audio", "mtv", "music", "music video", "sound", "television", "vh1" ]
        }, {
            title: "fas fa-tv-retro",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "far fa-tv-retro",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "fal fa-tv-retro",
            searchTerms: [ "computer", "display", "monitor", "television" ]
        }, {
            title: "fab fa-twitch",
            searchTerms: []
        }, {
            title: "fab fa-twitter",
            searchTerms: [ "social network", "tweet" ]
        }, {
            title: "fab fa-twitter-square",
            searchTerms: [ "social network", "tweet" ]
        }, {
            title: "fas fa-typewriter",
            searchTerms: [ "keyboard", "letterpress", "movable type", "newspaper", "novel", "retro", "typing", "vintage" ]
        }, {
            title: "far fa-typewriter",
            searchTerms: [ "keyboard", "letterpress", "movable type", "newspaper", "novel", "retro", "typing", "vintage" ]
        }, {
            title: "fal fa-typewriter",
            searchTerms: [ "keyboard", "letterpress", "movable type", "newspaper", "novel", "retro", "typing", "vintage" ]
        }, {
            title: "fab fa-typo3",
            searchTerms: []
        }, {
            title: "fab fa-uber",
            searchTerms: []
        }, {
            title: "fab fa-ubuntu",
            searchTerms: [ "linux", "operating system", "os" ]
        }, {
            title: "fas fa-ufo",
            searchTerms: [ "abduct", "alien", "extraterrestrial", "flying saucer", "space", "spacecraft", "t-craft", "travel", "unidentified flying object" ]
        }, {
            title: "far fa-ufo",
            searchTerms: [ "abduct", "alien", "extraterrestrial", "flying saucer", "space", "spacecraft", "t-craft", "travel", "unidentified flying object" ]
        }, {
            title: "fal fa-ufo",
            searchTerms: [ "abduct", "alien", "extraterrestrial", "flying saucer", "space", "spacecraft", "t-craft", "travel", "unidentified flying object" ]
        }, {
            title: "fas fa-ufo-beam",
            searchTerms: [ "abduct", "alien", "extraterrestrial", "flying saucer", "probe", "space", "spacecraft", "t-craft", "tractor beam", "travel", "unidentified flying object" ]
        }, {
            title: "far fa-ufo-beam",
            searchTerms: [ "abduct", "alien", "extraterrestrial", "flying saucer", "probe", "space", "spacecraft", "t-craft", "tractor beam", "travel", "unidentified flying object" ]
        }, {
            title: "fal fa-ufo-beam",
            searchTerms: [ "abduct", "alien", "extraterrestrial", "flying saucer", "probe", "space", "spacecraft", "t-craft", "tractor beam", "travel", "unidentified flying object" ]
        }, {
            title: "fab fa-uikit",
            searchTerms: []
        }, {
            title: "fab fa-umbraco",
            searchTerms: []
        }, {
            title: "fas fa-umbrella",
            searchTerms: [ "protection", "rain", "storm", "wet" ]
        }, {
            title: "far fa-umbrella",
            searchTerms: [ "protection", "rain", "storm", "wet" ]
        }, {
            title: "fal fa-umbrella",
            searchTerms: [ "protection", "rain", "storm", "wet" ]
        }, {
            title: "fas fa-umbrella-beach",
            searchTerms: [ "protection", "recreation", "sand", "shade", "summer", "sun" ]
        }, {
            title: "far fa-umbrella-beach",
            searchTerms: [ "protection", "recreation", "sand", "shade", "summer", "sun" ]
        }, {
            title: "fal fa-umbrella-beach",
            searchTerms: [ "protection", "recreation", "sand", "shade", "summer", "sun" ]
        }, {
            title: "fas fa-underline",
            searchTerms: [ "edit", "emphasis", "format", "text", "writing" ]
        }, {
            title: "far fa-underline",
            searchTerms: [ "edit", "emphasis", "format", "text", "writing" ]
        }, {
            title: "fal fa-underline",
            searchTerms: [ "edit", "emphasis", "format", "text", "writing" ]
        }, {
            title: "fas fa-undo",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "rotate", "swap" ]
        }, {
            title: "far fa-undo",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "rotate", "swap" ]
        }, {
            title: "fal fa-undo",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "rotate", "swap" ]
        }, {
            title: "fas fa-undo-alt",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "swap" ]
        }, {
            title: "far fa-undo-alt",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "swap" ]
        }, {
            title: "fal fa-undo-alt",
            searchTerms: [ "back", "control z", "exchange", "oops", "return", "swap" ]
        }, {
            title: "fas fa-unicorn",
            searchTerms: [ "fantasy", "fauna", "horn", "horse" ]
        }, {
            title: "far fa-unicorn",
            searchTerms: [ "fantasy", "fauna", "horn", "horse" ]
        }, {
            title: "fal fa-unicorn",
            searchTerms: [ "fantasy", "fauna", "horn", "horse" ]
        }, {
            title: "fas fa-union",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "far fa-union",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "fal fa-union",
            searchTerms: [ "calculus", "equation", "function", "math" ]
        }, {
            title: "fab fa-uniregistry",
            searchTerms: []
        }, {
            title: "fab fa-unity",
            searchTerms: []
        }, {
            title: "fas fa-universal-access",
            searchTerms: [ "accessibility", "hearing", "person", "seeing", "visual impairment" ]
        }, {
            title: "far fa-universal-access",
            searchTerms: [ "accessibility", "hearing", "person", "seeing", "visual impairment" ]
        }, {
            title: "fal fa-universal-access",
            searchTerms: [ "accessibility", "hearing", "person", "seeing", "visual impairment" ]
        }, {
            title: "fas fa-university",
            searchTerms: [ "bank", "building", "college", "higher education - students", "institution" ]
        }, {
            title: "far fa-university",
            searchTerms: [ "bank", "building", "college", "higher education - students", "institution" ]
        }, {
            title: "fal fa-university",
            searchTerms: [ "bank", "building", "college", "higher education - students", "institution" ]
        }, {
            title: "fas fa-unlink",
            searchTerms: [ "attachment", "chain", "chain-broken", "remove" ]
        }, {
            title: "far fa-unlink",
            searchTerms: [ "attachment", "chain", "chain-broken", "remove" ]
        }, {
            title: "fal fa-unlink",
            searchTerms: [ "attachment", "chain", "chain-broken", "remove" ]
        }, {
            title: "fas fa-unlock",
            searchTerms: [ "admin", "lock", "password", "private", "protect" ]
        }, {
            title: "far fa-unlock",
            searchTerms: [ "admin", "lock", "password", "private", "protect" ]
        }, {
            title: "fal fa-unlock",
            searchTerms: [ "admin", "lock", "password", "private", "protect" ]
        }, {
            title: "fas fa-unlock-alt",
            searchTerms: [ "admin", "lock", "password", "private", "protect" ]
        }, {
            title: "far fa-unlock-alt",
            searchTerms: [ "admin", "lock", "password", "private", "protect" ]
        }, {
            title: "fal fa-unlock-alt",
            searchTerms: [ "admin", "lock", "password", "private", "protect" ]
        }, {
            title: "fab fa-untappd",
            searchTerms: []
        }, {
            title: "fas fa-upload",
            searchTerms: [ "hard drive", "import", "publish" ]
        }, {
            title: "far fa-upload",
            searchTerms: [ "hard drive", "import", "publish" ]
        }, {
            title: "fal fa-upload",
            searchTerms: [ "hard drive", "import", "publish" ]
        }, {
            title: "fab fa-ups",
            searchTerms: [ "United Parcel Service", "package", "shipping" ]
        }, {
            title: "fab fa-usb",
            searchTerms: []
        }, {
            title: "fas fa-usb-drive",
            searchTerms: [ "access codes", "device", "flashdrive", "goober", "ssd", "storage", "thumbdrive" ]
        }, {
            title: "far fa-usb-drive",
            searchTerms: [ "access codes", "device", "flashdrive", "goober", "ssd", "storage", "thumbdrive" ]
        }, {
            title: "fal fa-usb-drive",
            searchTerms: [ "access codes", "device", "flashdrive", "goober", "ssd", "storage", "thumbdrive" ]
        }, {
            title: "fas fa-usd-circle",
            searchTerms: [ "$", "currency", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "far fa-usd-circle",
            searchTerms: [ "$", "currency", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fal fa-usd-circle",
            searchTerms: [ "$", "currency", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fas fa-usd-square",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "far fa-usd-square",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fal fa-usd-square",
            searchTerms: [ "$", "dollar-sign", "money", "price", "usd" ]
        }, {
            title: "fas fa-user",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "far fa-user",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fal fa-user",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fas fa-user-alien",
            searchTerms: [ "ET", "extraterrestrial", "humanoid", "monster", "space", "strange", "ufo" ]
        }, {
            title: "far fa-user-alien",
            searchTerms: [ "ET", "extraterrestrial", "humanoid", "monster", "space", "strange", "ufo" ]
        }, {
            title: "fal fa-user-alien",
            searchTerms: [ "ET", "extraterrestrial", "humanoid", "monster", "space", "strange", "ufo" ]
        }, {
            title: "fas fa-user-alt",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "far fa-user-alt",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fal fa-user-alt",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fas fa-user-alt-slash",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "far fa-user-alt-slash",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fal fa-user-alt-slash",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fas fa-user-astronaut",
            searchTerms: [ "avatar", "clothing", "cosmonaut", "nasa", "space", "suit" ]
        }, {
            title: "far fa-user-astronaut",
            searchTerms: [ "avatar", "clothing", "cosmonaut", "nasa", "space", "suit" ]
        }, {
            title: "fal fa-user-astronaut",
            searchTerms: [ "avatar", "clothing", "cosmonaut", "nasa", "space", "suit" ]
        }, {
            title: "fas fa-user-chart",
            searchTerms: [ "chart", "person", "presentation", "teacher" ]
        }, {
            title: "far fa-user-chart",
            searchTerms: [ "chart", "person", "presentation", "teacher" ]
        }, {
            title: "fal fa-user-chart",
            searchTerms: [ "chart", "person", "presentation", "teacher" ]
        }, {
            title: "fas fa-user-check",
            searchTerms: [ "accept", "check", "person", "verified" ]
        }, {
            title: "far fa-user-check",
            searchTerms: [ "accept", "check", "person", "verified" ]
        }, {
            title: "fal fa-user-check",
            searchTerms: [ "accept", "check", "person", "verified" ]
        }, {
            title: "fas fa-user-circle",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "far fa-user-circle",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fal fa-user-circle",
            searchTerms: [ "account", "avatar", "head", "human", "man", "person", "profile" ]
        }, {
            title: "fas fa-user-clock",
            searchTerms: [ "alert", "person", "remind", "time" ]
        }, {
            title: "far fa-user-clock",
            searchTerms: [ "alert", "person", "remind", "time" ]
        }, {
            title: "fal fa-user-clock",
            searchTerms: [ "alert", "person", "remind", "time" ]
        }, {
            title: "fas fa-user-cog",
            searchTerms: [ "admin", "cog", "person", "settings" ]
        }, {
            title: "far fa-user-cog",
            searchTerms: [ "admin", "cog", "person", "settings" ]
        }, {
            title: "fal fa-user-cog",
            searchTerms: [ "admin", "cog", "person", "settings" ]
        }, {
            title: "fal fa-user-cowboy",
            searchTerms: [ "buckaroo", "cowgirl", "horse", "jackeroo", "jessie", "old west", "pardner", "ranch", "rancher", "rodeo", "the lone ranger", "western", "woody", "wrangler" ]
        }, {
            title: "far fa-user-cowboy",
            searchTerms: [ "buckaroo", "cowgirl", "horse", "jackeroo", "jessie", "old west", "pardner", "ranch", "rancher", "rodeo", "the lone ranger", "western", "woody", "wrangler" ]
        }, {
            title: "fas fa-user-cowboy",
            searchTerms: [ "buckaroo", "cowgirl", "horse", "jackeroo", "jessie", "old west", "pardner", "ranch", "rancher", "rodeo", "the lone ranger", "western", "woody", "wrangler" ]
        }, {
            title: "fas fa-user-crown",
            searchTerms: [ "admin", "avatar", "person", "special" ]
        }, {
            title: "far fa-user-crown",
            searchTerms: [ "admin", "avatar", "person", "special" ]
        }, {
            title: "fal fa-user-crown",
            searchTerms: [ "admin", "avatar", "person", "special" ]
        }, {
            title: "fas fa-user-edit",
            searchTerms: [ "edit", "pen", "pencil", "person", "update", "write" ]
        }, {
            title: "far fa-user-edit",
            searchTerms: [ "edit", "pen", "pencil", "person", "update", "write" ]
        }, {
            title: "fal fa-user-edit",
            searchTerms: [ "edit", "pen", "pencil", "person", "update", "write" ]
        }, {
            title: "fas fa-user-friends",
            searchTerms: [ "group", "people", "person", "team", "users" ]
        }, {
            title: "far fa-user-friends",
            searchTerms: [ "group", "people", "person", "team", "users" ]
        }, {
            title: "fal fa-user-friends",
            searchTerms: [ "group", "people", "person", "team", "users" ]
        }, {
            title: "fas fa-user-graduate",
            searchTerms: [ "cap", "clothing", "commencement", "gown", "graduation", "person", "student" ]
        }, {
            title: "far fa-user-graduate",
            searchTerms: [ "cap", "clothing", "commencement", "gown", "graduation", "person", "student" ]
        }, {
            title: "fal fa-user-graduate",
            searchTerms: [ "cap", "clothing", "commencement", "gown", "graduation", "person", "student" ]
        }, {
            title: "fas fa-user-hard-hat",
            searchTerms: [ "construction", "hardhat", "helmet", "safety" ]
        }, {
            title: "far fa-user-hard-hat",
            searchTerms: [ "construction", "hardhat", "helmet", "safety" ]
        }, {
            title: "fal fa-user-hard-hat",
            searchTerms: [ "construction", "hardhat", "helmet", "safety" ]
        }, {
            title: "fas fa-user-headset",
            searchTerms: [ "gaming", "headphones", "help", "person", "support", "telemarketer", "telemarketing" ]
        }, {
            title: "far fa-user-headset",
            searchTerms: [ "gaming", "headphones", "help", "person", "support", "telemarketer", "telemarketing" ]
        }, {
            title: "fal fa-user-headset",
            searchTerms: [ "gaming", "headphones", "help", "person", "support", "telemarketer", "telemarketing" ]
        }, {
            title: "fas fa-user-injured",
            searchTerms: [ "cast", "injury", "ouch", "patient", "person", "sling" ]
        }, {
            title: "far fa-user-injured",
            searchTerms: [ "cast", "injury", "ouch", "patient", "person", "sling" ]
        }, {
            title: "fal fa-user-injured",
            searchTerms: [ "cast", "injury", "ouch", "patient", "person", "sling" ]
        }, {
            title: "fas fa-user-lock",
            searchTerms: [ "admin", "lock", "person", "private", "unlock" ]
        }, {
            title: "far fa-user-lock",
            searchTerms: [ "admin", "lock", "person", "private", "unlock" ]
        }, {
            title: "fal fa-user-lock",
            searchTerms: [ "admin", "lock", "person", "private", "unlock" ]
        }, {
            title: "fas fa-user-md",
            searchTerms: [ "job", "medical", "nurse", "occupation", "physician", "profile", "surgeon" ]
        }, {
            title: "far fa-user-md",
            searchTerms: [ "job", "medical", "nurse", "occupation", "physician", "profile", "surgeon" ]
        }, {
            title: "fal fa-user-md",
            searchTerms: [ "job", "medical", "nurse", "occupation", "physician", "profile", "surgeon" ]
        }, {
            title: "fas fa-user-md-chat",
            searchTerms: [ "advice", "comment", "diagnosis", "opinion", "prescription" ]
        }, {
            title: "far fa-user-md-chat",
            searchTerms: [ "advice", "comment", "diagnosis", "opinion", "prescription" ]
        }, {
            title: "fal fa-user-md-chat",
            searchTerms: [ "advice", "comment", "diagnosis", "opinion", "prescription" ]
        }, {
            title: "fas fa-user-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "far fa-user-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fal fa-user-minus",
            searchTerms: [ "delete", "negative", "remove" ]
        }, {
            title: "fas fa-user-music",
            searchTerms: [ "artist", "music", "musician", "singer" ]
        }, {
            title: "far fa-user-music",
            searchTerms: [ "artist", "music", "musician", "singer" ]
        }, {
            title: "fal fa-user-music",
            searchTerms: [ "artist", "music", "musician", "singer" ]
        }, {
            title: "fas fa-user-ninja",
            searchTerms: [ "assassin", "avatar", "dangerous", "deadly", "sneaky" ]
        }, {
            title: "far fa-user-ninja",
            searchTerms: [ "assassin", "avatar", "dangerous", "deadly", "sneaky" ]
        }, {
            title: "fal fa-user-ninja",
            searchTerms: [ "assassin", "avatar", "dangerous", "deadly", "sneaky" ]
        }, {
            title: "fas fa-user-nurse",
            searchTerms: [ "doctor", "midwife", "practitioner", "surgeon" ]
        }, {
            title: "far fa-user-nurse",
            searchTerms: [ "doctor", "midwife", "practitioner", "surgeon" ]
        }, {
            title: "fal fa-user-nurse",
            searchTerms: [ "doctor", "midwife", "practitioner", "surgeon" ]
        }, {
            title: "fas fa-user-plus",
            searchTerms: [ "add", "avatar", "positive", "sign up", "signup", "team" ]
        }, {
            title: "far fa-user-plus",
            searchTerms: [ "add", "avatar", "positive", "sign up", "signup", "team" ]
        }, {
            title: "fal fa-user-plus",
            searchTerms: [ "add", "avatar", "positive", "sign up", "signup", "team" ]
        }, {
            title: "fas fa-user-robot",
            searchTerms: [ "android", "automate", "computer", "cyborg", "rosie" ]
        }, {
            title: "far fa-user-robot",
            searchTerms: [ "android", "automate", "computer", "cyborg", "rosie" ]
        }, {
            title: "fal fa-user-robot",
            searchTerms: [ "android", "automate", "computer", "cyborg", "rosie" ]
        }, {
            title: "fas fa-user-secret",
            searchTerms: [ "clothing", "coat", "hat", "incognito", "person", "privacy", "spy", "whisper" ]
        }, {
            title: "far fa-user-secret",
            searchTerms: [ "clothing", "coat", "hat", "incognito", "person", "privacy", "spy", "whisper" ]
        }, {
            title: "fal fa-user-secret",
            searchTerms: [ "clothing", "coat", "hat", "incognito", "person", "privacy", "spy", "whisper" ]
        }, {
            title: "fas fa-user-shield",
            searchTerms: [ "admin", "person", "private", "protect", "safe" ]
        }, {
            title: "far fa-user-shield",
            searchTerms: [ "admin", "person", "private", "protect", "safe" ]
        }, {
            title: "fal fa-user-shield",
            searchTerms: [ "admin", "person", "private", "protect", "safe" ]
        }, {
            title: "fas fa-user-slash",
            searchTerms: [ "ban", "delete", "remove" ]
        }, {
            title: "far fa-user-slash",
            searchTerms: [ "ban", "delete", "remove" ]
        }, {
            title: "fal fa-user-slash",
            searchTerms: [ "ban", "delete", "remove" ]
        }, {
            title: "fas fa-user-tag",
            searchTerms: [ "avatar", "discount", "label", "person", "role", "special" ]
        }, {
            title: "far fa-user-tag",
            searchTerms: [ "avatar", "discount", "label", "person", "role", "special" ]
        }, {
            title: "fal fa-user-tag",
            searchTerms: [ "avatar", "discount", "label", "person", "role", "special" ]
        }, {
            title: "fas fa-user-tie",
            searchTerms: [ "avatar", "business", "clothing", "formal", "professional", "suit" ]
        }, {
            title: "far fa-user-tie",
            searchTerms: [ "avatar", "business", "clothing", "formal", "professional", "suit" ]
        }, {
            title: "fal fa-user-tie",
            searchTerms: [ "avatar", "business", "clothing", "formal", "professional", "suit" ]
        }, {
            title: "fas fa-user-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "far fa-user-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fal fa-user-times",
            searchTerms: [ "archive", "delete", "remove", "x" ]
        }, {
            title: "fas fa-user-visor",
            searchTerms: [ "geordi la forge", "star trek" ]
        }, {
            title: "far fa-user-visor",
            searchTerms: [ "geordi la forge", "star trek" ]
        }, {
            title: "fal fa-user-visor",
            searchTerms: [ "geordi la forge", "star trek" ]
        }, {
            title: "fas fa-users",
            searchTerms: [ "friends", "group", "people", "persons", "profiles", "team" ]
        }, {
            title: "far fa-users",
            searchTerms: [ "friends", "group", "people", "persons", "profiles", "team" ]
        }, {
            title: "fal fa-users",
            searchTerms: [ "friends", "group", "people", "persons", "profiles", "team" ]
        }, {
            title: "fas fa-users-class",
            searchTerms: [ "chalkboard", "group", "presentation", "students", "teachers", "team" ]
        }, {
            title: "far fa-users-class",
            searchTerms: [ "chalkboard", "group", "presentation", "students", "teachers", "team" ]
        }, {
            title: "fal fa-users-class",
            searchTerms: [ "chalkboard", "group", "presentation", "students", "teachers", "team" ]
        }, {
            title: "fas fa-users-cog",
            searchTerms: [ "admin", "cog", "group", "person", "settings", "team" ]
        }, {
            title: "far fa-users-cog",
            searchTerms: [ "admin", "cog", "group", "person", "settings", "team" ]
        }, {
            title: "fal fa-users-cog",
            searchTerms: [ "admin", "cog", "group", "person", "settings", "team" ]
        }, {
            title: "fas fa-users-crown",
            searchTerms: [ "admin", "avatar", "group", "person", "special", "team" ]
        }, {
            title: "far fa-users-crown",
            searchTerms: [ "admin", "avatar", "group", "person", "special", "team" ]
        }, {
            title: "fal fa-users-crown",
            searchTerms: [ "admin", "avatar", "group", "person", "special", "team" ]
        }, {
            title: "fas fa-users-medical",
            searchTerms: [ "group", "patients", "physician", "team" ]
        }, {
            title: "far fa-users-medical",
            searchTerms: [ "group", "patients", "physician", "team" ]
        }, {
            title: "fal fa-users-medical",
            searchTerms: [ "group", "patients", "physician", "team" ]
        }, {
            title: "fab fa-usps",
            searchTerms: [ "american", "package", "shipping", "usa" ]
        }, {
            title: "fab fa-ussunnah",
            searchTerms: []
        }, {
            title: "fas fa-utensil-fork",
            searchTerms: [ "cutlery", "dining", "food", "fork", "silverware" ]
        }, {
            title: "far fa-utensil-fork",
            searchTerms: [ "cutlery", "dining", "food", "fork", "silverware" ]
        }, {
            title: "fal fa-utensil-fork",
            searchTerms: [ "cutlery", "dining", "food", "fork", "silverware" ]
        }, {
            title: "fas fa-utensil-knife",
            searchTerms: [ "cut", "cutlery", "dining", "silverware", "tool" ]
        }, {
            title: "far fa-utensil-knife",
            searchTerms: [ "cut", "cutlery", "dining", "silverware", "tool" ]
        }, {
            title: "fal fa-utensil-knife",
            searchTerms: [ "cut", "cutlery", "dining", "silverware", "tool" ]
        }, {
            title: "fas fa-utensil-spoon",
            searchTerms: [ "cutlery", "dining", "scoop", "silverware", "spoon" ]
        }, {
            title: "far fa-utensil-spoon",
            searchTerms: [ "cutlery", "dining", "scoop", "silverware", "spoon" ]
        }, {
            title: "fal fa-utensil-spoon",
            searchTerms: [ "cutlery", "dining", "scoop", "silverware", "spoon" ]
        }, {
            title: "fas fa-utensils",
            searchTerms: [ "cutlery", "dining", "dinner", "eat", "food", "fork", "knife", "restaurant" ]
        }, {
            title: "far fa-utensils",
            searchTerms: [ "cutlery", "dining", "dinner", "eat", "food", "fork", "knife", "restaurant" ]
        }, {
            title: "fal fa-utensils",
            searchTerms: [ "cutlery", "dining", "dinner", "eat", "food", "fork", "knife", "restaurant" ]
        }, {
            title: "fas fa-utensils-alt",
            searchTerms: [ "cutlery", "dining", "dinner", "eat", "food", "fork", "knife", "restaurant" ]
        }, {
            title: "far fa-utensils-alt",
            searchTerms: [ "cutlery", "dining", "dinner", "eat", "food", "fork", "knife", "restaurant" ]
        }, {
            title: "fal fa-utensils-alt",
            searchTerms: [ "cutlery", "dining", "dinner", "eat", "food", "fork", "knife", "restaurant" ]
        }, {
            title: "fab fa-vaadin",
            searchTerms: []
        }, {
            title: "fas fa-vacuum",
            searchTerms: [ "cleaning", "dyson", "floor", "suck", "suction" ]
        }, {
            title: "far fa-vacuum",
            searchTerms: [ "cleaning", "dyson", "floor", "suck", "suction" ]
        }, {
            title: "fal fa-vacuum",
            searchTerms: [ "cleaning", "dyson", "floor", "suck", "suction" ]
        }, {
            title: "fas fa-vacuum-robot",
            searchTerms: [ "cleaning", "floor", "roomba", "suck", "suction" ]
        }, {
            title: "far fa-vacuum-robot",
            searchTerms: [ "cleaning", "floor", "roomba", "suck", "suction" ]
        }, {
            title: "fal fa-vacuum-robot",
            searchTerms: [ "cleaning", "floor", "roomba", "suck", "suction" ]
        }, {
            title: "fas fa-value-absolute",
            searchTerms: [ "Math" ]
        }, {
            title: "far fa-value-absolute",
            searchTerms: [ "Math" ]
        }, {
            title: "fal fa-value-absolute",
            searchTerms: [ "Math" ]
        }, {
            title: "fas fa-vector-square",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "far fa-vector-square",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "fal fa-vector-square",
            searchTerms: [ "anchors", "lines", "object", "render", "shape" ]
        }, {
            title: "fas fa-venus",
            searchTerms: [ "female" ]
        }, {
            title: "far fa-venus",
            searchTerms: [ "female" ]
        }, {
            title: "fal fa-venus",
            searchTerms: [ "female" ]
        }, {
            title: "fas fa-venus-double",
            searchTerms: [ "female" ]
        }, {
            title: "far fa-venus-double",
            searchTerms: [ "female" ]
        }, {
            title: "fal fa-venus-double",
            searchTerms: [ "female" ]
        }, {
            title: "fas fa-venus-mars",
            searchTerms: [ "Gender" ]
        }, {
            title: "far fa-venus-mars",
            searchTerms: [ "Gender" ]
        }, {
            title: "fal fa-venus-mars",
            searchTerms: [ "Gender" ]
        }, {
            title: "fas fa-vhs",
            searchTerms: [ "betamax", "cassette", "rental", "retro", "tape", "video", "vintage" ]
        }, {
            title: "far fa-vhs",
            searchTerms: [ "betamax", "cassette", "rental", "retro", "tape", "video", "vintage" ]
        }, {
            title: "fal fa-vhs",
            searchTerms: [ "betamax", "cassette", "rental", "retro", "tape", "video", "vintage" ]
        }, {
            title: "fab fa-viacoin",
            searchTerms: []
        }, {
            title: "fab fa-viadeo",
            searchTerms: []
        }, {
            title: "fab fa-viadeo-square",
            searchTerms: []
        }, {
            title: "fas fa-vial",
            searchTerms: [ "experiment", "lab", "sample", "science", "test", "test tube" ]
        }, {
            title: "far fa-vial",
            searchTerms: [ "experiment", "lab", "sample", "science", "test", "test tube" ]
        }, {
            title: "fal fa-vial",
            searchTerms: [ "experiment", "lab", "sample", "science", "test", "test tube" ]
        }, {
            title: "fas fa-vials",
            searchTerms: [ "experiment", "lab", "sample", "science", "test", "test tube" ]
        }, {
            title: "far fa-vials",
            searchTerms: [ "experiment", "lab", "sample", "science", "test", "test tube" ]
        }, {
            title: "fal fa-vials",
            searchTerms: [ "experiment", "lab", "sample", "science", "test", "test tube" ]
        }, {
            title: "fab fa-viber",
            searchTerms: []
        }, {
            title: "fas fa-video",
            searchTerms: [ "camera", "film", "movie", "record", "video-camera" ]
        }, {
            title: "far fa-video",
            searchTerms: [ "camera", "film", "movie", "record", "video-camera" ]
        }, {
            title: "fal fa-video",
            searchTerms: [ "camera", "film", "movie", "record", "video-camera" ]
        }, {
            title: "fas fa-video-plus",
            searchTerms: [ "add", "create", "film", "new", "positive", "record", "video" ]
        }, {
            title: "far fa-video-plus",
            searchTerms: [ "add", "create", "film", "new", "positive", "record", "video" ]
        }, {
            title: "fal fa-video-plus",
            searchTerms: [ "add", "create", "film", "new", "positive", "record", "video" ]
        }, {
            title: "fas fa-video-slash",
            searchTerms: [ "add", "create", "film", "new", "positive", "record", "video" ]
        }, {
            title: "far fa-video-slash",
            searchTerms: [ "add", "create", "film", "new", "positive", "record", "video" ]
        }, {
            title: "fal fa-video-slash",
            searchTerms: [ "add", "create", "film", "new", "positive", "record", "video" ]
        }, {
            title: "fas fa-vihara",
            searchTerms: [ "buddhism", "buddhist", "building", "monastery" ]
        }, {
            title: "far fa-vihara",
            searchTerms: [ "buddhism", "buddhist", "building", "monastery" ]
        }, {
            title: "fal fa-vihara",
            searchTerms: [ "buddhism", "buddhist", "building", "monastery" ]
        }, {
            title: "fab fa-vimeo",
            searchTerms: []
        }, {
            title: "fab fa-vimeo-square",
            searchTerms: []
        }, {
            title: "fab fa-vimeo-v",
            searchTerms: [ "vimeo" ]
        }, {
            title: "fab fa-vine",
            searchTerms: []
        }, {
            title: "fas fa-violin",
            searchTerms: [ "bow", "cello", "fiddle", "instrument", "music", "orchestra", "string" ]
        }, {
            title: "far fa-violin",
            searchTerms: [ "bow", "cello", "fiddle", "instrument", "music", "orchestra", "string" ]
        }, {
            title: "fal fa-violin",
            searchTerms: [ "bow", "cello", "fiddle", "instrument", "music", "orchestra", "string" ]
        }, {
            title: "fab fa-vk",
            searchTerms: []
        }, {
            title: "fab fa-vnv",
            searchTerms: []
        }, {
            title: "fas fa-voicemail",
            searchTerms: [ "answer", "inbox", "message", "phone" ]
        }, {
            title: "far fa-voicemail",
            searchTerms: [ "answer", "inbox", "message", "phone" ]
        }, {
            title: "fal fa-voicemail",
            searchTerms: [ "answer", "inbox", "message", "phone" ]
        }, {
            title: "fas fa-volcano",
            searchTerms: [ "caldera", "lava", "magma", "mountain", "smoke" ]
        }, {
            title: "far fa-volcano",
            searchTerms: [ "caldera", "lava", "magma", "mountain", "smoke" ]
        }, {
            title: "fal fa-volcano",
            searchTerms: [ "caldera", "lava", "magma", "mountain", "smoke" ]
        }, {
            title: "fas fa-volleyball-ball",
            searchTerms: [ "beach", "olympics", "sport" ]
        }, {
            title: "far fa-volleyball-ball",
            searchTerms: [ "beach", "olympics", "sport" ]
        }, {
            title: "fal fa-volleyball-ball",
            searchTerms: [ "beach", "olympics", "sport" ]
        }, {
            title: "fas fa-volume",
            searchTerms: [ "audio", "control", "music", "sound", "speaker" ]
        }, {
            title: "far fa-volume",
            searchTerms: [ "audio", "control", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-volume",
            searchTerms: [ "audio", "control", "music", "sound", "speaker" ]
        }, {
            title: "fas fa-volume-down",
            searchTerms: [ "audio", "lower", "music", "quieter", "sound", "speaker" ]
        }, {
            title: "far fa-volume-down",
            searchTerms: [ "audio", "lower", "music", "quieter", "sound", "speaker" ]
        }, {
            title: "fal fa-volume-down",
            searchTerms: [ "audio", "lower", "music", "quieter", "sound", "speaker" ]
        }, {
            title: "fas fa-volume-mute",
            searchTerms: [ "audio", "music", "quiet", "sound", "speaker" ]
        }, {
            title: "far fa-volume-mute",
            searchTerms: [ "audio", "music", "quiet", "sound", "speaker" ]
        }, {
            title: "fal fa-volume-mute",
            searchTerms: [ "audio", "music", "quiet", "sound", "speaker" ]
        }, {
            title: "fas fa-volume-off",
            searchTerms: [ "audio", "ban", "music", "mute", "quiet", "silent", "sound" ]
        }, {
            title: "far fa-volume-off",
            searchTerms: [ "audio", "ban", "music", "mute", "quiet", "silent", "sound" ]
        }, {
            title: "fal fa-volume-off",
            searchTerms: [ "audio", "ban", "music", "mute", "quiet", "silent", "sound" ]
        }, {
            title: "fas fa-volume-slash",
            searchTerms: [ "audio", "ban", "music", "mute", "quiet", "silent", "sound" ]
        }, {
            title: "far fa-volume-slash",
            searchTerms: [ "audio", "ban", "music", "mute", "quiet", "silent", "sound" ]
        }, {
            title: "fal fa-volume-slash",
            searchTerms: [ "audio", "ban", "music", "mute", "quiet", "silent", "sound" ]
        }, {
            title: "fas fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "music", "sound", "speaker" ]
        }, {
            title: "far fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "music", "sound", "speaker" ]
        }, {
            title: "fal fa-volume-up",
            searchTerms: [ "audio", "higher", "louder", "music", "sound", "speaker" ]
        }, {
            title: "fas fa-vote-nay",
            searchTerms: [ "cast", "election", "negative", "no", "politics", "reject", "voting" ]
        }, {
            title: "far fa-vote-nay",
            searchTerms: [ "cast", "election", "negative", "no", "politics", "reject", "voting" ]
        }, {
            title: "fal fa-vote-nay",
            searchTerms: [ "cast", "election", "negative", "no", "politics", "reject", "voting" ]
        }, {
            title: "fas fa-vote-yea",
            searchTerms: [ "accept", "cast", "election", "politics", "positive", "yes" ]
        }, {
            title: "far fa-vote-yea",
            searchTerms: [ "accept", "cast", "election", "politics", "positive", "yes" ]
        }, {
            title: "fal fa-vote-yea",
            searchTerms: [ "accept", "cast", "election", "politics", "positive", "yes" ]
        }, {
            title: "fas fa-vr-cardboard",
            searchTerms: [ "3d", "augment", "google", "reality", "virtual" ]
        }, {
            title: "far fa-vr-cardboard",
            searchTerms: [ "3d", "augment", "google", "reality", "virtual" ]
        }, {
            title: "fal fa-vr-cardboard",
            searchTerms: [ "3d", "augment", "google", "reality", "virtual" ]
        }, {
            title: "fab fa-vuejs",
            searchTerms: []
        }, {
            title: "fal fa-wagon-covered",
            searchTerms: [ "contestoga", "dysentery", "oregon trail", "stagecoach", "vehicle", "western", "wheel" ]
        }, {
            title: "far fa-wagon-covered",
            searchTerms: [ "contestoga", "dysentery", "oregon trail", "stagecoach", "vehicle", "western", "wheel" ]
        }, {
            title: "fas fa-wagon-covered",
            searchTerms: [ "contestoga", "dysentery", "oregon trail", "stagecoach", "vehicle", "western", "wheel" ]
        }, {
            title: "fas fa-walker",
            searchTerms: [ "accessibility", "assistance", "wheelchair" ]
        }, {
            title: "far fa-walker",
            searchTerms: [ "accessibility", "assistance", "wheelchair" ]
        }, {
            title: "fal fa-walker",
            searchTerms: [ "accessibility", "assistance", "wheelchair" ]
        }, {
            title: "fas fa-walkie-talkie",
            searchTerms: [ "communication", "copy", "intercom", "over", "portable", "radio", "two way radio" ]
        }, {
            title: "far fa-walkie-talkie",
            searchTerms: [ "communication", "copy", "intercom", "over", "portable", "radio", "two way radio" ]
        }, {
            title: "fal fa-walkie-talkie",
            searchTerms: [ "communication", "copy", "intercom", "over", "portable", "radio", "two way radio" ]
        }, {
            title: "fas fa-walking",
            searchTerms: [ "exercise", "health", "pedometer", "person", "steps" ]
        }, {
            title: "far fa-walking",
            searchTerms: [ "exercise", "health", "pedometer", "person", "steps" ]
        }, {
            title: "fal fa-walking",
            searchTerms: [ "exercise", "health", "pedometer", "person", "steps" ]
        }, {
            title: "fas fa-wallet",
            searchTerms: [ "billfold", "cash", "currency", "money" ]
        }, {
            title: "far fa-wallet",
            searchTerms: [ "billfold", "cash", "currency", "money" ]
        }, {
            title: "fal fa-wallet",
            searchTerms: [ "billfold", "cash", "currency", "money" ]
        }, {
            title: "fas fa-wand",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "halloween", "holiday", "magic", "weapon" ]
        }, {
            title: "far fa-wand",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "halloween", "holiday", "magic", "weapon" ]
        }, {
            title: "fal fa-wand",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "halloween", "holiday", "magic", "weapon" ]
        }, {
            title: "fas fa-wand-magic",
            searchTerms: [ "autocomplete", "automatic", "fantasy", "halloween", "holiday", "magic", "weapon", "witch", "wizard" ]
        }, {
            title: "far fa-wand-magic",
            searchTerms: [ "autocomplete", "automatic", "fantasy", "halloween", "holiday", "magic", "weapon", "witch", "wizard" ]
        }, {
            title: "fal fa-wand-magic",
            searchTerms: [ "autocomplete", "automatic", "fantasy", "halloween", "holiday", "magic", "weapon", "witch", "wizard" ]
        }, {
            title: "fas fa-warehouse",
            searchTerms: [ "building", "capacity", "garage", "inventory", "storage" ]
        }, {
            title: "far fa-warehouse",
            searchTerms: [ "building", "capacity", "garage", "inventory", "storage" ]
        }, {
            title: "fal fa-warehouse",
            searchTerms: [ "building", "capacity", "garage", "inventory", "storage" ]
        }, {
            title: "fas fa-warehouse-alt",
            searchTerms: [ "building", "capacity", "garage", "inventory", "storage" ]
        }, {
            title: "far fa-warehouse-alt",
            searchTerms: [ "building", "capacity", "garage", "inventory", "storage" ]
        }, {
            title: "fal fa-warehouse-alt",
            searchTerms: [ "building", "capacity", "garage", "inventory", "storage" ]
        }, {
            title: "fas fa-washer",
            searchTerms: [ "clean", "clothes", "laundromat", "laundry", "washing machine" ]
        }, {
            title: "far fa-washer",
            searchTerms: [ "clean", "clothes", "laundromat", "laundry", "washing machine" ]
        }, {
            title: "fal fa-washer",
            searchTerms: [ "clean", "clothes", "laundromat", "laundry", "washing machine" ]
        }, {
            title: "fas fa-watch",
            searchTerms: [ "alert", "clock", "time", "wristwatch" ]
        }, {
            title: "far fa-watch",
            searchTerms: [ "alert", "clock", "time", "wristwatch" ]
        }, {
            title: "fal fa-watch",
            searchTerms: [ "alert", "clock", "time", "wristwatch" ]
        }, {
            title: "fas fa-watch-calculator",
            searchTerms: [ "casio", "digital", "math", "time" ]
        }, {
            title: "far fa-watch-calculator",
            searchTerms: [ "casio", "digital", "math", "time" ]
        }, {
            title: "fal fa-watch-calculator",
            searchTerms: [ "casio", "digital", "math", "time" ]
        }, {
            title: "fas fa-watch-fitness",
            searchTerms: [ "Fitbit", "alert", "apple watch", "clock", "pedometer", "time", "wristwatch" ]
        }, {
            title: "far fa-watch-fitness",
            searchTerms: [ "Fitbit", "alert", "apple watch", "clock", "pedometer", "time", "wristwatch" ]
        }, {
            title: "fal fa-watch-fitness",
            searchTerms: [ "Fitbit", "alert", "apple watch", "clock", "pedometer", "time", "wristwatch" ]
        }, {
            title: "fas fa-water",
            searchTerms: [ "lake", "liquid", "ocean", "sea", "swim", "wet" ]
        }, {
            title: "far fa-water",
            searchTerms: [ "lake", "liquid", "ocean", "sea", "swim", "wet" ]
        }, {
            title: "fal fa-water",
            searchTerms: [ "lake", "liquid", "ocean", "sea", "swim", "wet" ]
        }, {
            title: "fas fa-water-lower",
            searchTerms: [ "flood", "lake", "liquid", "ocean", "recede", "sea", "swim", "wet" ]
        }, {
            title: "far fa-water-lower",
            searchTerms: [ "flood", "lake", "liquid", "ocean", "recede", "sea", "swim", "wet" ]
        }, {
            title: "fal fa-water-lower",
            searchTerms: [ "flood", "lake", "liquid", "ocean", "recede", "sea", "swim", "wet" ]
        }, {
            title: "fas fa-water-rise",
            searchTerms: [ "flood", "lake", "liquid", "ocean", "sea", "swim", "wet" ]
        }, {
            title: "far fa-water-rise",
            searchTerms: [ "flood", "lake", "liquid", "ocean", "sea", "swim", "wet" ]
        }, {
            title: "fal fa-water-rise",
            searchTerms: [ "flood", "lake", "liquid", "ocean", "sea", "swim", "wet" ]
        }, {
            title: "fas fa-wave-sine",
            searchTerms: [ "frequency", "pulse", "signal" ]
        }, {
            title: "far fa-wave-sine",
            searchTerms: [ "frequency", "pulse", "signal" ]
        }, {
            title: "fal fa-wave-sine",
            searchTerms: [ "frequency", "pulse", "signal" ]
        }, {
            title: "fal fa-wave-square",
            searchTerms: [ "frequency", "pulse", "signal" ]
        }, {
            title: "far fa-wave-square",
            searchTerms: [ "frequency", "pulse", "signal" ]
        }, {
            title: "fas fa-wave-square",
            searchTerms: [ "frequency", "pulse", "signal" ]
        }, {
            title: "fas fa-wave-triangle",
            searchTerms: [ "frequency", "pulse", "signal" ]
        }, {
            title: "far fa-wave-triangle",
            searchTerms: [ "frequency", "pulse", "signal" ]
        }, {
            title: "fal fa-wave-triangle",
            searchTerms: [ "frequency", "pulse", "signal" ]
        }, {
            title: "fas fa-waveform",
            searchTerms: [ "amplitude", "sound", "soundwave" ]
        }, {
            title: "far fa-waveform",
            searchTerms: [ "amplitude", "sound", "soundwave" ]
        }, {
            title: "fal fa-waveform",
            searchTerms: [ "amplitude", "sound", "soundwave" ]
        }, {
            title: "fas fa-waveform-path",
            searchTerms: [ "amplitude", "sound", "soundwave" ]
        }, {
            title: "far fa-waveform-path",
            searchTerms: [ "amplitude", "sound", "soundwave" ]
        }, {
            title: "fal fa-waveform-path",
            searchTerms: [ "amplitude", "sound", "soundwave" ]
        }, {
            title: "fab fa-waze",
            searchTerms: []
        }, {
            title: "fas fa-webcam",
            searchTerms: [ "chat", "conference call", "facetime", "podcast", "video", "videoconferencing", "youtube" ]
        }, {
            title: "far fa-webcam",
            searchTerms: [ "chat", "conference call", "facetime", "podcast", "video", "videoconferencing", "youtube" ]
        }, {
            title: "fal fa-webcam",
            searchTerms: [ "chat", "conference call", "facetime", "podcast", "video", "videoconferencing", "youtube" ]
        }, {
            title: "fas fa-webcam-slash",
            searchTerms: [ "chat", "conference call", "facetime", "podcast", "video", "videoconferencing", "youtube" ]
        }, {
            title: "far fa-webcam-slash",
            searchTerms: [ "chat", "conference call", "facetime", "podcast", "video", "videoconferencing", "youtube" ]
        }, {
            title: "fal fa-webcam-slash",
            searchTerms: [ "chat", "conference call", "facetime", "podcast", "video", "videoconferencing", "youtube" ]
        }, {
            title: "fab fa-weebly",
            searchTerms: []
        }, {
            title: "fab fa-weibo",
            searchTerms: []
        }, {
            title: "fas fa-weight",
            searchTerms: [ "health", "measurement", "scale", "weight" ]
        }, {
            title: "far fa-weight",
            searchTerms: [ "health", "measurement", "scale", "weight" ]
        }, {
            title: "fal fa-weight",
            searchTerms: [ "health", "measurement", "scale", "weight" ]
        }, {
            title: "fas fa-weight-hanging",
            searchTerms: [ "anvil", "heavy", "measurement" ]
        }, {
            title: "far fa-weight-hanging",
            searchTerms: [ "anvil", "heavy", "measurement" ]
        }, {
            title: "fal fa-weight-hanging",
            searchTerms: [ "anvil", "heavy", "measurement" ]
        }, {
            title: "fab fa-weixin",
            searchTerms: []
        }, {
            title: "fas fa-whale",
            searchTerms: [ "fauna", "mammal", "swimming" ]
        }, {
            title: "far fa-whale",
            searchTerms: [ "fauna", "mammal", "swimming" ]
        }, {
            title: "fal fa-whale",
            searchTerms: [ "fauna", "mammal", "swimming" ]
        }, {
            title: "fab fa-whatsapp",
            searchTerms: []
        }, {
            title: "fab fa-whatsapp-square",
            searchTerms: []
        }, {
            title: "fas fa-wheat",
            searchTerms: [ "argriculture", "fall", "farming", "grain", "seasonal" ]
        }, {
            title: "far fa-wheat",
            searchTerms: [ "argriculture", "fall", "farming", "grain", "seasonal" ]
        }, {
            title: "fal fa-wheat",
            searchTerms: [ "argriculture", "fall", "farming", "grain", "seasonal" ]
        }, {
            title: "fas fa-wheelchair",
            searchTerms: [ "accessible", "handicap", "person" ]
        }, {
            title: "far fa-wheelchair",
            searchTerms: [ "accessible", "handicap", "person" ]
        }, {
            title: "fal fa-wheelchair",
            searchTerms: [ "accessible", "handicap", "person" ]
        }, {
            title: "fas fa-whistle",
            searchTerms: [ "alert", "single", "sound", "toot" ]
        }, {
            title: "far fa-whistle",
            searchTerms: [ "alert", "single", "sound", "toot" ]
        }, {
            title: "fal fa-whistle",
            searchTerms: [ "alert", "single", "sound", "toot" ]
        }, {
            title: "fab fa-whmcs",
            searchTerms: []
        }, {
            title: "fas fa-wifi",
            searchTerms: [ "connection", "hotspot", "internet", "network", "wireless" ]
        }, {
            title: "far fa-wifi",
            searchTerms: [ "connection", "hotspot", "internet", "network", "wireless" ]
        }, {
            title: "fal fa-wifi",
            searchTerms: [ "connection", "hotspot", "internet", "network", "wireless" ]
        }, {
            title: "fas fa-wifi-1",
            searchTerms: [ "connection", "hotspot", "internet", "network", "weak", "wireless" ]
        }, {
            title: "far fa-wifi-1",
            searchTerms: [ "connection", "hotspot", "internet", "network", "weak", "wireless" ]
        }, {
            title: "fal fa-wifi-1",
            searchTerms: [ "connection", "hotspot", "internet", "network", "weak", "wireless" ]
        }, {
            title: "fas fa-wifi-2",
            searchTerms: [ "average", "connection", "hotspot", "internet", "network", "wireless" ]
        }, {
            title: "far fa-wifi-2",
            searchTerms: [ "average", "connection", "hotspot", "internet", "network", "wireless" ]
        }, {
            title: "fal fa-wifi-2",
            searchTerms: [ "average", "connection", "hotspot", "internet", "network", "wireless" ]
        }, {
            title: "fas fa-wifi-slash",
            searchTerms: [ "ban", "broken", "connection", "disabled", "hotspot", "internet", "network", "unavailable", "wireless" ]
        }, {
            title: "far fa-wifi-slash",
            searchTerms: [ "ban", "broken", "connection", "disabled", "hotspot", "internet", "network", "unavailable", "wireless" ]
        }, {
            title: "fal fa-wifi-slash",
            searchTerms: [ "ban", "broken", "connection", "disabled", "hotspot", "internet", "network", "unavailable", "wireless" ]
        }, {
            title: "fab fa-wikipedia-w",
            searchTerms: []
        }, {
            title: "fas fa-wind",
            searchTerms: [ "air", "blow", "breeze", "fall", "seasonal", "weather" ]
        }, {
            title: "far fa-wind",
            searchTerms: [ "air", "blow", "breeze", "fall", "seasonal", "weather" ]
        }, {
            title: "fal fa-wind",
            searchTerms: [ "air", "blow", "breeze", "fall", "seasonal", "weather" ]
        }, {
            title: "fas fa-wind-turbine",
            searchTerms: [ "electricity", "energy", "generator", "renewable", "wind power", "windmill" ]
        }, {
            title: "far fa-wind-turbine",
            searchTerms: [ "electricity", "energy", "generator", "renewable", "wind power", "windmill" ]
        }, {
            title: "fal fa-wind-turbine",
            searchTerms: [ "electricity", "energy", "generator", "renewable", "wind power", "windmill" ]
        }, {
            title: "fas fa-wind-warning",
            searchTerms: [ "air", "alert", "blow", "breeze", "fall", "hurricane", "seasonal", "tornado", "weather" ]
        }, {
            title: "far fa-wind-warning",
            searchTerms: [ "air", "alert", "blow", "breeze", "fall", "hurricane", "seasonal", "tornado", "weather" ]
        }, {
            title: "fal fa-wind-warning",
            searchTerms: [ "air", "alert", "blow", "breeze", "fall", "hurricane", "seasonal", "tornado", "weather" ]
        }, {
            title: "fas fa-window",
            searchTerms: [ "browser", "computer", "development" ]
        }, {
            title: "far fa-window",
            searchTerms: [ "browser", "computer", "development" ]
        }, {
            title: "fal fa-window",
            searchTerms: [ "browser", "computer", "development" ]
        }, {
            title: "fas fa-window-alt",
            searchTerms: [ "browser", "computer", "development" ]
        }, {
            title: "far fa-window-alt",
            searchTerms: [ "browser", "computer", "development" ]
        }, {
            title: "fal fa-window-alt",
            searchTerms: [ "browser", "computer", "development" ]
        }, {
            title: "fas fa-window-close",
            searchTerms: [ "browser", "cancel", "computer", "development" ]
        }, {
            title: "far fa-window-close",
            searchTerms: [ "browser", "cancel", "computer", "development" ]
        }, {
            title: "fal fa-window-close",
            searchTerms: [ "browser", "cancel", "computer", "development" ]
        }, {
            title: "fas fa-window-frame",
            searchTerms: [ "door", "glass", "pane", "view", "window" ]
        }, {
            title: "far fa-window-frame",
            searchTerms: [ "door", "glass", "pane", "view", "window" ]
        }, {
            title: "fal fa-window-frame",
            searchTerms: [ "door", "glass", "pane", "view", "window" ]
        }, {
            title: "fas fa-window-frame-open",
            searchTerms: [ "door", "glass", "pane", "view", "window" ]
        }, {
            title: "far fa-window-frame-open",
            searchTerms: [ "door", "glass", "pane", "view", "window" ]
        }, {
            title: "fal fa-window-frame-open",
            searchTerms: [ "door", "glass", "pane", "view", "window" ]
        }, {
            title: "fas fa-window-maximize",
            searchTerms: [ "browser", "computer", "development", "expand" ]
        }, {
            title: "far fa-window-maximize",
            searchTerms: [ "browser", "computer", "development", "expand" ]
        }, {
            title: "fal fa-window-maximize",
            searchTerms: [ "browser", "computer", "development", "expand" ]
        }, {
            title: "fas fa-window-minimize",
            searchTerms: [ "browser", "collapse", "computer", "development" ]
        }, {
            title: "far fa-window-minimize",
            searchTerms: [ "browser", "collapse", "computer", "development" ]
        }, {
            title: "fal fa-window-minimize",
            searchTerms: [ "browser", "collapse", "computer", "development" ]
        }, {
            title: "fas fa-window-restore",
            searchTerms: [ "browser", "computer", "development" ]
        }, {
            title: "far fa-window-restore",
            searchTerms: [ "browser", "computer", "development" ]
        }, {
            title: "fal fa-window-restore",
            searchTerms: [ "browser", "computer", "development" ]
        }, {
            title: "fab fa-windows",
            searchTerms: [ "microsoft", "operating system", "os" ]
        }, {
            title: "fas fa-windsock",
            searchTerms: [ "air", "blow", "breeze", "fall", "seasonal", "weather" ]
        }, {
            title: "far fa-windsock",
            searchTerms: [ "air", "blow", "breeze", "fall", "seasonal", "weather" ]
        }, {
            title: "fal fa-windsock",
            searchTerms: [ "air", "blow", "breeze", "fall", "seasonal", "weather" ]
        }, {
            title: "fas fa-wine-bottle",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "glass", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "far fa-wine-bottle",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "glass", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "fal fa-wine-bottle",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "glass", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "fas fa-wine-glass",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "far fa-wine-glass",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "fal fa-wine-glass",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "fas fa-wine-glass-alt",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "far fa-wine-glass-alt",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "fal fa-wine-glass-alt",
            searchTerms: [ "alcohol", "beverage", "cabernet", "drink", "grapes", "merlot", "sauvignon" ]
        }, {
            title: "fab fa-wix",
            searchTerms: []
        }, {
            title: "fab fa-wizards-of-the-coast",
            searchTerms: [ "Dungeons & Dragons", "d&d", "dnd", "fantasy", "game", "gaming", "tabletop" ]
        }, {
            title: "fab fa-wolf-pack-battalion",
            searchTerms: []
        }, {
            title: "fas fa-won-sign",
            searchTerms: [ "currency", "krw", "money" ]
        }, {
            title: "far fa-won-sign",
            searchTerms: [ "currency", "krw", "money" ]
        }, {
            title: "fal fa-won-sign",
            searchTerms: [ "currency", "krw", "money" ]
        }, {
            title: "fab fa-wordpress",
            searchTerms: []
        }, {
            title: "fab fa-wordpress-simple",
            searchTerms: []
        }, {
            title: "fab fa-wpbeginner",
            searchTerms: []
        }, {
            title: "fab fa-wpexplorer",
            searchTerms: []
        }, {
            title: "fab fa-wpforms",
            searchTerms: []
        }, {
            title: "fab fa-wpressr",
            searchTerms: [ "rendact" ]
        }, {
            title: "fas fa-wreath",
            searchTerms: [ "christmas", "decoration", "door", "holiday", "welcome", "xmas" ]
        }, {
            title: "far fa-wreath",
            searchTerms: [ "christmas", "decoration", "door", "holiday", "welcome", "xmas" ]
        }, {
            title: "fal fa-wreath",
            searchTerms: [ "christmas", "decoration", "door", "holiday", "welcome", "xmas" ]
        }, {
            title: "fas fa-wrench",
            searchTerms: [ "construction", "fix", "mechanic", "plumbing", "settings", "spanner", "tool", "update" ]
        }, {
            title: "far fa-wrench",
            searchTerms: [ "construction", "fix", "mechanic", "plumbing", "settings", "spanner", "tool", "update" ]
        }, {
            title: "fal fa-wrench",
            searchTerms: [ "construction", "fix", "mechanic", "plumbing", "settings", "spanner", "tool", "update" ]
        }, {
            title: "fas fa-x-ray",
            searchTerms: [ "health", "medical", "radiological images", "radiology", "skeleton" ]
        }, {
            title: "far fa-x-ray",
            searchTerms: [ "health", "medical", "radiological images", "radiology", "skeleton" ]
        }, {
            title: "fal fa-x-ray",
            searchTerms: [ "health", "medical", "radiological images", "radiology", "skeleton" ]
        }, {
            title: "fab fa-xbox",
            searchTerms: []
        }, {
            title: "fab fa-xing",
            searchTerms: []
        }, {
            title: "fab fa-xing-square",
            searchTerms: []
        }, {
            title: "fab fa-y-combinator",
            searchTerms: []
        }, {
            title: "fab fa-yahoo",
            searchTerms: []
        }, {
            title: "fab fa-yammer",
            searchTerms: []
        }, {
            title: "fab fa-yandex",
            searchTerms: []
        }, {
            title: "fab fa-yandex-international",
            searchTerms: []
        }, {
            title: "fab fa-yarn",
            searchTerms: []
        }, {
            title: "fab fa-yelp",
            searchTerms: []
        }, {
            title: "fas fa-yen-sign",
            searchTerms: [ "currency", "jpy", "money" ]
        }, {
            title: "far fa-yen-sign",
            searchTerms: [ "currency", "jpy", "money" ]
        }, {
            title: "fal fa-yen-sign",
            searchTerms: [ "currency", "jpy", "money" ]
        }, {
            title: "fas fa-yin-yang",
            searchTerms: [ "daoism", "opposites", "taoism" ]
        }, {
            title: "far fa-yin-yang",
            searchTerms: [ "daoism", "opposites", "taoism" ]
        }, {
            title: "fal fa-yin-yang",
            searchTerms: [ "daoism", "opposites", "taoism" ]
        }, {
            title: "fab fa-yoast",
            searchTerms: []
        }, {
            title: "fab fa-youtube",
            searchTerms: [ "film", "video", "youtube-play", "youtube-square" ]
        }, {
            title: "fab fa-youtube-square",
            searchTerms: []
        }, {
            title: "fab fa-zhihu",
            searchTerms: []
        } ]
    });
});