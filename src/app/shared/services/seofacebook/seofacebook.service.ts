import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SEOFacebookService {
  constructor(private title: Title,

    private meta: Meta,
    private titleService: Title,
    @Inject(DOCUMENT) private dom) { }

  /*
      <meta property="og:url"                content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
      <meta property="og:type"               content="article" />
      <meta property="og:title"              content="When Great Minds Don’t Think Alike" />
      <meta property="og:description"        content="How much does culture influence creative thinking?" />
      <meta property="og:image"              content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
  */
  updateTitle(valor: string) {
    this.titleService.setTitle(valor);    
  }
  updateContentTitle(valor: string) {
    //this.titleService.setTitle(valor);
    this.meta.updateTag(
      {
        name: 'title',
        content: valor // 'Las mejores scorts disponibles para pasar el rato, disfrutas de momentos agradables de este país'
      });

  }
  updateDescripcion(valor: string) {
    this.meta.updateTag(
      {
        name: 'description',
        content: valor // 'Las mejores scorts disponibles para pasar el rato, disfrutas de momentos agradables de este país'
      });
  }
  updateCanonicalUrl(url: string) {
    const head = this.dom.getElementsByTagName('head')[0];
    var element: HTMLLinkElement = this.dom.querySelector(`link[rel='canonical']`) || null
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical')
    element.setAttribute('href', url)
  }
  updateOgUrl(value: string) {
    this.meta.updateTag({ property: 'og:url', content: value })
  }
  updateOgType(value: string) {
    this.meta.updateTag({ property: 'og:type', content: value })
  }
  updateOgTitle(value: string) {
    this.meta.updateTag({ property: 'og:title', content: value })
  }
  updateOgDescription(value: string) {
    this.meta.updateTag({ property: 'og:description', content: value })
  }
  updateOgImage(value: string) {
    this.meta.updateTag({ property: 'og:image', content: value })
  }
}