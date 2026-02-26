import { DOCUMENT, Inject, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public loadJsScript(
    renderer: Renderer2,
    src: string,
    attributes?: { [key: string]: unknown },
  ): HTMLScriptElement {
    const script = renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;

    if (attributes) {
      Object.keys(attributes).forEach((key) => {
        script[key] = attributes[key];
      });
    }

    renderer.appendChild(this.document.body, script);
    return script;
  }
}
