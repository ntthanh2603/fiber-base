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
                                            'data-bs-target="#controllers-links-module-AppModule-d6e4e66c7307238ff0204df54af3d1becbc46aa48bec969c853dc8f0d8d97bbbd1ab5eedb6edacc583501938d36cf411fa7aec5a370f2ebbe93e998c72e96595"' : 'data-bs-target="#xs-controllers-links-module-AppModule-d6e4e66c7307238ff0204df54af3d1becbc46aa48bec969c853dc8f0d8d97bbbd1ab5eedb6edacc583501938d36cf411fa7aec5a370f2ebbe93e998c72e96595"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-d6e4e66c7307238ff0204df54af3d1becbc46aa48bec969c853dc8f0d8d97bbbd1ab5eedb6edacc583501938d36cf411fa7aec5a370f2ebbe93e998c72e96595"' :
                                            'id="xs-controllers-links-module-AppModule-d6e4e66c7307238ff0204df54af3d1becbc46aa48bec969c853dc8f0d8d97bbbd1ab5eedb6edacc583501938d36cf411fa7aec5a370f2ebbe93e998c72e96595"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-d6e4e66c7307238ff0204df54af3d1becbc46aa48bec969c853dc8f0d8d97bbbd1ab5eedb6edacc583501938d36cf411fa7aec5a370f2ebbe93e998c72e96595"' : 'data-bs-target="#xs-injectables-links-module-AppModule-d6e4e66c7307238ff0204df54af3d1becbc46aa48bec969c853dc8f0d8d97bbbd1ab5eedb6edacc583501938d36cf411fa7aec5a370f2ebbe93e998c72e96595"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-d6e4e66c7307238ff0204df54af3d1becbc46aa48bec969c853dc8f0d8d97bbbd1ab5eedb6edacc583501938d36cf411fa7aec5a370f2ebbe93e998c72e96595"' :
                                        'id="xs-injectables-links-module-AppModule-d6e4e66c7307238ff0204df54af3d1becbc46aa48bec969c853dc8f0d8d97bbbd1ab5eedb6edacc583501938d36cf411fa7aec5a370f2ebbe93e998c72e96595"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-a0ed9309c90fe2d70ee5526c430730e328f7ef9eef8eb07a70191babaecc9aa29ce99a6c3c15479e15e831f36cfe69e03600b09ef832359564cd8f4fc1e789b1"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-a0ed9309c90fe2d70ee5526c430730e328f7ef9eef8eb07a70191babaecc9aa29ce99a6c3c15479e15e831f36cfe69e03600b09ef832359564cd8f4fc1e789b1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-a0ed9309c90fe2d70ee5526c430730e328f7ef9eef8eb07a70191babaecc9aa29ce99a6c3c15479e15e831f36cfe69e03600b09ef832359564cd8f4fc1e789b1"' :
                                            'id="xs-controllers-links-module-AuthModule-a0ed9309c90fe2d70ee5526c430730e328f7ef9eef8eb07a70191babaecc9aa29ce99a6c3c15479e15e831f36cfe69e03600b09ef832359564cd8f4fc1e789b1"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-a0ed9309c90fe2d70ee5526c430730e328f7ef9eef8eb07a70191babaecc9aa29ce99a6c3c15479e15e831f36cfe69e03600b09ef832359564cd8f4fc1e789b1"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-a0ed9309c90fe2d70ee5526c430730e328f7ef9eef8eb07a70191babaecc9aa29ce99a6c3c15479e15e831f36cfe69e03600b09ef832359564cd8f4fc1e789b1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-a0ed9309c90fe2d70ee5526c430730e328f7ef9eef8eb07a70191babaecc9aa29ce99a6c3c15479e15e831f36cfe69e03600b09ef832359564cd8f4fc1e789b1"' :
                                        'id="xs-injectables-links-module-AuthModule-a0ed9309c90fe2d70ee5526c430730e328f7ef9eef8eb07a70191babaecc9aa29ce99a6c3c15479e15e831f36cfe69e03600b09ef832359564cd8f4fc1e789b1"' }>
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
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-c1375c65b333427df601f33b7c311cd23763c4c02176ffd9b56365fb2dc4cb53fdba9674c9358cd5350e9d642e3924144b43b8c26f28f04f62b6a40904c39c9f"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-c1375c65b333427df601f33b7c311cd23763c4c02176ffd9b56365fb2dc4cb53fdba9674c9358cd5350e9d642e3924144b43b8c26f28f04f62b6a40904c39c9f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-c1375c65b333427df601f33b7c311cd23763c4c02176ffd9b56365fb2dc4cb53fdba9674c9358cd5350e9d642e3924144b43b8c26f28f04f62b6a40904c39c9f"' :
                                            'id="xs-controllers-links-module-UsersModule-c1375c65b333427df601f33b7c311cd23763c4c02176ffd9b56365fb2dc4cb53fdba9674c9358cd5350e9d642e3924144b43b8c26f28f04f62b6a40904c39c9f"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-c1375c65b333427df601f33b7c311cd23763c4c02176ffd9b56365fb2dc4cb53fdba9674c9358cd5350e9d642e3924144b43b8c26f28f04f62b6a40904c39c9f"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-c1375c65b333427df601f33b7c311cd23763c4c02176ffd9b56365fb2dc4cb53fdba9674c9358cd5350e9d642e3924144b43b8c26f28f04f62b6a40904c39c9f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-c1375c65b333427df601f33b7c311cd23763c4c02176ffd9b56365fb2dc4cb53fdba9674c9358cd5350e9d642e3924144b43b8c26f28f04f62b6a40904c39c9f"' :
                                        'id="xs-injectables-links-module-UsersModule-c1375c65b333427df601f33b7c311cd23763c4c02176ffd9b56365fb2dc4cb53fdba9674c9358cd5350e9d642e3924144b43b8c26f28f04f62b6a40904c39c9f"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
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
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterUserDto.html" data-type="entity-link" >RegisterUserDto</a>
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
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MulterConfigService.html" data-type="entity-link" >MulterConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
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