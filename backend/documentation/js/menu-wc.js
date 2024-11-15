'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-0c94d7943221931bd8f6b67bff53a8bc15b98f11482b600c8832420a81a70bb155ce94bfb0dbc35f07f3d1ed12885f10551015d66c02cfa47ff9d85cb340356d"' : 'data-bs-target="#xs-controllers-links-module-AppModule-0c94d7943221931bd8f6b67bff53a8bc15b98f11482b600c8832420a81a70bb155ce94bfb0dbc35f07f3d1ed12885f10551015d66c02cfa47ff9d85cb340356d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-0c94d7943221931bd8f6b67bff53a8bc15b98f11482b600c8832420a81a70bb155ce94bfb0dbc35f07f3d1ed12885f10551015d66c02cfa47ff9d85cb340356d"' :
                                            'id="xs-controllers-links-module-AppModule-0c94d7943221931bd8f6b67bff53a8bc15b98f11482b600c8832420a81a70bb155ce94bfb0dbc35f07f3d1ed12885f10551015d66c02cfa47ff9d85cb340356d"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-0c94d7943221931bd8f6b67bff53a8bc15b98f11482b600c8832420a81a70bb155ce94bfb0dbc35f07f3d1ed12885f10551015d66c02cfa47ff9d85cb340356d"' : 'data-bs-target="#xs-injectables-links-module-AppModule-0c94d7943221931bd8f6b67bff53a8bc15b98f11482b600c8832420a81a70bb155ce94bfb0dbc35f07f3d1ed12885f10551015d66c02cfa47ff9d85cb340356d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-0c94d7943221931bd8f6b67bff53a8bc15b98f11482b600c8832420a81a70bb155ce94bfb0dbc35f07f3d1ed12885f10551015d66c02cfa47ff9d85cb340356d"' :
                                        'id="xs-injectables-links-module-AppModule-0c94d7943221931bd8f6b67bff53a8bc15b98f11482b600c8832420a81a70bb155ce94bfb0dbc35f07f3d1ed12885f10551015d66c02cfa47ff9d85cb340356d"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-8f16b9cfde7412d1ed35c20b8c0a5bf9a5fd04b1dc800d093db1a34e82a2b2d83705583041862321dd4e7e5e83f2e4e1ed7b3780d48d9c3f8647da3ae3f6ae8a"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-8f16b9cfde7412d1ed35c20b8c0a5bf9a5fd04b1dc800d093db1a34e82a2b2d83705583041862321dd4e7e5e83f2e4e1ed7b3780d48d9c3f8647da3ae3f6ae8a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-8f16b9cfde7412d1ed35c20b8c0a5bf9a5fd04b1dc800d093db1a34e82a2b2d83705583041862321dd4e7e5e83f2e4e1ed7b3780d48d9c3f8647da3ae3f6ae8a"' :
                                            'id="xs-controllers-links-module-AuthModule-8f16b9cfde7412d1ed35c20b8c0a5bf9a5fd04b1dc800d093db1a34e82a2b2d83705583041862321dd4e7e5e83f2e4e1ed7b3780d48d9c3f8647da3ae3f6ae8a"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-8f16b9cfde7412d1ed35c20b8c0a5bf9a5fd04b1dc800d093db1a34e82a2b2d83705583041862321dd4e7e5e83f2e4e1ed7b3780d48d9c3f8647da3ae3f6ae8a"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-8f16b9cfde7412d1ed35c20b8c0a5bf9a5fd04b1dc800d093db1a34e82a2b2d83705583041862321dd4e7e5e83f2e4e1ed7b3780d48d9c3f8647da3ae3f6ae8a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-8f16b9cfde7412d1ed35c20b8c0a5bf9a5fd04b1dc800d093db1a34e82a2b2d83705583041862321dd4e7e5e83f2e4e1ed7b3780d48d9c3f8647da3ae3f6ae8a"' :
                                        'id="xs-injectables-links-module-AuthModule-8f16b9cfde7412d1ed35c20b8c0a5bf9a5fd04b1dc800d093db1a34e82a2b2d83705583041862321dd4e7e5e83f2e4e1ed7b3780d48d9c3f8647da3ae3f6ae8a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConversationMembersModule.html" data-type="entity-link" >ConversationMembersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ConversationMembersModule-410c3b3e4886bba794dd5b5d9a705572ed28eef48cdc48a0c6609c4784853b85ddf6db694fabfc4c985c1006c011de7905b320eaf2730c235538f092e41b1913"' : 'data-bs-target="#xs-controllers-links-module-ConversationMembersModule-410c3b3e4886bba794dd5b5d9a705572ed28eef48cdc48a0c6609c4784853b85ddf6db694fabfc4c985c1006c011de7905b320eaf2730c235538f092e41b1913"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ConversationMembersModule-410c3b3e4886bba794dd5b5d9a705572ed28eef48cdc48a0c6609c4784853b85ddf6db694fabfc4c985c1006c011de7905b320eaf2730c235538f092e41b1913"' :
                                            'id="xs-controllers-links-module-ConversationMembersModule-410c3b3e4886bba794dd5b5d9a705572ed28eef48cdc48a0c6609c4784853b85ddf6db694fabfc4c985c1006c011de7905b320eaf2730c235538f092e41b1913"' }>
                                            <li class="link">
                                                <a href="controllers/ConversationMembersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConversationMembersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ConversationMembersModule-410c3b3e4886bba794dd5b5d9a705572ed28eef48cdc48a0c6609c4784853b85ddf6db694fabfc4c985c1006c011de7905b320eaf2730c235538f092e41b1913"' : 'data-bs-target="#xs-injectables-links-module-ConversationMembersModule-410c3b3e4886bba794dd5b5d9a705572ed28eef48cdc48a0c6609c4784853b85ddf6db694fabfc4c985c1006c011de7905b320eaf2730c235538f092e41b1913"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConversationMembersModule-410c3b3e4886bba794dd5b5d9a705572ed28eef48cdc48a0c6609c4784853b85ddf6db694fabfc4c985c1006c011de7905b320eaf2730c235538f092e41b1913"' :
                                        'id="xs-injectables-links-module-ConversationMembersModule-410c3b3e4886bba794dd5b5d9a705572ed28eef48cdc48a0c6609c4784853b85ddf6db694fabfc4c985c1006c011de7905b320eaf2730c235538f092e41b1913"' }>
                                        <li class="link">
                                            <a href="injectables/ConversationMembersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConversationMembersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConversationsModule.html" data-type="entity-link" >ConversationsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ConversationsModule-2051a1997a4eb814f5e59e75dfc71d6ca7675b3e5c3f73db00813578c9d89819c82ecbc980ac06e14ca4284d81083e8a677c11a61aac1b372100ab6f013a84b8"' : 'data-bs-target="#xs-controllers-links-module-ConversationsModule-2051a1997a4eb814f5e59e75dfc71d6ca7675b3e5c3f73db00813578c9d89819c82ecbc980ac06e14ca4284d81083e8a677c11a61aac1b372100ab6f013a84b8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ConversationsModule-2051a1997a4eb814f5e59e75dfc71d6ca7675b3e5c3f73db00813578c9d89819c82ecbc980ac06e14ca4284d81083e8a677c11a61aac1b372100ab6f013a84b8"' :
                                            'id="xs-controllers-links-module-ConversationsModule-2051a1997a4eb814f5e59e75dfc71d6ca7675b3e5c3f73db00813578c9d89819c82ecbc980ac06e14ca4284d81083e8a677c11a61aac1b372100ab6f013a84b8"' }>
                                            <li class="link">
                                                <a href="controllers/ConversationsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConversationsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ConversationsModule-2051a1997a4eb814f5e59e75dfc71d6ca7675b3e5c3f73db00813578c9d89819c82ecbc980ac06e14ca4284d81083e8a677c11a61aac1b372100ab6f013a84b8"' : 'data-bs-target="#xs-injectables-links-module-ConversationsModule-2051a1997a4eb814f5e59e75dfc71d6ca7675b3e5c3f73db00813578c9d89819c82ecbc980ac06e14ca4284d81083e8a677c11a61aac1b372100ab6f013a84b8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ConversationsModule-2051a1997a4eb814f5e59e75dfc71d6ca7675b3e5c3f73db00813578c9d89819c82ecbc980ac06e14ca4284d81083e8a677c11a61aac1b372100ab6f013a84b8"' :
                                        'id="xs-injectables-links-module-ConversationsModule-2051a1997a4eb814f5e59e75dfc71d6ca7675b3e5c3f73db00813578c9d89819c82ecbc980ac06e14ca4284d81083e8a677c11a61aac1b372100ab6f013a84b8"' }>
                                        <li class="link">
                                            <a href="injectables/ConversationsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConversationsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GroupMembersModule.html" data-type="entity-link" >GroupMembersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-GroupMembersModule-a721b97438d2688fd56668bae2fbc2e38c93970de2cac5bd4644f92757c5e95535eac53b5d527f3d7c23d26c6918baae304ae3eb262276a7070b1e78926e6918"' : 'data-bs-target="#xs-controllers-links-module-GroupMembersModule-a721b97438d2688fd56668bae2fbc2e38c93970de2cac5bd4644f92757c5e95535eac53b5d527f3d7c23d26c6918baae304ae3eb262276a7070b1e78926e6918"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-GroupMembersModule-a721b97438d2688fd56668bae2fbc2e38c93970de2cac5bd4644f92757c5e95535eac53b5d527f3d7c23d26c6918baae304ae3eb262276a7070b1e78926e6918"' :
                                            'id="xs-controllers-links-module-GroupMembersModule-a721b97438d2688fd56668bae2fbc2e38c93970de2cac5bd4644f92757c5e95535eac53b5d527f3d7c23d26c6918baae304ae3eb262276a7070b1e78926e6918"' }>
                                            <li class="link">
                                                <a href="controllers/GroupMembersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupMembersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GroupMembersModule-a721b97438d2688fd56668bae2fbc2e38c93970de2cac5bd4644f92757c5e95535eac53b5d527f3d7c23d26c6918baae304ae3eb262276a7070b1e78926e6918"' : 'data-bs-target="#xs-injectables-links-module-GroupMembersModule-a721b97438d2688fd56668bae2fbc2e38c93970de2cac5bd4644f92757c5e95535eac53b5d527f3d7c23d26c6918baae304ae3eb262276a7070b1e78926e6918"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GroupMembersModule-a721b97438d2688fd56668bae2fbc2e38c93970de2cac5bd4644f92757c5e95535eac53b5d527f3d7c23d26c6918baae304ae3eb262276a7070b1e78926e6918"' :
                                        'id="xs-injectables-links-module-GroupMembersModule-a721b97438d2688fd56668bae2fbc2e38c93970de2cac5bd4644f92757c5e95535eac53b5d527f3d7c23d26c6918baae304ae3eb262276a7070b1e78926e6918"' }>
                                        <li class="link">
                                            <a href="injectables/GroupMembersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupMembersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MessagesModule.html" data-type="entity-link" >MessagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MessagesModule-6d128661839733b4610d60e274694fb0fb0bb730edebf9371a8565486555d6de32bb4976a5a5738aa2c6cd8340f353960eb44b48a858b9bfbb8969f4f7c2e19d"' : 'data-bs-target="#xs-controllers-links-module-MessagesModule-6d128661839733b4610d60e274694fb0fb0bb730edebf9371a8565486555d6de32bb4976a5a5738aa2c6cd8340f353960eb44b48a858b9bfbb8969f4f7c2e19d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MessagesModule-6d128661839733b4610d60e274694fb0fb0bb730edebf9371a8565486555d6de32bb4976a5a5738aa2c6cd8340f353960eb44b48a858b9bfbb8969f4f7c2e19d"' :
                                            'id="xs-controllers-links-module-MessagesModule-6d128661839733b4610d60e274694fb0fb0bb730edebf9371a8565486555d6de32bb4976a5a5738aa2c6cd8340f353960eb44b48a858b9bfbb8969f4f7c2e19d"' }>
                                            <li class="link">
                                                <a href="controllers/MessagesController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MessagesModule-6d128661839733b4610d60e274694fb0fb0bb730edebf9371a8565486555d6de32bb4976a5a5738aa2c6cd8340f353960eb44b48a858b9bfbb8969f4f7c2e19d"' : 'data-bs-target="#xs-injectables-links-module-MessagesModule-6d128661839733b4610d60e274694fb0fb0bb730edebf9371a8565486555d6de32bb4976a5a5738aa2c6cd8340f353960eb44b48a858b9bfbb8969f4f7c2e19d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MessagesModule-6d128661839733b4610d60e274694fb0fb0bb730edebf9371a8565486555d6de32bb4976a5a5738aa2c6cd8340f353960eb44b48a858b9bfbb8969f4f7c2e19d"' :
                                        'id="xs-injectables-links-module-MessagesModule-6d128661839733b4610d60e274694fb0fb0bb730edebf9371a8565486555d6de32bb4976a5a5738aa2c6cd8340f353960eb44b48a858b9bfbb8969f4f7c2e19d"' }>
                                        <li class="link">
                                            <a href="injectables/MessagesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RelationshipsModule.html" data-type="entity-link" >RelationshipsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-RelationshipsModule-954f45503a896695604ec03a206dfe053ca328588d2706be78218bd264bcb54a5f6ed48e52110f73faa83ef629ed12a44bf0891372cc8a18b91b9635d373a386"' : 'data-bs-target="#xs-controllers-links-module-RelationshipsModule-954f45503a896695604ec03a206dfe053ca328588d2706be78218bd264bcb54a5f6ed48e52110f73faa83ef629ed12a44bf0891372cc8a18b91b9635d373a386"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-RelationshipsModule-954f45503a896695604ec03a206dfe053ca328588d2706be78218bd264bcb54a5f6ed48e52110f73faa83ef629ed12a44bf0891372cc8a18b91b9635d373a386"' :
                                            'id="xs-controllers-links-module-RelationshipsModule-954f45503a896695604ec03a206dfe053ca328588d2706be78218bd264bcb54a5f6ed48e52110f73faa83ef629ed12a44bf0891372cc8a18b91b9635d373a386"' }>
                                            <li class="link">
                                                <a href="controllers/RelationshipsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RelationshipsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-RelationshipsModule-954f45503a896695604ec03a206dfe053ca328588d2706be78218bd264bcb54a5f6ed48e52110f73faa83ef629ed12a44bf0891372cc8a18b91b9635d373a386"' : 'data-bs-target="#xs-injectables-links-module-RelationshipsModule-954f45503a896695604ec03a206dfe053ca328588d2706be78218bd264bcb54a5f6ed48e52110f73faa83ef629ed12a44bf0891372cc8a18b91b9635d373a386"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RelationshipsModule-954f45503a896695604ec03a206dfe053ca328588d2706be78218bd264bcb54a5f6ed48e52110f73faa83ef629ed12a44bf0891372cc8a18b91b9635d373a386"' :
                                        'id="xs-injectables-links-module-RelationshipsModule-954f45503a896695604ec03a206dfe053ca328588d2706be78218bd264bcb54a5f6ed48e52110f73faa83ef629ed12a44bf0891372cc8a18b91b9635d373a386"' }>
                                        <li class="link">
                                            <a href="injectables/RelationshipsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RelationshipsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-213b31ce8e631e6e6de93cd3e6068f6a7d74a4c8a7e4e40d3c2a4e161dbff845cd54b2bcd53e9db8aea0d975f86ce05a58b86a1c530eac294afb2b291a5dbed8"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-213b31ce8e631e6e6de93cd3e6068f6a7d74a4c8a7e4e40d3c2a4e161dbff845cd54b2bcd53e9db8aea0d975f86ce05a58b86a1c530eac294afb2b291a5dbed8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-213b31ce8e631e6e6de93cd3e6068f6a7d74a4c8a7e4e40d3c2a4e161dbff845cd54b2bcd53e9db8aea0d975f86ce05a58b86a1c530eac294afb2b291a5dbed8"' :
                                            'id="xs-controllers-links-module-UsersModule-213b31ce8e631e6e6de93cd3e6068f6a7d74a4c8a7e4e40d3c2a4e161dbff845cd54b2bcd53e9db8aea0d975f86ce05a58b86a1c530eac294afb2b291a5dbed8"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-213b31ce8e631e6e6de93cd3e6068f6a7d74a4c8a7e4e40d3c2a4e161dbff845cd54b2bcd53e9db8aea0d975f86ce05a58b86a1c530eac294afb2b291a5dbed8"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-213b31ce8e631e6e6de93cd3e6068f6a7d74a4c8a7e4e40d3c2a4e161dbff845cd54b2bcd53e9db8aea0d975f86ce05a58b86a1c530eac294afb2b291a5dbed8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-213b31ce8e631e6e6de93cd3e6068f6a7d74a4c8a7e4e40d3c2a4e161dbff845cd54b2bcd53e9db8aea0d975f86ce05a58b86a1c530eac294afb2b291a5dbed8"' :
                                        'id="xs-injectables-links-module-UsersModule-213b31ce8e631e6e6de93cd3e6068f6a7d74a4c8a7e4e40d3c2a4e161dbff845cd54b2bcd53e9db8aea0d975f86ce05a58b86a1c530eac294afb2b291a5dbed8"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ConversationMembersController.html" data-type="entity-link" >ConversationMembersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ConversationsController.html" data-type="entity-link" >ConversationsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GroupMembersController.html" data-type="entity-link" >GroupMembersController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/MessagesController.html" data-type="entity-link" >MessagesController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/RelationshipsController.html" data-type="entity-link" >RelationshipsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/Conversation.html" data-type="entity-link" >Conversation</a>
                                </li>
                                <li class="link">
                                    <a href="entities/ConversationMember.html" data-type="entity-link" >ConversationMember</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Message.html" data-type="entity-link" >Message</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Relationship.html" data-type="entity-link" >Relationship</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ConversationMemberDto.html" data-type="entity-link" >ConversationMemberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateConversationDto.html" data-type="entity-link" >CreateConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateGroupMemberDto.html" data-type="entity-link" >CreateGroupMemberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMessageDto.html" data-type="entity-link" >CreateMessageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateRelationshipDto.html" data-type="entity-link" >CreateRelationshipDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DeleteConversationDto.html" data-type="entity-link" >DeleteConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GroupMember.html" data-type="entity-link" >GroupMember</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateConversationDto.html" data-type="entity-link" >UpdateConversationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateGroupMemberDto.html" data-type="entity-link" >UpdateGroupMemberDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMessgageDto.html" data-type="entity-link" >UpdateMessgageDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateRelationshipDto.html" data-type="entity-link" >UpdateRelationshipDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConversationMembersService.html" data-type="entity-link" >ConversationMembersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConversationsService.html" data-type="entity-link" >ConversationsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupMembersService.html" data-type="entity-link" >GroupMembersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessagesService.html" data-type="entity-link" >MessagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RelationshipsService.html" data-type="entity-link" >RelationshipsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminConversationGuard.html" data-type="entity-link" >AdminConversationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CreatorConversationGuard.html" data-type="entity-link" >CreatorConversationGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/FriendRelationshipGuard.html" data-type="entity-link" >FriendRelationshipGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/MemberConversationGuard.html" data-type="entity-link" >MemberConversationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IUser.html" data-type="entity-link" >IUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});