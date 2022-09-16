from collections import defaultdict
from datetime import datetime
from datetime import timezone
from plone import api
from plone.app.event.base import default_timezone
from plone.restapi.interfaces import ISerializeToJsonSummary
from plone.restapi.services import Service
from ploneconf.core.vocabularies.sponsorship import LEVELS
from typing import Any
from typing import Dict
from typing import List
from zope.component import getMultiAdapter

import pytz


class Get(Service):
    def _serialize_brain(self, brain) -> Dict[str, Any]:
        obj = brain.getObject()

        result = getMultiAdapter((obj, self.request), ISerializeToJsonSummary)()
        if bool(obj.presenters):
            result["presenters"] = [
                {
                    "path": presenter.to_object.absolute_url_path(),
                    "title": presenter.to_object.title,
                }
                for presenter in obj.presenters
            ]
        try:
            timezone = pytz.timezone("utc")
            result["start"] = timezone.localize(obj.start).isoformat()
            result["end"] = timezone.localize(obj.end).isoformat()
        except:
            pass
        return result

    def get_talks(self) -> List[Dict[str, Any]]:
        results = api.content.find(
            portal_type="Talk",
            review_state="published",
        ) + api.content.find(
            portal_type="Keynote",
            review_state="published",
        )
        return [self._serialize_brain(brain) for brain in results]

    def reply(self) -> List[Dict]:
        return self.get_talks()
