from plone.app.textfield import RichText
from plone.autoform import directives
from plone.autoform.interfaces import IFormFieldProvider
from plone.supermodel import model
from ploneconf.core import _
from z3c.relationfield.schema import RelationChoice
from z3c.relationfield.schema import RelationList
from zope import schema
from zope.interface import provider


@provider(IFormFieldProvider)
class IConferenceSession(model.Schema):
    """Plone Conference Conference Session."""

    title = schema.TextLine(title=_("Title"), required=True)

    text = RichText(
        title=_("Summary"),
        required=False,
        missing_value="",
    )

    # Presenters
    presenters = RelationList(
        title=_("Presenters"),
        description=_(""),
        value_type=RelationChoice(
            vocabulary="ploneconf.core.vocabularies.persons",
        ),
        required=False,
    )

    session_level = schema.Set(
        title=_("Level"),
        description=_("Target Level"),
        value_type=schema.Choice(
            vocabulary="ploneconf.core.vocabularies.slot_levels",
        ),
        required=False,
    )

    session_audience = schema.Set(
        title=_("Audience"),
        description=_("Target audience"),
        value_type=schema.Choice(
            vocabulary="ploneconf.core.vocabularies.slot_audiences",
        ),
        required=False,
    )
    directives.order_before(
        session_audience="*",
        session_level="*",
        presenters="*",
        text="*",
        title="*",
    )

    # Materials
    model.fieldset(
        "materials",
        label=_("Materials"),
        fields=["slides_url", "slides_embed", "video_url", "video_embed"],
    )

    slides_url = schema.URI(
        title=_("Slides"),
        description=_("URL of slides"),
        required=False,
    )

    slides_embed = schema.Text(
        title=_("Slides embed code"),
        description=_("Embed code for slides"),
        required=False,
    )

    video_url = schema.URI(
        title=_("Video"),
        description=_("URL of video"),
        required=False,
    )

    video_embed = schema.Text(
        title=_("Video embed code"),
        description=_("Embed code for video"),
        required=False,
    )
